<template>
  <div class="app">
    <h1>Міні-радар України</h1>
    <div class="controls">
      <AddTargetForm @target-added="handleNewTarget" :selected-location="selectedLocation" />
      <button @click="clearAllTargets" class="clear-button" data-testid="clear-all-targets-button">Очистити всі цілі</button>
    </div>
    <RadarMap :targets="targets" @location-selected="handleLocationSelected" />
  </div>
</template>

<script>
import RadarMap from './components/RadarMap.vue';
import AddTargetForm from './components/AddTargetForm.vue';

export default {
  components: {
    RadarMap,
    AddTargetForm
  },
  data() {
    return {
      targets: [],
      selectedLocation: null
    };
  },
  async mounted() {
    await this.fetchTargets();
  },
  methods: {
    async fetchTargets() {
      try {
        const response = await this.$axios.get('http://localhost:3000/api/targets');
        this.targets = response.data;
      } catch (error) {
        console.error('Error fetching targets:', error);
      }
    },
    handleNewTarget(newTarget) {
      this.targets.push(newTarget);
    },
    handleLocationSelected(location) {
      this.selectedLocation = location;
    },
    async clearAllTargets() {
      try {
        await this.$axios.delete('http://localhost:3000/api/targets/clear');
        await this.fetchTargets(); // Refresh the list, which will be empty
      } catch (error) {
        console.error('Error clearing targets:', error);
      }
    }
  }
};
</script>

<style>
.controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.clear-button {
  padding: 10px 20px;
  background-color: #dc3545; /* Red color for destructive action */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
