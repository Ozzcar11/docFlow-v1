<template>
  <h3 class="headline">
    <slot />
  </h3>
</template>

<script>
export default {
  name: 'BaseHeader'
}
</script>

<style lang="scss" scoped>
.headline {
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  margin: 40px 0px 55px;
}
</style>
