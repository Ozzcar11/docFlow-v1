<template>
   <div class="reedit">
      <base-headline>Создать пользователя</base-headline>
      <base-input v-model="tel" placeholder="Номер телефона" size="16" v-maska="'+7 (###) ###-##-##'" />
      <base-input v-model="name" placeholder="ФИО" style="margin: 20px 0px" size="16" />
      <base-input v-model="pass" placeholder="Введите пароль" style="margin: 20px 0px" size="16" />
      <base-input v-if="pass.length" v-model="rePass" placeholder="Повторите пароль" style="margin: 20px 0px"
         size="16" />
      <base-select v-model="role" :options="select" />
      <base-button @click="createUser" style="margin-top: 40px">Создать</base-button>
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
         pass: '',
         rePass: '',
         role: 0,
         select: [
            {
               value: 0,
               text: 'Роль',
               disabled: true
            }
         ]
      }
   },
   mounted() {
      this.fetchUser()
      this.fetchRoles()
   },
   methods: {
      async fetchRoles() {
         const res = await UsersAPI.listRoles()
         this.select = [...this.select, ...res.data]
      },
      async createUser() {
         if (this.pass !== this.rePass) {
            alert('Пароли не совпадают')
            return
         } else {
            await UsersAPI.createUser(
               JSON.stringify({
                  phone: '+' + this.tel.replace(/[^0-9]/g, ''),
                  FIO: this.name,
                  roles: this.role,
                  password: this.pass
               })
            )
         }
         alert('Пользователь успешно добавлен')
         this.$router.push('/admin/users')
      },
      async fetchUser() {
         const res = await UsersAPI.detailUser(this.$route.params.id)
         const data = res.data
         this.tel = stringToPhone(data.phone)
         this.name = data.FIO
         this.role = +data.roles
      },
   }
}
</script>

<style lang="scss" scoped>

</style>
