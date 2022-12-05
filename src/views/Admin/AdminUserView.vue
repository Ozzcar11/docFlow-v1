<template>
   <div class="reedit">
      <base-headline>Пользователь {{ name }}</base-headline>
      <base-input v-model="tel" size="16" v-maska="'+7 (###) ###-##-##'" />
      <base-input v-model="name" style="margin: 20px 0px" size="16" />
      <base-select v-model="role" :options="select" />
      <base-button @click="changeUser" style="margin-top: 40px">Редактировать</base-button>
   </div>
</template>

<script>
import BaseHeadline from '@/components/Base/BaseHeadline.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import { UsersAPI } from '@/api/users'

import stringToPhone from '@/utils/stringToPhone'

export default {
   name: 'AdminAddView',
   components: {
      BaseHeadline,
      BaseInput,
      BaseSelect,
      BaseButton
   },
   data() {
      return {
         tel: null,
         name: null,
         role: 0,
         select: [
            {
               value: 0,
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
   mounted() {
      this.fetchUser()
   },
   methods: {
      async fetchUser() {
         const res = await UsersAPI.detailUser(this.$route.params.id)
         const data = res.data
         this.tel = stringToPhone(data.phone)
         this.name = data.FIO
         this.role = data.roles
      },
      async changeUser() {
         await UsersAPI.changeUser(
            this.$route.params.id,
            JSON.stringify({
               phone: '+' + this.tel.replace(/[^0-9]/g, ''),
               FIO: this.name,
               roles: this.role
            })
         )
         alert('Пользователь успешно изменён')
         this.$router.push('/admin')
      }
   }
}
</script>

<style lang="scss" scoped>

</style>
