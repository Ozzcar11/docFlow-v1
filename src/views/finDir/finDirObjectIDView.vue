<template>
   <div class="create">
      <base-headline>Редактировать объект</base-headline>
      <base-input v-model="name" disabled>Название объекта</base-input>
      <div class="create__input --flex --justify-between">
         <base-input type="file" @change="fileDraft = $event.target.files">Обязательный файл *</base-input>
         <base-input style="margin-left: 40px" type="file" multiple @change="fileScheme = $event.target.files">
            Необязательные файлы</base-input>
      </div>
      <AppTable v-if="fileTable.tableRows.length" :tableRows="fileTable.tableRows"
         :tableHeadline="fileTable.tableHeadline">
         <template #action="{ item }">
            <base-file style="margin: 0;" :path="filePath(item)"></base-file>
         </template>
      </AppTable>
      <base-map v-model="mapAddress" />
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
            <base-select v-model="represent" disabled :options="representsSelect">Представитель</base-select>
         </div>
      </div>
      <div class="create__container">
         <h4 class="create__headline">Потенциал</h4>
         <div class="create__subcontainer">
            <base-input v-model="potential" disabled>Потенциал абон. базы</base-input>
            <base-input v-model="competition" disabled>Конкуренция</base-input>
         </div>
      </div>
      <div style="display: flex;
      flex-direction: column; width: 40%;">
         <base-button v-if="this.lastLVL === 'НачальникПКО'" @click="changeObject" style="margin-top: 20px"
            :disabled="disabledNextBtn">Сохранить</base-button>
         <base-button v-if="this.lastLVL === 'НачальникПКО'" @click="cancelObject" style="margin-top: 20px"
            theme="danger" :disabled="disabledNextBtn">Отказать</base-button>
      </div>
      <h4 class="create__headline">Логи</h4>
      <AppTable v-if="logsTable.tableRows.length" :tableRows="logsTable.tableRows"
         :tableHeadline="logsTable.tableHeadline" />
      <h6 v-else>Логи отсутствуют</h6>
   </div>
</template>

<script>
import BaseHeadline from '@/components/Base/BaseHeadline.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseMap from '@/components/Base/BaseMap.vue'
import BaseFile from '@/components/Base/BaseFile.vue'

import { RepresentAPI } from '@/api/represent'
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
         represent: 1,
         potential: null,
         competition: null,
         fileDraft: null,
         fileScheme: null,
         objectID: null,
         lastLVL: null,
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
         isFinDir: false,
      }
   },
   mounted() {
      this.fetchRepresents()
      this.fetchObject()
      this.fetchComments()
      this.fetchLogs()
   },
   methods: {
      async fetchRepresents() {
         const res = await RepresentAPI.requestRepresents()
         for (let item of res.data) {
            this.representsSelect.push({
               value: item.id,
               text: item.full_name
            })
         }
      },
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
      async fetchObject() {
         const res = await ObjectAPI.requestObject(this.$route.params.id)
         const data = res.data
         this.name = data.name
         this.objectID = data.id
         this.competition = data.competition
         this.potential = data.potential
         this.subscribers = data.number_subscribers
         this.period = data.period
         this.lastLVL = data.last_lvl
         this.mapAddress.push(data.address)
         this.mapAddress.push(data.coordinates.split(', '))
         this.represent = this.representsSelect.find(item => item.text == data.representative).value
         this.fetchFiles()

         if (data.lvl.find(item => item === 'Финансовый Директор')) this.isFinDir = true
      },
      async fetchComments() {
         const res = await ObjectAPI.requestComments(this.$route.params.id)
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
         const resP = await FilesAPI.getPriorityFilesObject(this.objectID)
         this.fileTable.tableRows = [...resR.data, ...resP.data]
      },
      async changeObject() {
         try {
            await ObjectAPI.nextObject(this.objectID, JSON.stringify({
               action: 'up',
               lvl: 'lvl0',
               choice1: false,
               choice2: false
            }))
            if (this.fileScheme) {
               await FilesAPI.sendRegularFileObject(this.objectID, createFormData(this.fileScheme))
            }
            if (this.fileDraft) {
               await FilesAPI.sendPriorityFileObject(this.objectID, createFormData(this.fileDraft))
            }
         } catch (e) {
            this.$router.push('/fin-dir/')
            alert('Что-то пошло не так! Попробуйте позже')
            return
         }
         alert('Объект успешно изменён')
         this.$router.push('/fin-dir/')
      },
      async cancelObject() {
         await ObjectAPI.nextObject(this.objectID, JSON.stringify({
            action: 'down',
            lvl: 'lvl99',
            choice1: false,
            choice2: false
         }))
         alert('Объект отменён')
         this.$router.push('/fin-dir/')
      },
      async addComment() {
         await ObjectAPI.addComment(
            JSON.stringify({
               object: this.objectID,
               text: this.comments.text,
               who: this.comments.type
            })
         )
         this.disabledNextBtn = false
         this.fetchComments()
      },
      filePath(id) {
         const path = this.fileTable.tableRows.find(item => item.id === id)
         if (path) return path.path
      }
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
</style>
