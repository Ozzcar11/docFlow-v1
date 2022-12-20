<template>
   <div class="container">
      <aside class="aside">
         <div class="--flex --justify-center">
            <h1 class="aside__header">
               Карточка <br />
               объекта
            </h1>
         </div>
         <nav class="aside__nav">
            <app-menu :menuList="menuList" />
         </nav>
         <button @click="onLogout" class="aside__exit">
            <img src="../assets/icons/logout.svg" alt="logout" />
            <span>Выход</span>
         </button>
      </aside>
      <div style="margin-bottom: 30px">
         <slot />
      </div>
      <!-- <div v-if="$store.getters.getUserRoute === 'admin'" class="aside__admin admin"> -->
      <div v-if="false" class="aside__admin admin">
         <nav>
            <app-menu :menuList="adminMenuList" @clickAdmin="asideMenuHandler" pad />
         </nav>
      </div>
   </div>
</template>

<script>
import AppMenu from '@/components/App/AppMenu.vue'

import webSocket from '@/api/notificationWS'

import { ElNotification } from 'element-plus'

import { roles } from '@/utils/rolesForMenu'

export default {
   name: 'mainLayout',
   components: {
      AppMenu
   },
   created() {
      this.asideMenuHandler(`/${this.$store.getters.getUserRoute}/`)
      console.log('unmounted');
      const socket = webSocket('notification')

      socket.onmessage = (e) => {
         console.log(e);
         const res = JSON.parse(e.data)
         if (res.roles.includes(+
            this.$store.getters.getUserRole)) {
            ElNotification({
               ...res,
               type: res.notifType,
               duration: 0,
            })
         }
      }
   },
   data() {
      return {
         menuList: [],
         adminMenuList: roles
      }
   },
   methods: {
      async onLogout() {
         await this.$store.dispatch('onLogout')
         this.$router.push('/login')
      },
      asideMenuHandler(val) {
         this.menuList = this.adminMenuList.find(
            (item) => item.routerPath === val
         )?.asideMenu
      }
   }
}
</script>

<style lang="scss" scoped>
.container {
   display: flex;
   min-height: 100vh;
}

.aside {
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: stretch;
   width: 200px;
   margin-right: 28px;
   background-color: #fff;

   &__nav {
      margin-top: 50px;
   }

   &__header {
      margin-top: 30px;
      font-size: 18px;
      font-family: Segoe, sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 24px;
   }

   &__exit {
      position: fixed;
      bottom: 10px;
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 20px 66px;
      border: none;
      background-color: transparent;
      cursor: pointer;

      img {
         width: 15px;
         height: 15px;
         margin-right: 5px;
      }
   }
}

.admin {
   position: fixed;
   right: 0;
   height: 100vh;
   background-color: #fff;
   overflow: auto;

   &__list {
      list-style: none;
      margin: 0;
      padding: 30px;
   }

   &__item {
      a {
         color: inherit;
         text-decoration: none;
      }
   }
}
</style>
