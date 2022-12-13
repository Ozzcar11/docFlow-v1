<template>
   <div class="login">
      <div class="login__container">
         <div class="login__header">
            <h1>
               Карточка <br />
               объекта
            </h1>
         </div>
         <!-- <base-input
        class="login__input"
        v-maska="'+7 (###) ###-##-##'"
        :placeholder="'Номер телефона'"
        :size="13"
        :disabled="switchToSMS"
        v-model.trim="telInput"
        >Введите номер телефона</base-input
      >
      <div class="login__desc" v-if="switchToSMS">
        На ваш номер направлен СМС код
      </div>
      <div class="login__footer">
        <base-input
          v-if="switchToSMS"
          v-model.lazy.trim="codeInput"
          v-maska="'#*'"
          :size="13"
        />
        <base-button :disabled="buttonCheck" @click="buttonHandler" size="full"
          >Войти</base-button
        >
      </div> -->
         <base-input class="login__input" v-maska="'+7 (###) ###-##-##'" :placeholder="'Номер телефона'" :size="13"
            v-model.trim="telInput">Введите номер телефона</base-input>
         <base-input class="login__input" placeholder="Пароль" :size="13" v-model.trim="passInput">Введите
            пароль</base-input>
         <base-button :disabled="buttonCheck" @click="buttonHandler" size="full">Войти</base-button>
         <div class="login__version">v1.0</div>
         <div class="">{{ this.code }}</div>
      </div>
   </div>
</template>

<script>
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

import { AuthAPI } from '@/api/auth'

import { mapActions, mapGetters } from 'vuex'

export default {
   name: 'LoginView',
   components: {
      BaseInput,
      BaseButton
   },
   data() {
      return {
         switchToSMS: false,
         telInput: '',
         codeInput: '',
         code: '',
         passInput: '',
      }
   },
   methods: {
      ...mapActions(['onLogin']),
      // async buttonHandler() {
      //    if (!this.switchToSMS) {
      //       this.switchToSMS = true
      //       await this.sendTelephone()
      //       return
      //    }
      //    await this.onLogin(this.generateRequest(+this.codeInput))
      //    if (localStorage.getItem('userRole')) {
      //       this.$router.push(`/${this.$store.getters.getUserRoute}`)
      //    }
      // },
      async buttonHandler() {
         try {
            await this.onLogin(this.generateRequest(this.passInput))
            if (localStorage.getItem('userRole')) {
               this.$router.push(`/${this.$store.getters.getUserRoute}`)
            }
         } catch (e) {
            alert('Проверьте правильность введённых данных')
         }
      },

      generateRequest(password) {
         return JSON.stringify({
            username: '+' + this.telInput.replace(/[^0-9]/g, ''),
            password
         })
      },

      // async sendTelephone() {
      //    try {
      //       const res = await AuthAPI.sendTelephone(this.generateRequest())
      //       this.code = res.data.code
      //    } catch (e) {
      //       console.log(e)
      //    }
      // }
   },
   computed: {
      ...mapGetters['getUserRoute'],
      // buttonCheck() {
      //    if (!this.switchToSMS) {
      //       return this.telInput.length !== 18
      //    }
      //    return this.codeInput.length === 0
      // }
      buttonCheck() {
         return this.telInput.length < 6 || this.passInput.length < 4
      }
   }
}
</script>

<style lang="scss" scoped>
.login {
   &__container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 300px;
      padding: 23px 45px;
      background-color: #fff;
   }

   &__header {
      font-family: Segoe, sans-serif;
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      margin: 0px auto 23px;

      h1 {
         font-size: 18px;
      }
   }

   &__input {
      margin-bottom: 11px;
   }

   &__version {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 15px;
      color: $Alto;
      font-size: 13px;
      font-weight: 300;
   }

   &__footer {
      display: flex;
      gap: 16px;
   }

   &__desc {
      color: $EasternBlue;
      font-size: 13px;
      font-weight: 300;
      margin-bottom: 7px;
   }
}
</style>
