<template>
  <div class="radar-map">
    <div ref="mapContainer" id="map" class="map-container"></div>
    <button @click="captureMap">Зберегти скріншот</button>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import html2canvas from 'html2canvas';

export default {
  props: {
    targets: Array
  },
  data() {
    return {
      map: null,
      targetLayerGroup: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      // Set playwright flag for testing environment
      if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent.includes('Playwright')) {
        window.playwright = true;
      }
      this.initMap();
    });
  },
  watch: {
    targets: {
      handler(newTargets) {
        if (this.map && newTargets) {
          this.addTargets();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initMap() {
      const ukraineBounds = L.latLngBounds(
        L.latLng(44.3, 22.1),
        L.latLng(52.4, 40.2)
      );

      this.map = L.map(this.$refs.mapContainer, {
        center: [50.0, 32.0], // Centered more north
        zoom: 6,
        minZoom: 6,
        maxBounds: ukraineBounds,
        maxBoundsViscosity: 1.0
      });

      // Expose map instance for testing
      if (window.Cypress || window.playwright) {
        window.map = this.map;
      }

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(this.map);

      this.map.invalidateSize();
      this.targetLayerGroup = L.layerGroup().addTo(this.map);

      this.map.on('zoomend', this.addTargets);
    },
    addTargets() {
      this.targetLayerGroup.clearLayers();

      this.targets.forEach(target => {
        const quantity = target.quantity || 1;
        const popupContent = `<b>${target.name}</b><br>Напрямок: ${target.direction}<br>Кількість: ${quantity}`;

        const uavIcon = this.getUavIcon(target.direction, quantity, 30);
        const marker = L.marker([target.lat, target.lng], { icon: uavIcon }).addTo(this.targetLayerGroup);
        marker.bindPopup(popupContent);
      });
    },
    getUavIcon(direction, quantity = 1, size = 24) {
      const rotation = {
        'Північ': 0,
        'Північний схід': 45,
        'Схід': 90,
        'Південний схід': 135,
        'Південь': 180,
        'Південний захід': 225,
        'Захід': 270,
        'Північний захід': 315
      }[direction] || 0;

      const quantityBadge = quantity > 1 ? `<span class="quantity-badge">${quantity}</span>` : '';

      const iconHtml = `
        <div class="uav-icon-container">
          <div style="transform: rotate(${rotation}deg);">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#ff4d4d" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22L12 18L22 22L12 2Z"/>
            </svg>
          </div>
          ${quantityBadge}
        </div>`;

      return L.divIcon({
        html: iconHtml,
        className: 'uav-icon',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    },
    async captureMap() {
      try {
        const canvas = await html2canvas(this.$refs.mapContainer, { useCORS: true });
        const link = document.createElement('a');
        link.download = 'miniradar-screenshot-' + new Date().getTime() + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error capturing map:', error);
      }
    }
  }
};
</script>

<style>
.uav-icon-container {
  position: relative;
}

.quantity-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4d4d;
  color: white;
  border-radius: 50%;
  padding: 1px 4px;
  font-size: 11px;
  font-weight: bold;
  border: 1px solid white;
  z-index: 10;
}

.uav-icon {
  background: transparent;
  border: none;
}

.map-container {
  height: 500px;
  width: 100%;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
