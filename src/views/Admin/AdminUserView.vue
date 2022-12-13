<template>
   <div class="reedit">
      <base-headline>Пользователь {{ name }}</base-headline>
      <base-input v-model="tel" size="16" v-maska="'+7 (###) ###-##-##'" />
      <base-input v-model="name" style="margin: 20px 0px" size="16" />
      <base-input v-model="pass" placeholder="Введите новый пароль при желании" style="margin: 20px 0px" size="16" />
      <base-input v-if="pass.length" v-model="rePass" placeholder="Повторите пароль" style="margin: 20px 0px"
         size="16" />
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
      async fetchUser() {
         const res = await UsersAPI.detailUser(this.$route.params.id)
         const data = res.data
         this.tel = stringToPhone(data.phone)
         this.name = data.FIO
         this.role = +data.roles
      },
      async changeUser() {
         if (this.pass !== this.rePass) {
            alert('Пароли не совпадают')
            return
         } else {
            if (this.pass.length) {
               await UsersAPI.newPass(this.$route.params.id, JSON.stringify({
                  password: this.pass
               }))
            }
         }
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
