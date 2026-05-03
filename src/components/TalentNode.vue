<template>
  <div class="talent-node" :class="[status, { 'out-of-points': outOfPoints && status === 'available' }]"
    :style="{ left: `${talent.x}%`, top: `${talent.y}%` }" @click="handleClick">
    <div class="icon-container">
      <span class="icon">{{ talent.name.charAt(0) }}</span>
    </div>
    <div class="tooltip">{{ talent.name }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  talent: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  outOfPoints: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['learn'])

const handleClick = () => {
  if (props.status === 'available' && !props.outOfPoints) {
    emit('learn', props.talent.id)
  }
}
</script>

<style scoped lang="scss">
.talent-node {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 10;

  .icon-container {
    width: 100%;
    height: 100%;
    background-color: #08080c;
    border: 2px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    font-weight: 900;
    font-size: 1.6rem;
    font-family: 'Courier New', Courier, monospace;
    transition: all 0.3s ease;
    clip-path: polygon(25% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%, 0% 25%);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(0deg,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0.2) 1px,
          transparent 1px,
          transparent 2px);
      pointer-events: none;
    }
  }

  .tooltip {
    position: absolute;
    bottom: -45px;
    white-space: nowrap;
    background: #333;
    color: #aaa;
    padding: 6px 12px;
    font-weight: 900;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s;
    clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
    z-index: 20;
  }

  &:hover .tooltip {
    opacity: 1;
    bottom: -45px;
  }

  &.locked {
    cursor: not-allowed;

    .icon-container {
      background-color: #0a0a0a;
      border-color: #2a0808;
      color: #4a1515;
    }

    .tooltip {
      background: #2a0808;
      color: #ff5555;
    }
  }

  &.available {
    filter: drop-shadow(0 0 8px rgba(252, 238, 10, 0.4));

    .tooltip {
      background: #fcee0a;
      color: #000;
    }

    .icon-container {
      border-color: #fcee0a;
      color: #fcee0a;
      animation: cyber-glitch 3s infinite;
      box-shadow: inset 0 0 15px rgba(252, 238, 10, 0.2);
    }

    &:hover {
      filter: drop-shadow(0 0 15px rgba(252, 238, 10, 0.8));
      z-index: 30;
    }

    &:hover .icon-container {
      background-color: rgba(252, 238, 10, 0.1);
      box-shadow: inset 0 0 20px rgba(252, 238, 10, 0.4);
      text-shadow: 0 0 5px #fcee0a;
    }

    &.out-of-points {
      cursor: not-allowed;
      filter: drop-shadow(0 0 5px rgba(255, 0, 60, 0.3));

      .tooltip {
        background: #ff003c;
        color: #fff;
      }

      .icon-container {
        animation: none;
        border-color: #ff003c;
        color: #ff003c;
        box-shadow: inset 0 0 10px rgba(255, 0, 60, 0.1);
      }

      &:hover {
        filter: drop-shadow(0 0 10px rgba(255, 0, 60, 0.6));
      }

      &:hover .icon-container {
        background-color: rgba(255, 0, 60, 0.1);
        text-shadow: 0 0 5px #ff003c;
      }
    }
  }

  &.learned {
    filter: drop-shadow(0 0 12px rgba(0, 240, 255, 0.7));

    .tooltip {
      background: #00f0ff;
      color: #000;
    }

    .icon-container {
      border-color: #00f0ff;
      color: #00f0ff;
      background-color: rgba(0, 240, 255, 0.15);
      box-shadow: inset 0 0 25px rgba(0, 240, 255, 0.4);
      text-shadow: 0 0 8px #00f0ff;
    }

    &:hover {
      z-index: 30;
    }
  }
}

@keyframes cyber-glitch {
  0% {
    transform: translate(0) skew(0deg);
    opacity: 1;
  }

  2% {
    transform: translate(-2px, 1px) skew(-5deg);
    opacity: 0.8;
  }

  4% {
    transform: translate(2px, -1px) skew(5deg);
    opacity: 1;
    filter: hue-rotate(90deg);
  }

  6% {
    transform: translate(0) skew(0deg);
    filter: hue-rotate(0deg);
  }

  100% {
    transform: translate(0) skew(0deg);
  }
}
</style>
