<template>
   <div v-if="!$route.meta.hideParent" class="objects">
      <base-headline>Объекты</base-headline>
      <app-table v-if="tableRows.length" :tableHeadline="tableHeadline" :tableRows="tableRows">
         <template #action="{ item }">
            <button @click="deleteNotification(item)">Удалить</button>
         </template>
      </app-table>
      <h4 class="" v-else>Уведомлений на вашем уровне нет</h4>
   </div>
   <router-view />
</template>

<script>
import BaseHeadline from '@/components/Base/BaseHeadline.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import AppTable from '@/components/App/AppTable.vue'
import AppFilterbyDate from '@/components/App/AppFilterbyDate.vue'
import { NotificationAPI } from '@/api/notification'


export default {
   name: 'ORRObjectView',
   components: {
      BaseHeadline,
      BaseButton,
      AppTable,
      AppFilterbyDate
   },
   data() {
      return {
         tableHeadline: [
            {
               key: 'id',
               text: 'ID'
            },
            {
               key: 'name',
               text: 'Название'
            },
            {
               key: 'comment',
               text: 'Комментарий'
            },
            {
               key: 'action',
               text: 'Действие',
               slot: true
            }
         ],
         tableRows: []
      }
   },
   mounted() {
      this.fetchObjects()
   },
   methods: {
      async fetchObjects() {
         this.tableRows = []
         const res = await NotificationAPI.getNotifications(this.$store.getters.getUserBackRole)
         console.log(res.data);
         for (let item of res.data) {
            this.tableRows.push({
               ...item
            })
         }
      }
   },
}
</script>

<style lang="scss" scoped>
.objects {
   &__header {
      width: 60vw;
      display: flex;
      margin-bottom: 40px;

      *+* {
         margin-left: 30px;
      }
   }
}
</style>
