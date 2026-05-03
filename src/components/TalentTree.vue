<template>
  <div class="talent-tree-container">
    <div class="header">

      <div class="stats">


      </div>
    </div>

    <div class="tree-canvas">
      <div class="sp">Skill Points: <span>{{ store.skillPoints }}</span></div>
      <svg class="connections" width="100%" height="100%">
        <defs>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line v-for="(line, index) in lines" :key="index" :x1="`${line.source.x}%`" :y1="`${line.source.y}%`"
          :x2="`${line.target.x}%`" :y2="`${line.target.y}%`" :class="['connection-line', line.state]" />
      </svg>

      <TalentNode v-for="talent in store.talents" :key="talent.id" :talent="talent"
        :status="store.talentState(talent.id)" :out-of-points="store.skillPoints <= 0" @learn="store.learnTalent" />
    </div>
    <button class="reset-btn" @click="store.resetTalents()">Reset</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTalentStore } from '../store/talentStore'
import TalentNode from './TalentNode.vue'

const store = useTalentStore()

const lines = computed(() => {
  const result = []
  store.talents.forEach(target => {
    target.dependencies.forEach(depId => {
      const source = store.talents.find(t => t.id === depId)
      if (source) {
        result.push({
          source,
          target,
          state: store.isPathActive(source.id, target.id)
        })
      }
    })
  })
  return result
})
</script>

<style scoped lang="scss">
.talent-tree-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
}

.sp {
  width: fit-content;
  background-color: rgba(0, 240, 255, 0.1);
  color: #00f0ff;
  border: 1px solid #00f0ff;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 900;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
  margin-right: 2rem;
  margin-left: auto;
  padding: 0.3rem 1rem;
  box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.2);
  text-shadow: 0 0 5px #00f0ff;

  span {
    font-size: 1.1rem;
    color: #fff;
    text-shadow: 0 0 5px #fff;
    margin-left: 0.4rem;
  }
}

.reset-btn {
  margin-top: 3rem;
  background: transparent;
  border: 1px solid #ff4444;
  color: #ff4444;
  width: 10rem;
  height: 2rem;
  padding: 0 1rem;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 68, 68, 0.1);
    box-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
  }
}


.tree-canvas {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #0b0c10;
  border-radius: 12px;
  border: 1px solid #1f2833;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.8), 0 10px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;

  .connections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .connection-line {
      stroke-width: 4;
      transition: all 0.5s ease;

      &.inactive {
        stroke: #222;
      }

      &.active {
        stroke: #0ff;
        filter: url(#neonGlow);
      }
    }
  }
}
</style>
