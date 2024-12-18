<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name1 = ref('')
const name2 = ref('')
const router = useRouter()

const handleSubmit = () => {
  if (name1.value && name2.value) {
    // 跳转到分析页面
    router.push('/analysis')
  }
}
</script>

<template>
  <div class="home">
    <h1>姻缘预测</h1>
    <div class="input-group">
      <input 
        v-model="name1"
        type="text"
        placeholder="请输入第一个名字"
      >
      <input 
        v-model="name2"
        type="text"
        placeholder="请输入第二个名字"
      >
    </div>
    <button @click="handleSubmit">开始预测</button>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 2rem auto;
}

input {
  padding: 0.8rem;
  border: 2px solid var(--primary-light);
  border-radius: 8px;
  font-size: 1rem;
}

button {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 20, 147, 0.2);
}
</style> 