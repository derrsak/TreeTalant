import { defineStore } from 'pinia'

export const useTalentStore = defineStore('talent', {
  state: () => ({
    skillPoints: 5,
    learnedTalents: [],
    talents: [
      { id: 'core', name: 'Neural Sync', x: 50, y: 85, dependencies: [] },
      { id: 'left_1', name: 'Agility', x: 25, y: 65, dependencies: ['core'] },
      { id: 'right_1', name: 'Overclocked Mind', x: 75, y: 65, dependencies: ['core'] },
      { id: 'left_2', name: 'Kinetic Shield', x: 15, y: 40, dependencies: ['left_1'] },
      { id: 'mid_left', name: 'Titan’s Core', x: 40, y: 40, dependencies: ['left_1'] },
      { id: 'mid_right', name: 'Ghost Step', x: 60, y: 40, dependencies: ['right_1'] },
      { id: 'right_2', name: 'Shadow Strike', x: 85, y: 40, dependencies: ['right_1'] },
      { id: 'ultimate', name: 'Singularity Point', x: 50, y: 15, dependencies: ['mid_left', 'mid_right'] }
    ]
  }),
  getters: {
    isTalentLearned: (state) => (id) => {
      return state.learnedTalents.includes(id)
    },
    isTalentAvailable: (state) => (id) => {
      if (state.learnedTalents.includes(id)) return false

      const talent = state.talents.find(t => t.id === id)
      if (!talent) return false
      if (talent.dependencies.length === 0) return true
      return talent.dependencies.every(depId => state.learnedTalents.includes(depId))
    },
    talentState: (state) => {
      return (id) => {
        if (state.learnedTalents.includes(id)) return 'learned'

        const talent = state.talents.find(t => t.id === id)
        if (!talent) return 'locked'

        const depsMet = talent.dependencies.every(depId => state.learnedTalents.includes(depId))

        if (depsMet) {
          return 'available'
        }

        return 'locked'
      }
    },

    isPathActive: (state) => (sourceId, targetId) => {
      if (state.learnedTalents.includes(sourceId) && state.learnedTalents.includes(targetId)) {
        return 'active'
      }
      return 'inactive'
    }
  },
  actions: {
    learnTalent(id) {
      if (this.skillPoints <= 0) return

      if (this.learnedTalents.includes(id)) return

      const talent = this.talents.find(t => t.id === id)
      if (!talent) return

      const depsMet = talent.dependencies.every(depId => this.learnedTalents.includes(depId))

      if (depsMet) {
        this.learnedTalents.push(id)
        this.skillPoints--
      }
    },
    resetTalents() {
      this.learnedTalents = []
      this.skillPoints = 5
    }
  }
})
