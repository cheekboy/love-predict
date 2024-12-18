<script setup>
// 移除原有的 Home 导入
</script>

<template>
  <router-view></router-view>
</template>

<style>
/* 全局样式 */
:root {
  --primary-color: #FF1493;
  --primary-light: #FF69B4;
  --text-color: #333;
  --bg-color: #fff;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  background: var(--bg-color);
}

#app {
  min-height: 100vh;
}
</style>
