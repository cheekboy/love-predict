<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  autofocus: Boolean,
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'next', 'submit'])

const input = ref(null)
const isFocused = ref(false)
const error = ref('')

// 输入验证规则
const validateInput = (value) => {
  if (!value) return ''
  if (value.length < 2 || value.length > 10) {
    return '名字长度需要在2-10个字符之间'
  }
  if (!/^[\u4e00-\u9fa5a-zA-Z0-9\s]+$/.test(value)) {
    return '只能输入中文、英文和数字'
  }
  if (/^\s|\s$/.test(value)) {
    return '首尾不能有空格'
  }
  return ''
}

// 处理输入
const handleInput = (e) => {
  const value = e.target.value.trim() // 自动去除首尾空格
  emit('update:modelValue', value)
  error.value = validateInput(value)
}

// 处理焦点
const handleFocus = () => {
  isFocused.value = true
  // 触摸反馈
  if ('vibrate' in navigator) {
    navigator.vibrate(50)
  }
}

const handleBlur = () => {
  isFocused.value = false
  error.value = validateInput(props.modelValue)
}

// 键盘事件
const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    emit('update:modelValue', '')
    input.value?.focus()
  } else if (e.key === 'Enter') {
    if (!error.value && props.modelValue) {
      emit('next')
    }
  }
}

// 自动聚焦优化
onMounted(() => {
  if (props.autofocus) {
    // 延迟聚焦以避免页面加载时的闪烁
    setTimeout(() => {
      input.value?.focus()
    }, 100)
  }
})
</script>

<template>
  <div 
    class="input-wrapper" 
    :class="{ focused: isFocused, error: error }"
  >
    <label 
      :for="id" 
      class="visually-hidden"
    >
      {{ placeholder }}
    </label>
    <input
      :id="id"
      ref="input"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      class="name-input"
    />
    <transition name="fade">
      <span 
        v-if="error" 
        :id="`${id}-error`"
        class="error-message"
        role="alert"
      >
        {{ error }}
      </span>
    </transition>
    <div class="input-focus-effect"></div>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  transition: transform 200ms ease-out;
}

.input-wrapper.focused {
  transform: translateY(-2px);
}

.name-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 200ms ease-out;
  background: transparent;
  position: relative;
  z-index: 1;
}

.input-wrapper.focused .name-input {
  border-color: #646cff;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}

.input-wrapper.error .name-input {
  border-color: #ff6b6b;
}

/* 流光效果 */
.input-focus-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(100, 108, 255, 0.1), transparent);
  transform: translateX(-100%);
  pointer-events: none;
}

.input-wrapper.focused .input-focus-effect {
  animation: flow 1.5s linear infinite;
}

@keyframes flow {
  to {
    transform: translateX(100%);
  }
}

.error-message {
  position: absolute;
  left: 0;
  bottom: -20px;
  font-size: 0.875rem;
  color: #ff6b6b;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 无障碍样式 */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .name-input {
    font-size: 16px;
    padding: 10px 14px;
  }
  
  /* 移动端触摸反馈 */
  .input-wrapper {
    touch-action: manipulation;
  }
  
  .input-wrapper:active {
    transform: scale(0.98);
  }
}

/* 暗色主题支持 */
@media (prefers-color-scheme: dark) {
  .name-input {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
  
  .input-wrapper.focused .name-input {
    background: rgba(255, 255, 255, 0.1);
  }
}
</style> 