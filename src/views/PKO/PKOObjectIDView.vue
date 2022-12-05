<template>
   <div class="create">
      <base-headline>Редактировать объект</base-headline>
      <base-input v-model="name" disabled>Название объекта</base-input>
      <div class="create__input --flex --justify-between">
         <base-input v-if="cancelObj" type="file" @change="fileDraft = $event.target.files">Обязательный файл *
         </base-input>
         <base-input :class="{ margin40px: cancelObj }" type="file" multiple @change="fileScheme = $event.target.files">
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
         <base-select v-if="!cancelObj" v-model="engineer.value" @change="disableSelectHandler()"
            :options="engineer.data">
            Инженеры</base-select>
         <p class="button__container-desc" v-if="disabledNextBtn.comment">Оставьте комментрий для продолжения</p>
         <br>
         <p class="button__container-desc" v-if="!cancelObj">Выберите инженера</p>
         <base-button @click="changeObject" style="margin-top: 20px"
            :disabled="(disabledNextBtn.comment || disabledNextBtn.engineer || fileDraft == null)">Готово</base-button>
         <base-button v-if="cancelObj" @click="cancelObject" style="margin-top: 20px" theme="danger">Отказ</base-button>
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

import { ObjectAPI } from '@/api/object'
import { FilesAPI } from "@/api/files"
import { UsersAPI } from '@/api/users'
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
         disabledNextBtn: {
            comment: true,
            engineer: true
         },
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
         engineer: {
            value: 'disabled',
            data: [{
               value: 'disabled',
               text: 'Выберите инженера',
               disabled: true,
            }],
         },
         representsSelect: [],
         mapAddress: [],
         name: null,
         period: null,
         subscribers: null,
         represent: null,
         potential: null,
         competition: null,
         fileDraft: null,
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
         cancelObj: false,
         cancelList: ['Юрист', 'Геодезист', 'Гл.Инженер-энергетик', "Тех.Служба", "Агент/Подрядчик"]
      }
   },
   mounted() {
      this.fetchObject()
      this.fetchComments()
      this.fetchFiles()
      this.fetchEnginer()
      this.fetchLogs()
   },
   methods: {
      disableSelectHandler() {
         this.disabledNextBtn.engineer = false
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
         if (this.cancelList.find(item => item == data.last_lvl)) {
            this.cancelObj = true
            this.disabledNextBtn.engineer = false
         }
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
         const resP = await FilesAPI.getPriorityFilesObject(this.objectID)
         const resR = await FilesAPI.getRegularFilesObject(this.objectID)
         this.fileTable.tableRows = [...resP.data, ...resR.data]
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
      async fetchEnginer() {
         const res = await UsersAPI.profileUser('ИнженерПКО')
         const data = res.data
         for (let item of data)
            this.engineer.data.push({
               value: item.id,
               text: item.FIO
            })
      },
      async changeObject() {
         try {
            if (this.fileScheme) {
               await FilesAPI.sendRegularFileObject(this.objectID, createFormData(this.fileScheme))
            }
            if (this.fileDraft) {
               await FilesAPI.sendPriorityFileObject(this.objectID, createFormData(this.fileDraft))
            }
         } catch (e) {
            alert('Что-то пошло не так! Попробуйте позже')
            this.$router.push('/PKO/')
            return
         }

         if (this.cancelObj) {
            await ObjectAPI.nextObject(this.objectID, JSON.stringify({
               action: 'up',
               lvl: 'lvl6',
               choice1: false,
               choice2: false
            }))
            alert('Объект отклонён')
            this.$router.push('/PKO/')
            return
         } else {
            await ObjectAPI.nextObject(this.objectID, JSON.stringify({
               action: 'up',
               lvl: 'lvl3',
               choice1: [+this.engineer.value],
               choice2: false
            }))
         }
         alert('Объект успешно завершён')
         this.$router.push('/PKO/')
      },
      async addComment() {
         this.disabledNextBtn.comment = false
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
      async cancelObject() {
         await ObjectAPI.nextObject(this.objectID, JSON.stringify({
            action: 'down',
            lvl: 'lvl98',
            choice1: false,
            choice2: false
         }))
         alert('Объект отказан')
         this.$router.push('/PKO/')
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

.margin40px {
   margin-left: 40px;
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
</style>
