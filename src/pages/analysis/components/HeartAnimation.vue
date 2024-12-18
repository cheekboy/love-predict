<script setup>
import { ref } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 40
  },
  color: {
    type: String,
    default: '#FF1493'
  }
})

const isAnimating = ref(false)

const handleClick = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 1000)
}
</script>

<template>
  <div 
    class="heart-container"
    :class="{ animating: isAnimating }"
    @click="handleClick"
  >
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      class="heart-svg"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        :fill="color"
      />
    </svg>
  </div>
</template>

<style scoped>
.heart-container {
  position: absolute;
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: float 2s ease-in-out infinite;
}

.heart-svg {
  filter: drop-shadow(0 2px 4px rgba(255, 20, 147, 0.2));
}

.heart-container:hover {
  transform: scale(1.1);
}

.heart-container.animating {
  animation: pulse 1s ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style> 