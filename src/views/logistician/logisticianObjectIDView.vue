<template>
   <div style="display: flex;">
      <div class="create">
         <base-headline>Редактировать объект</base-headline>
         <base-input v-model="name" disabled>Название объекта</base-input>
         <div class="create__input --flex --justify-between">
            <base-input type="file" multiple @change="fileScheme = $event.target.files">
               Необязательные файлы</base-input>
         </div>
         <AppTable v-if="fileTable.tableRows.length" :tableRows="fileTable.tableRows"
            :tableHeadline="fileTable.tableHeadline">
            <template #action="{ item }">
               <base-file style="margin: 0;" :path="filePath(item)"></base-file>
            </template>
         </AppTable>
         <base-map v-model="mapAddress" disabled />
         <base-input :modelValue="mapAddress[0]" size="14" disabled>Адрес</base-input>
         <AppTable v-if="comments.data[0]" :tableHeadline="comments.tableHeadline" :tableRows="comments.data"
            style="margin-top: 10px" offset="300px" />
         <BaseInput v-model="comments.text" style="margin: 10px 0px">Добавить комментарий</BaseInput>
         <base-select v-model="comments.type" :options="comments.select">Тип комментария</base-select>
         <BaseButton style="margin: 10px 0px; padding: 5px 10px" @click="addComment">Добавить комментарий</BaseButton>
         <div class="create__container">
            <h4 class="create__headline">Гарантия</h4>
            <div class="create__subcontainer">
               <base-input v-model="period" disabled>Срок</base-input>
               <base-input v-model="subscribers" disabled>Количество абонентов</base-input>
               <base-input v-model="represent" disabled>Представитель</base-input>
            </div>
         </div>
         <div class="create__container">
            <h4 class="create__headline">Потенциал</h4>
            <div class="create__subcontainer">
               <base-input v-model="potential" disabled>Потенциал абон. базы</base-input>
               <base-input v-model="competition" disabled>Конкуренция</base-input>
            </div>
         </div>
         <div class="button__container">
            <p class="button__container-desc" v-if="disabledNextBtn">Оставьте комментрий для продолжения</p>
            <base-button @click="changeObject" style="margin-top: 20px" :disabled="disabledNextBtn">Готово</base-button>
         </div>
      </div>
      <div class="calc">
         <div class="calc__search">
            <el-autocomplete class="calc__search-self" v-model="state" :fetch-suggestions="querySearchAsync"
               placeholder="Выберите объект" @select="handleSelect" />
            <BaseButton @click="addToTable" class="calc__button">Добавить</BaseButton>
         </div>
         <AppTable v-if="search.tableRows.length" :tableHeadline="search.tableHeadline" :tableRows="search.tableRows"
            style="margin-top: 10px">
            <template #action="{ item }">
               <div v-if="dynamicMaxValue(item) == 0" style="color: red;">Отсутствуют на складе</div>
               <el-input-number v-else :min="0" :max="dynamicMaxValue(item)" size="small" @change="handleChange" />
            </template>
            <template #delele="{ item }">
               <BaseButton @click="deleteObjFromSearcTable(item)" theme="danger">Удалить</BaseButton>
            </template>
         </AppTable>
      </div>
   </div>
   <h4 class="create__headline">Логи</h4>
   <AppTable v-if="logsTable.tableRows.length" :tableRows="logsTable.tableRows" :tableHeadline="logsTable.tableHeadline" />
   <h6 v-else>Логи отсутствуют</h6>
</template>

<script>
import BaseHeadline from '@/components/Base/BaseHeadline.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseMap from '@/components/Base/BaseMap.vue'
import BaseFile from '@/components/Base/BaseFile.vue'

import { ObjectAPI } from '@/api/object'
import { FilesAPI } from "@/api/files"
import AppTable from '@/components/App/AppTable.vue'

import createFormData from '@/utils/createFormData'

export default {
   components: {
      BaseHeadline,
      BaseInput,
      BaseSelect,
      BaseButton,
      BaseMap,
      BaseFile,
      AppTable
   },
   data() {
      return {
         disabledNextBtn: true,
         comments: {
            tableHeadline: [
               {
                  key: 'date',
                  text: 'Дата'
               },
               {
                  key: 'user',
                  text: 'Пользователь'
               },
               {
                  key: 'comment',
                  text: 'Комментарий'
               }
            ],
            select: [
               {
                  value: 'user',
                  text: 'Общий'
               },
               {
                  value: 'some',
                  text: 'Скрытый'
               }
            ],
            data: [],
            text: null,
            type: 'user'
         },
         representsSelect: [],
         mapAddress: [],
         name: null,
         period: null,
         subscribers: null,
         represent: null,
         potential: null,
         competition: null,
         fileScheme: null,
         objectID: this.$route.params.id,
         fileTable: {
            tableHeadline: [
               {
                  key: 'name',
                  text: 'Имя файла'
               },
               {
                  key: 'action',
                  text: '',
                  slot: true
               }
            ],
            tableRows: [],
         },
         logsTable: {
            tableHeadline: [
               {
                  key: 'date',
                  text: 'Дата'
               },
               {
                  key: 'text',
                  text: 'Сообщения',
               }
            ],
            tableRows: [],
         },
         search: {
            tableHeadline: [
               {
                  key: 'name',
                  text: 'Имя',
               },
               {
                  key: 'action',
                  text: '',
                  slot: true
               },
               {
                  key: 'delele',
                  text: '',
                  slot: true
               },
            ],
            tableRows: [],
         },
         state: '',
         selectedItem: null,
      }
   },
   mounted() {
      this.fetchObject()
      this.fetchComments()
      this.fetchFiles()
      this.fetchLogs()
   },
   methods: {
      async fetchLogs() {
         const res = await ObjectAPI.requestLogs(this.$route.params.id)
         const data = res.data

         for (let item of data) {
            this.logsTable.tableRows.push({
               date: item.date,
               text: item.text
            })
         }
      },
      deleteObjFromSearcTable(value) {
         this.search.tableRows = this.search.tableRows.filter(item => item.id !== value)

      },
      handleSelect(item) {
         this.selectedItem = item
      },
      dynamicMaxValue(item) {
         const res = this.search.tableRows.find(item1 => item1.id === item)
         return res.value
      },
      addToTable() {
         this.search.tableRows.push({
            id: this.selectedItem.id,
            name: this.selectedItem.value,
            value: this.selectedItem.quantity
         })
         this.state = ''
      },
      async querySearchAsync() {
         const res = await ObjectAPI.searchObject({
            "search_title": this.state,
            "count": 10
         })
         const result = []
         for (let item of res.data.data)
            result.push({
               id: item.id,
               value: item.name,
               quantity: item.quantity,
            })
         return result
      },
      async fetchObject() {
         const res = await ObjectAPI.requestObject(this.objectID)
         const data = res.data
         this.name = data.name
         this.competition = data.competition
         this.potential = data.potential
         this.represent = data.representative
         this.subscribers = data.number_subscribers
         this.period = data.period
         this.mapAddress.push(data.address)
         this.mapAddress.push(data.coordinates.split(', '))
      },
      async fetchComments() {
         const res = await ObjectAPI.requestComments(this.objectID)
         const data = res.data
         this.comments.data = []
         for (let item of data) {
            this.comments.data.push({
               date: item.date,
               user: item.who,
               comment: item.text
            })
         }
      },
      async fetchFiles() {
         const resR = await FilesAPI.getRegularFilesObject(this.objectID)
         this.fileTable.tableRows = [...resR.data]
      },
      async changeObject() {
         try {
            if (this.fileScheme) {
               await FilesAPI.sendRegularFileObject(this.objectID, createFormData(this.fileScheme))
            }
         } catch (e) {
            alert('Что-то пошло не так! Попробуйте позже')
            this.$router.push('/logistician/')
            return
         }
         await ObjectAPI.nextObject(this.objectID, JSON.stringify({
            action: 'up',
            lvl: 'lvl11',
            choice1: false,
            choice2: false
         }))

         for (let item of this.search.tableRows) {
            if (item.value !== 0) {
               await ObjectAPI.materialsObject(JSON.stringify({
                  material_name_1S: item.name,
                  material_id_1S: item.id,
                  count_material_1S: item.value,
                  link_object: this.objectID
               }))
            }
         }
         ObjectAPI.checkObject(this.objectID)
         alert('Объект успешно завершён')
         this.$router.push('/logistician/')
      },
      async addComment() {
         this.disabledNextBtn = false
         await ObjectAPI.addComment(
            JSON.stringify({
               object: this.objectID,
               text: this.comments.text,
               who: this.comments.type
            })
         )
         this.fetchComments()
      },
      filePath(id) {
         const path = this.fileTable.tableRows.find(item => item.id === id)
         if (path) return path.path
      },
   },
}
</script>

<style lang="scss" scoped>
.create {
   width: 490px;

   &__input {
      margin-top: 15px;
   }

   &__headline {
      font-weight: 400;
   }

   &__subcontainer {
      .input {
         margin: 10px 0px;
      }
   }
}

.button__container {
   display: flex;
   flex-direction: column;
   width: 40%;

   &-desc {
      color: red;
      font-size: 10px;
      margin-bottom: -20px;
   }
}

.calc {
   margin: 40px 0px 0px 120px;

   &__search {
      &-self {
         .el-input__wrapper {
            width: 300px !important;
            border-radius: 0px !important;
         }
      }
   }

   &__button {
      margin-left: 20px;
   }
}
</style>
