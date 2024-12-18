<script setup>
import { ref } from 'vue'

const isSharing = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

const shareOptions = [
  { icon: '📱', name: '生成图片' },
  { icon: '🔗', name: '复制链接' },
  { icon: '💬', name: '微信' }
]

const handleShare = async (option) => {
  isSharing.value = true
  
  try {
    switch(option.name) {
      case '生成图片':
        // TODO: 实现截图功能
        displayToast('图片生成中...')
        break
      case '复制链接':
        await navigator.clipboard.writeText(window.location.href)
        displayToast('链接已复制')
        break
      case '微信':
        displayToast('请在微信内打开')
        break
    }
  } catch (err) {
    displayToast('分享失败')
  } finally {
    isSharing.value = false
  }
}

const displayToast = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}
</script>

<template>
  <div class="share-container">
    <button 
      class="share-button"
      :class="{ sharing: isSharing }"
      @click="isSharing = !isSharing"
    >
      分享
    </button>
    
    <div class="share-options" v-if="isSharing">
      <button
        v-for="option in shareOptions"
        :key="option.name"
        class="option-button"
        @click="handleShare(option)"
      >
        <span class="option-icon">{{ option.icon }}</span>
        <span class="option-name">{{ option.name }}</span>
      </button>
    </div>
    
    <!-- Toast提示 -->
    <div class="toast" v-if="showToast">
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
.share-container {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
}

.share-button {
  background: #FF1493;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 20, 147, 0.2);
}

.share-options {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
}

.option-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.option-button:hover {
  background: rgba(255, 20, 147, 0.1);
}

.option-icon {
  margin-right: 0.8rem;
  font-size: 1.2rem;
}

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style> 