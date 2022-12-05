<template>
  <div class="filter">
    <base-input class="filter__input" placeholder="Поиск..." :size="18" />
    <base-date v-model="fromDate">от</base-date>
    <base-date v-model="toDate">до</base-date>
    <base-button size="search">Отфильтровать по дате</base-button>
  </div>
</template>

<script>
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseDate from '@/components/Base/BaseDate.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

export default {
  name: 'AppFilterbyDate',
  components: {
    BaseInput,
    BaseDate,
    BaseButton
  },
  data() {
    return {
      fromDate: null,
      toDate: null
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  width: 60vw;
  display: flex;
  margin-bottom: 40px;
  * + * {
    margin-left: 30px;
  }
}
</style>
