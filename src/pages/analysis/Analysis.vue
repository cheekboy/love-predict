<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CircleProgress from './components/CircleProgress.vue'
import ResultCard from './components/ResultCard.vue'
import HeartAnimation from './components/HeartAnimation.vue'
import ShareButton from './components/ShareButton.vue'

const router = useRouter()
const route = useRoute()

// 匹配度数据
const matchScore = ref(0)
const matchLevel = ref('')
const isAnimating = ref(false)

// 计算匹配等级和解读
const resultAnalysis = computed(() => {
  const score = matchScore.value
  if (score >= 90) {
    return {
      title: '天生一对',
      content: '你们的缘分简直是天注定！无论是性格还是爱好都出奇地合拍，未来一定会携手走过人生的每一个精彩时刻。'
    }
  } else if (score >= 70) {
    return {
      title: '非常般配',
      content: '你们之间有着很强的吸引力，彼此能带给对方快乐和温暖。只要用心经营，这份感情一定会开花结果。'
    }
  } else if (score >= 50) {
    return {
      title: '可以发展',
      content: '虽然你们之间还有一些小障碍需要克服，但只要互相理解包容，这份感情就会越来越好。'
    }
  } else if (score >= 30) {
    return {
      title: '需要努力',
      content: '你们之间存在一些差异，但这并不是问题。真诚的沟通和理解可以帮助你们建立更深的连接。'
    }
  } else {
    return {
      title: '缘分较薄',
      content: '也许你们更适合做朋友，但谁说这不是另一种美好的缘分呢？'
    }
  }
})

// 装饰爱心位置数据
const hearts = [
  { size: 30, top: '10%', left: '10%', delay: 0 },
  { size: 24, top: '20%', right: '15%', delay: 400 },
  { size: 20, bottom: '30%', left: '20%', delay: 800 },
  { size: 28, bottom: '15%', right: '10%', delay: 1200 }
]

// 动画展示匹配度
const animateScore = (targetScore) => {
  isAnimating.value = true
  let current = 0
  const step = targetScore / 60 // 1.2秒内完成(60帧)
  
  const animate = () => {
    current += step
    if (current >= targetScore) {
      matchScore.value = targetScore
      matchLevel.value = resultAnalysis.value.title
      isAnimating.value = false
      return
    }
    matchScore.value = Math.floor(current)
    requestAnimationFrame(animate)
  }
  
  requestAnimationFrame(animate)
}

// 多维度分析数据
const dimensions = computed(() => {
  const score = matchScore.value
  return [
    {
      name: '性格相容',
      score: Math.min(100, score + Math.random() * 10 - 5),
      icon: '🎭',
      color: '#FF69B4'
    },
    {
      name: '兴趣契合',
      score: Math.min(100, score + Math.random() * 10 - 5),
      icon: '⭐',
      color: '#FF1493'
    },
    {
      name: '沟通理解',
      score: Math.min(100, score + Math.random() * 10 - 5),
      icon: '💭',
      color: '#FF69B4'
    },
    {
      name: '未来发展',
      score: Math.min(100, score + Math.random() * 10 - 5),
      icon: '🔮',
      color: '#FF1493'
    }
  ]
})

// 趣味建议数据
const suggestions = computed(() => {
  const score = matchScore.value
  if (score >= 90) {
    return [
      {
        title: '约会建议',
        content: '你们很适合一起去探索新事物！不妨尝试一些刺激的户外活动，或者一起学习一项新技能。',
        icon: '🎯'
      },
      {
        title: '相处之道',
        content: '继续保持现在的相处方式，记得经常表达对彼此的欣赏和感激。',
        icon: '💝'
      }
    ]
  } else if (score >= 70) {
    return [
      {
        title: '培养默契',
        content: '多创造共同话题和回忆，比如一起看一部经典电影系列，或者规划一次短途旅行。',
        icon: '🎬'
      },
      {
        title: '增进感情',
        content: '尝试每周安排一次特别的约会，创造独特的二人时光。',
        icon: '💑'
      }
    ]
  } else if (score >= 50) {
    return [
      {
        title: '沟通技巧',
        content: '学会倾听对方的想法，表达时多用"我觉得"而不是"你应该"。',
        icon: '🗣️'
      },
      {
        title: '共同成长',
        content: '一起参加一些有趣的活动或课程，在互动中增进了解。',
        icon: '🌱'
      }
    ]
  } else {
    return [
      {
        title: '友谊建议',
        content: '保持开放和真诚的态度，或许能发展出一段珍贵的友情。',
        icon: '🤝'
      },
      {
        title: '个人提升',
        content: '把这段经历当作一次学习机会，了解自己真正想要的是什么。',
        icon: '📚'
      }
    ]
  }
})

// 未来预测
const futurePrediction = computed(() => {
  const score = matchScore.value
  if (score >= 90) {
    return {
      title: '未来展望',
      content: '在未来的日子里，你们会创造出许多美好的回忆。无论是事业还是生活，都能互相扶持，共同进步。记得珍惜这份难得的缘分！',
      icon: '🌈'
    }
  } else if (score >= 70) {
    return {
      title: '发展预测',
      content: '只要双方都愿意投入时间和心思，这段关系会越来越稳定。适时的沟通和理解，能让感情更加深厚。',
      icon: '🌟'
    }
  } else if (score >= 50) {
    return {
      title: '机遇与挑战',
      content: '前方可能会遇到一些考验，但这些都是让感情更加成熟的机会。保持耐心和信心，终会柳暗花明。',
      icon: '🌅'
    }
  } else {
    return {
      title: '新的方向',
      content: '有时候缘分就是这么奇妙，也许你们更适合做朋友。保持开放的心态，说不定会发现意想不到的惊喜。',
      icon: '🍀'
    }
  }
})

onMounted(() => {
  // 模拟获取匹配度数据
  setTimeout(() => {
    animateScore(85)
  }, 500)
})
</script>

<template>
  <div class="analysis-page">
    <!-- 装饰爱心 -->
    <HeartAnimation
      v-for="(heart, index) in hearts"
      :key="index"
      :size="heart.size"
      :style="{
        position: 'absolute',
        top: heart.top,
        left: heart.left,
        right: heart.right,
        bottom: heart.bottom,
        animationDelay: heart.delay + 'ms'
      }"
    />
    
    <div class="match-score-section">
      <CircleProgress 
        :percentage="matchScore"
        :size="240"
        :stroke-width="16"
      >
        <div class="score-display" :class="{ animating: isAnimating }">
          <span class="score-number">{{ matchScore }}</span>
          <span class="score-symbol">%</span>
        </div>
      </CircleProgress>
      
      <h2 class="match-level" v-if="matchLevel">
        {{ matchLevel }}
      </h2>
    </div>
    
    <div class="result-analysis">
      <ResultCard
        :title="resultAnalysis.title"
        :content="resultAnalysis.content"
        :delay="1500"
      />
    </div>
    
    <!-- 多维度分析 -->
    <div class="dimensions-section">
      <h3 class="section-title">多维度分析</h3>
      <div class="dimensions-grid">
        <div 
          v-for="dim in dimensions" 
          :key="dim.name"
          class="dimension-card"
          :style="{ '--card-color': dim.color }"
        >
          <div class="dimension-icon">{{ dim.icon }}</div>
          <div class="dimension-name">{{ dim.name }}</div>
          <div class="dimension-score">{{ Math.round(dim.score) }}%</div>
          <div class="progress-bar">
            <div 
              class="progress-fill"
              :style="{ width: dim.score + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 趣味建议 -->
    <div class="suggestions-section">
      <h3 class="section-title">专属建议</h3>
      <div class="suggestions-grid">
        <div 
          v-for="(sug, index) in suggestions" 
          :key="index"
          class="suggestion-card"
          :style="{ animationDelay: (index * 200) + 'ms' }"
        >
          <div class="suggestion-icon">{{ sug.icon }}</div>
          <h4 class="suggestion-title">{{ sug.title }}</h4>
          <p class="suggestion-content">{{ sug.content }}</p>
        </div>
      </div>
    </div>
    
    <!-- 未来预测 -->
    <div class="future-section">
      <ResultCard
        :title="futurePrediction.title"
        :content="futurePrediction.content"
        :delay="2000"
      >
        <template #icon>
          <span class="future-icon">{{ futurePrediction.icon }}</span>
        </template>
      </ResultCard>
    </div>
    
    <!-- 分享按钮 -->
    <ShareButton />
    
    <!-- 重新测试按钮 -->
    <button class="retry-button" @click="router.push('/')">
      再测一次
    </button>
  </div>
</template>

<style scoped>
.analysis-page {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  min-height: 100vh;
}

.match-score-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  max-width: 240px;
}

.score-display {
  position: relative;
  z-index: 1;
  font-size: 120px;
  font-weight: bold;
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease;
}

.score-display.animating {
  animation: pulse 1.2s ease-in-out;
}

.score-symbol {
  font-size: 60px;
}

.match-level {
  font-size: 28px;
  margin-top: 1rem;
  color: #FF1493;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
  animation-delay: 1.2s;
}

.result-analysis {
  margin-top: 2rem;
  padding: 0 1rem;
}

.retry-button {
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  color: #FF1493;
  background: white;
  border: 2px solid #FF1493;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  color: white;
  background: #FF1493;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 20, 147, 0.2);
}

@keyframes pulse {
  50% {
    transform: scale(1.05);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .score-display {
    font-size: 80px;
  }
  
  .score-symbol {
    font-size: 40px;
  }
  
  .match-level {
    font-size: 24px;
  }
  
  .retry-button {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .result-analysis {
    padding: 0 0.8rem;
  }
}

.section-title {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 2rem 0 1rem;
}

/* 多维度分析样式 */
.dimensions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.dimension-card {
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.dimension-card:hover {
  transform: translateY(-4px);
}

.dimension-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.dimension-name {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.dimension-score {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--card-color);
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--card-color);
  transition: width 1s ease-out;
}

/* 趣味建议样式 */
.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.suggestion-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: slideUp 0.6s ease forwards;
}

.suggestion-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.suggestion-title {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 0.8rem;
}

.suggestion-content {
  color: #666;
  line-height: 1.6;
}

/* 动画 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .dimensions-grid,
  .suggestions-grid {
    grid-template-columns: 1fr;
    padding: 0.8rem;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .suggestion-card {
    padding: 1.2rem;
  }
}
</style> 