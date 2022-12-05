<template>
  <div>
    <base-headline>Добавить представителя</base-headline>
    <base-input
      v-model="represent"
      placeholder="Введите номер телефона"
      v-maska="'+7 (###) ###-##-##'"
      >Номер телефона</base-input
    >
    <base-input
      v-model="name"
      style="margin: 20px 0px"
      placeholder="ФИО представителя"
      >ФИО</base-input
    >
    <base-button @click="createRepresent">Добавить</base-button>
  </div>
</template>

<script>
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseHeadline from '@/components/Base/BaseHeadline.vue'

import { RepresentAPI } from '@/api/represent'

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseHeadline
  },
  data() {
    return {
      represent: null,
      name: null
    }
  },
  methods: {
    async createRepresent() {
      await RepresentAPI.createRepresent(
        JSON.stringify({
          phone: '+' + this.represent.replace(/[^0-9]/g, ''),
          full_name: this.name
        })
      )
      alert('Пользователь успешно создан')
      this.represent = this.name = ''
    }
  }
}
</script>

<style></style>
