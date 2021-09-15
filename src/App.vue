<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import Stats from 'stats.js'

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

function animate () {
  stats.begin()
  stats.end()

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
