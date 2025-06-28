<template>
  <div class="radar-map">
    <div ref="mapContainer" class="map-container"></div>
    <button @click="captureMap">Зберегти скріншот</button>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import html2canvas from 'html2canvas';

export default {
  props: {
    targets: Array
  },
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.$nextTick(() => {
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
        center: [49.0, 31.0],
        zoom: 6,
        minZoom: 6,
        maxBounds: ukraineBounds,
        maxBoundsViscosity: 1.0
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(this.map);

      this.map.fitBounds(ukraineBounds);
      this.map.invalidateSize();

      const provider = new OpenStreetMapProvider({
        params: {
          'accept-language': 'uk',
          countrycodes: 'ua',
        },
      });

      const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar',
        showMarker: true,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        searchLabel: 'Пошук населеного пункту'
      });

      this.map.addControl(searchControl);

      this.map.on('geosearch/showlocation', (result) => {
        this.$emit('location-selected', result.location);
      });
    },
    addTargets() {
      // Clear existing markers
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          this.map.removeLayer(layer);
        }
      });

      this.targets.forEach(target => {
        const quantity = target.quantity || 1;
        const popupContent = `<b>${target.name}</b><br>Напрямок: ${target.direction}<br>Кількість: ${quantity}`;

        if (quantity === 1) {
          const uavIcon = this.getUavIcon(target.direction, 24);
          const marker = L.marker([target.lat, target.lng], { icon: uavIcon }).addTo(this.map);
          marker.bindPopup(popupContent);
        } else {
          for (let i = 0; i < quantity; i++) {
            const offsetPosition = this.getOffsetPosition(target.lat, target.lng, i, quantity);
            const uavIcon = this.getUavIcon(target.direction, 16); // Smaller icon
            const marker = L.marker(offsetPosition, { icon: uavIcon }).addTo(this.map);
            marker.bindPopup(popupContent);
          }
        }
      });
    },
    getOffsetPosition(lat, lng, index, total) {
      const radius = 0.025; // The radius of the circle for spreading icons
      const angle = (index / total) * 2 * Math.PI; // Angle in radians
      const latOffset = radius * Math.cos(angle);
      const lngOffset = radius * Math.sin(angle);
      return [lat + latOffset, lng + lngOffset];
    },
    getUavIcon(direction, size = 24) {
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

      const iconHtml = `
        <div style="transform: rotate(${rotation}deg);">
          <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#ff4d4d" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22L12 18L22 22L12 2Z"/>
          </svg>
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
        const canvas = await html2canvas(this.$refs.mapContainer);
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
