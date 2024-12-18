<script setup>
defineProps({
  disabled: Boolean,
  loading: Boolean
})
</script>

<template>
  <button 
    class="predict-button"
    :class="{ disabled, loading }"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span class="button-text" v-if="!loading">开始预测</span>
    <span class="loading-spinner" v-else></span>
  </button>
</template>

<style scoped>
.predict-button {
  min-width: 200px;
  padding: 12px 24px;
  font-size: 1.1rem;
  color: white;
  background: linear-gradient(45deg, #646cff, #8b94ff);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.predict-button:not(.disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.2);
}

.predict-button:not(.disabled):active {
  transform: translateY(0);
}

.predict-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .predict-button {
    width: 100%;
    min-width: unset;
  }
}
</style> 