<script lang="ts" setup>

</script>

<template>
    <svg width="420px" height="90px" xmlns="http://www.w3.org/2000/svg">
        <!-- <line stroke-width="6" stroke="red" stroke-opacity="0.2" stroke-dasharray="10, 2" x1="20" y1="30" x2="100" y2="30"/>
        <circle cx="10" cy="10" r="5"/> -->
        <!-- <path d="M 0 0 200 10 30 30" style="fill: none; stroke: black;" /> -->
        <rect rx="8" id="svg_1" height="90" width="320" y="0" x="0" fill="#FFA9A2"/>
        <rect rx="8" id="svg_2" height="90" width="100" y="0" x="318" stroke-opacity="null" fill="#FFA9A2"/>
        <line stroke-width="1" stroke="#666" stroke-dasharray="10, 2" x1="320" y1="6" x2="320" y2="84"/>
    </svg>
</template>

<style>
line {
    /* 设置反锯齿 */
    shape-rendering: auto;
}
</style>