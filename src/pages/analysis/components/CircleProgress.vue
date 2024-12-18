<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    default: 200
  },
  strokeWidth: {
    type: Number,
    default: 16
  }
})

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const progress = ref(0)

// 计算stroke-dashoffset
const strokeDashoffset = computed(() => {
  return circumference.value - (progress.value / 100) * circumference.value
})

// 动画更新进度
watch(() => props.percentage, (newVal) => {
  let start = progress.value
  const end = newVal
  const duration = 1500
  const startTime = performance.now()
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime
    const progressRatio = Math.min(elapsed / duration, 1)
    
    progress.value = start + (end - start) * progressRatio
    
    if (progressRatio < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}, { immediate: true })
</script>

<template>
  <div class="circle-progress" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size">
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF69B4" />
          <stop offset="100%" stop-color="#FF1493" />
        </linearGradient>
      </defs>
      
      <!-- 背景圆环 -->
      <circle
        :cx="size/2"
        :cy="size/2"
        :r="radius"
        :stroke-width="strokeWidth"
        class="circle-bg"
      />
      
      <!-- 进度圆环 -->
      <circle
        :cx="size/2"
        :cy="size/2"
        :r="radius"
        :stroke-width="strokeWidth"
        class="circle-progress"
        :style="{
          strokeDasharray: circumference,
          strokeDashoffset
        }"
      />
    </svg>
    
    <!-- 中间内容插槽 -->
    <div class="circle-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.circle-progress {
  position: relative;
}

.circle-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

circle {
  fill: none;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.3s ease;
}

.circle-bg {
  stroke: rgba(255, 105, 180, 0.1);
}

.circle-progress {
  stroke: url(#progressGradient);
  stroke-linecap: round;
}

svg {
  overflow: visible;
}
</style> 