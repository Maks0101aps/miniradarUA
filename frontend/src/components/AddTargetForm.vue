<template>
  <div class="add-target-form">
    <h2>Додати нову ціль</h2>
    <form @submit.prevent="addTarget">
      <div class="form-group">
        <label for="settlement">Назва населеного пункту:</label>
        <input 
          type="text" 
          id="settlement" 
          v-model="settlement" 
          required
          placeholder="Введіть назву міста або села"
        >
      </div>
      
      <div class="form-group">
        <label for="quantity">Кількість:</label>
        <input type="number" id="quantity" v-model.number="quantity" min="1" required>
      </div>

      <div class="form-group">
        <label for="direction">Напрямок:</label>
        <select id="direction" v-model="direction" required>
          <option value="">Оберіть напрямок</option>
          <option value="Північ">Північ</option>
          <option value="Південь">Південь</option>
          <option value="Схід">Схід</option>
          <option value="Захід">Захід</option>
          <option value="Північний схід">Північний схід</option>
          <option value="Північний захід">Північний захід</option>
          <option value="Південний схід">Південний схід</option>
          <option value="Південний захід">Південний захід</option>
        </select>
      </div>
      
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Додавання...' : 'Додати ціль' }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    selectedLocation: Object
  },
  data() {
    return {
      settlement: '',
      direction: '',
      quantity: 1,
      isLoading: false
    };
  },
  watch: {
    selectedLocation(newLocation) {
      if (newLocation) {
        this.settlement = newLocation.label.split(',')[0];
      }
    }
  },
  methods: {
    async addTarget() {
      this.isLoading = true;
      try {
        // Geocode settlement name to coordinates
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.settlement)}&countrycodes=ua`,
          {
            headers: {
              'Accept-Language': 'uk,en;q=0.9'
            }
          }
        );
        
        if (response.data.length === 0) {
          alert('Населений пункт не знайдено');
          this.isLoading = false;
          return;
        }
        
        const location = response.data[0];
        const newTarget = {
          name: this.settlement,
          direction: this.direction,
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
          quantity: this.quantity
        };
        
        // Save to backend
        const saveResponse = await axios.post('http://localhost:3000/api/add', newTarget);
        
        // Emit event to parent
        this.$emit('target-added', saveResponse.data);
        
        // Reset form
        this.settlement = '';
        this.direction = '';
        this.quantity = 1;
      } catch (error) {
        console.error('Error adding target:', error);
        alert('Сталася помилка при додаванні цілі');
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.add-target-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
