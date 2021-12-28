<script setup lang="ts">
import GlslRender from '../components/GlslRender.vue'
import mixColors from '../shaders/mix-colors.frag?raw'
import sunrise from '../shaders/sunrise.frag?raw'
import hsb from '../shaders/hsb.frag?raw'
import hsbPolar from '../shaders/hsb-polar.frag?raw'
import rectangle from '../shaders/rectangle.frag?raw'
import circle from '../shaders/circle.frag?raw'
import circle1 from '../shaders/circle1.frag?raw'
import circle2 from '../shaders/circle2.frag?raw'
import polar from '../shaders/polar.frag?raw'
import fieldPolar from '../shaders/field-polar.frag?raw'
import radar from '../shaders/radar.frag?raw'
</script>

<template>
  <div class="flex items-center flex-wrap">
    <GlslRender height="200" width="200" :shader="mixColors"/>
    <GlslRender height="200" width="200" :shader="sunrise"/>
    <GlslRender height="200" width="200" :shader="hsb"/>
    <GlslRender height="200" width="200" :shader="hsbPolar"/>
    <GlslRender height="200" width="200" :shader="rectangle"/>
    <GlslRender height="200" width="200" :shader="circle"/>
    <GlslRender height="200" width="200" :shader="circle1"/>
    <GlslRender height="200" width="200" :shader="circle2"/>
    <GlslRender height="200" width="200" :shader="polar"/>
    <GlslRender height="200" width="200" :shader="fieldPolar"/>
    <GlslRender height="800" width="800" :shader="radar"/>
  </div>
</template>