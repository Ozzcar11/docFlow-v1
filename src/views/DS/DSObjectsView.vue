<template>
   <div v-if="!$route.meta.hideParent" class="objects">
      <base-headline>Объекты</base-headline>
      <app-table v-if="tableRows.length" :tableHeadline="tableHeadline" :tableRows="tableRows">
         <template #action="{ item }">
            <router-link style="padding: 7px 20px" :to="'/DS/objects/' + item" class="table-btn">
               <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3_102)">
                     <path
                        d="M16.6133 11.3075C16.3657 11.3075 16.165 11.5082 16.165 11.7558V15.7361C16.1641 16.4786 15.5626 17.0803 14.8201 17.081H2.24147C1.49898 17.0803 0.897462 16.4786 0.896586 15.7361V4.05406C0.897462 3.31175 1.49898 2.71005 2.24147 2.70918H6.22182C6.46943 2.70918 6.67011 2.5085 6.67011 2.26088C6.67011 2.01345 6.46943 1.81259 6.22182 1.81259H2.24147C1.00411 1.81399 0.00140092 2.8167 0 4.05406V15.7363C0.00140092 16.9737 1.00411 17.9764 2.24147 17.9778H14.8201C16.0575 17.9764 17.0602 16.9737 17.0616 15.7363V11.7558C17.0616 11.5082 16.8609 11.3075 16.6133 11.3075Z"
                        fill="black" />
                     <path
                        d="M16.884 0.659118C16.0962 -0.128723 14.8189 -0.128723 14.0311 0.659118L6.03323 8.65695C5.97842 8.71176 5.93884 8.7797 5.91818 8.8543L4.86644 12.6513C4.82319 12.807 4.86714 12.9737 4.98132 13.088C5.09567 13.2022 5.26238 13.2462 5.41805 13.2031L9.21506 12.1512C9.28966 12.1305 9.3576 12.0909 9.41242 12.0361L17.4101 4.03813C18.1967 3.24976 18.1967 1.97353 17.4101 1.18516L16.884 0.659118ZM7.01002 8.94834L13.5556 2.40256L15.6666 4.51356L9.12085 11.0593L7.01002 8.94834ZM6.58834 9.79449L8.27487 11.4812L5.942 12.1275L6.58834 9.79449ZM16.7762 3.40421L16.3007 3.87965L14.1895 1.76847L14.6652 1.29303C15.1028 0.855421 15.8123 0.855421 16.2499 1.29303L16.7762 1.81908C17.2131 2.25721 17.2131 2.96625 16.7762 3.40421Z"
                        fill="black" />
                  </g>
                  <defs>
                     <clipPath id="clip0_3_102">
                        <rect width="18" height="18" fill="white" />
                     </clipPath>
                  </defs>
               </svg>
            </router-link>
         </template>
      </app-table>
      <h4 class="" v-else>Объектов на вашем уровне нет</h4>
   </div>
   <router-view />
</template>

<script>
import BaseHeadline from '@/components/Base/BaseHeadline.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import AppTable from '@/components/App/AppTable.vue'
import AppFilterbyDate from '@/components/App/AppFilterbyDate.vue'
import { ObjectAPI } from '@/api/object'


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
               key: 'stage',
               text: 'Стадия'
            },
            {
               key: 'lastStage',
               text: 'Предыдущая стадия'
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
         const res = await ObjectAPI.requestObjects()
         for (let item of res.data) {
            this.tableRows.push({
               ...item,
               stage: item.lvl.join('\n'),
               lastStage: item.last_lvl
            })
         }
      }
   },
   computed: {
      hideParent() {
         return this.$route.meta.hideParent
      }
   },
   watch: {
      hideParent(val, oldVal) {
         if (val === undefined && oldVal === true) {
            this.fetchObjects()
         }
      }
   }
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
