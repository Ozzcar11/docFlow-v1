<template>
  <div class="add">
    <base-headline>Добавить пользователя</base-headline>
    <base-input
      placeholder="+7 (123) 456-78-90"
      size="16"
      v-maska="'+7 (###) ###-##-##'"
      v-model="tel"
    />

    <base-input
      v-model="name"
      style="margin: 20px 0px"
      placeholder="ФИО"
      size="16"
    />
    <base-select v-model="role" :options="select" />
    <base-button @click="createUser" style="margin-top: 40px"
      >Добавить</base-button
    >
  </div>
</template>

<script>
import BaseHeadline from '@/components/Base/BaseHeadline.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import { UsersAPI } from '@/api/users'

export default {
  name: 'AdminAddView',
  components: {
    BaseHeadline,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      tel: null,
      name: null,
      role: 0,
      select: [
        {
          value: '0',
          text: 'Роль',
          disabled: true
        },
        {
          value: 1,
          text: 'Администратор'
        },
        {
          value: 2,
          text: 'ОРР'
        },
        {
          value: 3,
          text: 'ГД'
        },
        {
          value: 4,
          text: 'Начальник ПКО'
        },
        {
          value: 5,
          text: 'Проектный отдел'
        },
        {
          value: 6,
          text: 'Юрист'
        },
        {
          value: 7,
          text: 'ПТО'
        },
        {
          value: 8,
          text: 'Техдиректор'
        },
        {
          value: 9,
          text: 'Зам ГД'
        },
        {
          value: 10,
          text: 'Логист'
        },
        {
          value: 11,
          text: 'Складовщик'
        },
        {
          value: 12,
          text: 'Бригадир'
        },
        {
          value: 13,
          text: 'Технадзор'
        },
        {
          value: 14,
          text: 'Бухгалтерия'
        },
        {
          value: 15,
          text: 'Отдел кадров'
        }
      ]
    }
  },
  methods: {
    async createUser() {
      await UsersAPI.createUser(
        JSON.stringify({
          phone: '+' + this.tel.replace(/[^0-9]/g, ''),
          FIO: this.name,
          roles: this.role
        })
      )
      alert('Пользователь успешно добавлен')
      this.$router.push('/admin/users')
    }
  },
  validations() {
    return {
      tel: { required },
      name: { required },
      role: { required }
    }
  }
}
</script>

<style lang="scss" scoped></style>
