<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="result-card" :style="{ animationDelay: delay + 'ms' }">
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-content">{{ content }}</p>
  </div>
</template>

<style scoped>
.result-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: slideIn 0.6s ease forwards;
}

.card-title {
  color: #FF1493;
  font-size: 1.2rem;
  margin: 0 0 0.8rem;
}

.card-content {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .result-card {
    padding: 1.2rem;
    margin: 0.8rem 0;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
}
</style> 