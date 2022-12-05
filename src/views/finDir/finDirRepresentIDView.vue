<template>
  <div>
    <base-headline>Представитель {{ represent }}</base-headline>
    <base-input v-model="represent">Номер телефона</base-input>
    <base-input v-model="name" style="margin: 20px 0px">ФИО</base-input>
    <base-button @click="changeRepresent">Сохранить</base-button>
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
  mounted() {
    this.fetchRepresent()
  },
  methods: {
    async fetchRepresent() {
      const res = await RepresentAPI.requestRepresent(this.$route.params.id)
      const data = res.data
      this.represent = data.phone
      this.name = data.full_name
    },
    async changeRepresent() {
      await RepresentAPI.changeRepresent(
        this.$route.params.id,
        JSON.stringify({
          phone: this.represent,
          full_name: this.name
        })
      )
      alert('Пользователь успешно изменён')
    }
  }
}
</script>

<style></style>
