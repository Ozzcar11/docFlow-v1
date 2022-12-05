<template>
   <component :is="layout">
      <router-view />
   </component>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'

export default {
   name: 'App',
   components: {
      MainLayout,
      EmptyLayout
   },
   computed: {
      layout() {
         return this.$route.meta.layout || 'MainLayout'
      }
   }
}
</script>

<style lang="scss">
#app {
   font-family: Roboto, sans-serif;
}

body {
   background-color: $Mercury;
}

.calc {
   &__search {
      &-self {
         .el-input__wrapper {
            width: 300px !important;
         }
      }
   }
}
</style>
