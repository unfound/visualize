<script setup lang="ts">
import GlslRender from '../components/GlslRender.vue'
import mixColors from '../shaders/mix-colors.frag?raw'
import sunrise from '../shaders/sunrise.frag?raw'
import hsb from '../shaders/hsb.frag?raw'
import hsbPolar from '../shaders/hsb-polar.frag?raw'
import rectangle from '../shaders/rectangle.frag?raw'
</script>

<template>
  <div class="flex items-center">
    <GlslRender height="200" width="200" :shader="mixColors"/>
    <GlslRender height="200" width="200" :shader="sunrise"/>
    <GlslRender height="200" width="200" :shader="hsb"/>
    <GlslRender height="200" width="200" :shader="hsbPolar"/>
    <GlslRender height="200" width="200" :shader="rectangle"/>
  </div>
</template>