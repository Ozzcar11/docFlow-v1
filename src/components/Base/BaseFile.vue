<template>
   <div class="file">
      <div v-if="$slots.default" class="file__slot">
         <slot />
      </div>
      <a class="file__self" :href="'/media/' + path" download>Скачать</a>
   </div>
</template>

<script>
export default {
   props: {
      path: {
         type: String,
         default: ''
      },
   },
   BASE_URL: process.env.VUE_APP_BASE_URL,
}
</script>

<style lang="scss" scoped>
.file {
   color: $Gray;
   font-family: Roboto, sans-serif;
   font-size: 13px;
   font-weight: 300;
   flex: 1 1 100px;
   margin-top: 10px;

   &__slot {
      margin-bottom: 5px;
   }

   &__self {
      display: inline-block;
      color: #fff;
      font-weight: 500;
      background-color: $FunBlue;
      padding: 5px 16px;
      line-height: 15px;
      border-radius: 15px;
      cursor: pointer;
      text-decoration: none;
   }
}
</style>
