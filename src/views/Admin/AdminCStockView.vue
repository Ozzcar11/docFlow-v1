<template>
  <div class="stock">
    <base-header>Склад</base-header>
    <div class="stock__container">
      <base-input class="stock__input" placeholder="Поиск..." :size="18" />
      <base-button class="stock__button">Найти</base-button>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/Base/BaseHeadline.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

export default {
  name: 'CStock',
  components: {
    BaseHeader,
    BaseInput,
    BaseButton
  }
}
</script>

<style lang="scss" scoped>
.stock {
  width: 40vw;
  &__container {
    display: flex;
  }
  &__button {
    margin-left: 30px;
  }
}
</style>
