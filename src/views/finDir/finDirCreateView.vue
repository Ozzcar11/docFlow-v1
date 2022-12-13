<template>
   <div class="create">
      <base-headline>Создать объект</base-headline>
      <base-input v-model="objCard.name">Название объекта</base-input>
      <div class="create__input --flex --justify-between">
         <base-input type="file" @change="objCard.fileDraft = $event.target.files">Обязательный файл *</base-input>
         <base-input style="margin-left: 40px" type="file" multiple @change="objCard.fileScheme = $event.target.files">
            Необязательные файлы</base-input>
      </div>
      <base-map v-model="objCard.mapAddress" />
      <base-input :modelValue="objCard.mapAddress[0]" size="14" disabled>Адрес</base-input>
      <div class="create__container">
         <h4 class="create__headline">Гарантия</h4>
         <div class="create__subcontainer">
            <base-input v-model="objCard.period">Срок</base-input>
            <base-input v-model="objCard.subscribers">Количество абонентов</base-input>
            <base-select v-model="objCard.represent" :options="objCard.representsSelect">Представитель</base-select>
         </div>
      </div>
      <div class="create__container">
         <h4 class="create__headline">Потенциал</h4>
         <div class="create__subcontainer">
            <base-input v-model="objCard.potential">Потенциал абон. базы</base-input>
            <base-input v-model="objCard.competition">Конкуренция</base-input>
         </div>
      </div>
      <base-button @click="createObject" :disabled="(objCard.fileDraft === null || validation)"
         style="margin-top: 20px">Добавить</base-button>
   </div>
</template>

<script>
import BaseHeadline from '@/components/Base/BaseHeadline.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseMap from '@/components/Base/BaseMap.vue'
import AppTable from '@/components/App/AppTable.vue'

import { RepresentAPI } from '@/api/represent'
import { ObjectAPI } from '@/api/object'
import { FilesAPI } from '@/api/files'

import createFormData from '@/utils/createFormData'

export default {
   components: {
      BaseHeadline,
      BaseInput,
      BaseSelect,
      BaseButton,
      BaseMap,
      AppTable
   },
   data() {
      return {
         objCard: {
            representsSelect: [],
            mapAddress: [],
            name: null,
            period: null,
            subscribers: null,
            represent: 1,
            potential: null,
            competition: null,
            fileScheme: null,
            fileDraft: null,
         }
      }
   },
   mounted() {
      this.fetchRepresents()
   },
   methods: {
      async fetchRepresents() {
         const res = await RepresentAPI.requestRepresents()
         for (let item of res.data) {
            this.objCard.representsSelect.push({
               value: item.id,
               text: item.full_name
            })
         }
      },
      async createObject() {
         try {
            if (!this.objCard.mapAddress[0]) {
               alert('Поставьте точку на карту!')
               return
            }
            const resObject = await ObjectAPI.createObject(
               JSON.stringify({
                  name: this.objCard.name,
                  address: this.objCard.mapAddress[0],
                  coordinates: this.objCard.mapAddress[1].join(', '),
                  period: this.objCard.period,
                  number_subscribers: this.objCard.subscribers,
                  potential: this.objCard.potential,
                  competition: this.objCard.competition,
                  representative_id: this.objCard.represent
               })
            )
            await FilesAPI.sendPriorityFileObject(resObject.data.id, createFormData(this.objCard.fileDraft))
            FilesAPI.sendRegularFileObject(resObject.data.id, createFormData(this.objCard.fileScheme))
            alert('Объект успешно создан')
            this.$router.push('/fin-dir/')
         } catch (e) {
            alert(e.response?.data?.message)
         }
      }
   },
   computed: {
      validation() {
         const arr = []
         for (let item in this.objCard) {
            if (this.objCard[item] === null) {
               arr.push(item)
            }
         }
         console.log(!!arr.length);
         return !!arr.length
      }
   }
}
</script>

<style lang="scss" scoped>
.create {
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
