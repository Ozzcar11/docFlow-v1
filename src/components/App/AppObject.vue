<template>
  <div class="object">
    <base-headline>Создать объект</base-headline>
    <base-input v-model="name">Название объекта</base-input>
    <div class="object__input --flex --justify-between">
      <base-input type="file" @change="fileDraft = $event.target.files[0]"
        >Черновая схема</base-input
      >
      <base-input
        style="margin-left: 40px"
        type="file"
        @change="fileScheme = $event.target.files[0]"
        >Схема</base-input
      >
    </div>
    <base-map v-model="mapAddress" />
    <base-input :modelValue="mapAddress[0]" size="14" disabled
      >Адрес</base-input
    >
    <base-input style="margin: 20px 0px">Комментарий</base-input>
    <base-select :options="commentSelect" />
    <div class="object__container">
      <h4 class="object__headline">Гарантия</h4>
      <div class="object__subcontainer">
        <base-input v-model="period">Срок</base-input>
        <base-input v-model="subscribers">Количество абонентов</base-input>
        <base-select v-model="represent" :options="representsSelect"
          >Представитель</base-select
        >
      </div>
    </div>
    <div class="object__container">
      <h4 class="object__headline">Потенциал</h4>
      <div class="object__subcontainer">
        <base-input v-model="potential">Потенциал абон. базы</base-input>
        <base-input v-model="сompetition">Конкуренция</base-input>
      </div>
    </div>
    <base-button @click="createObject" style="margin-top: 20px"
      >Добавить</base-button
    >
  </div>
</template>

<script>
import BaseHeadline from '@/components/Base/BaseHeadline.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseMap from '@/components/Base/BaseMap.vue'

import { OrrAPI } from '@/api/orr'

export default {
  components: {
    BaseHeadline,
    BaseInput,
    BaseSelect,
    BaseButton,
    BaseMap
  },
  data() {
    return {
      commentSelect: [
        {
          value: 'lable',
          text: 'Тип комментария',
          disabled: true,
          baseSelected: true
        },
        {
          value: 'all',
          text: 'Общий'
        },
        {
          value: 'private',
          text: 'Скрытый'
        }
      ],
      representsSelect: [],
      mapAddress: [],
      name: null,
      period: null,
      subscribers: null,
      represent: 1,
      potential: null,
      сompetition: null,
      fileScheme: null,
      fileDraft: null
    }
  },
  mounted() {
    this.fetchRepresents()
  },
  methods: {
    async fetchRepresents() {
      const res = await OrrAPI.requestRepresents()
      for (let item of res.data) {
        this.representsSelect.push({
          value: item.id,
          text: item.full_name
        })
      }
    },
    async createObject() {
      const resObject = await OrrAPI.createObject(
        JSON.stringify({
          name: this.name,
          address: this.mapAddress[0],
          coordinates: this.mapAddress[1].join(', '),
          period: this.period,
          number_subscribers: this.subscribers,
          potential: this.potential,
          сompetition: this.сompetition,
          representative_id: this.represent
        })
      )
      const resScheme = await OrrAPI.sendSchema(
        this.createFormData(this.fileScheme)
      )
      const resDraftScheme = await OrrAPI.sendDraftSchema(
        this.createFormData(this.fileDraft)
      )
      await OrrAPI.sendIDFiles(
        resObject.data.id,
        JSON.stringify({
          schema: resScheme.data.id,
          draft_schema: resDraftScheme.data.id
        })
      )
      alert('Объект успешно создан')
    },

    createFormData(file) {
      const formData = new FormData()
      formData.append('name', file)
      return formData
    }
  }
}
</script>

<style lang="scss" scoped>
.object {
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
