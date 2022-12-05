<template>
  <div class="radio">
    <div v-if="$slots.default" class="slot">
      <slot />
    </div>
    <template v-for="(item, index) in radioButtons" :key="index">
      <input
        type="radio"
        name="priority"
        :id="item.id"
        :value="item.value"
        class="radio__item"
        v-model="checked"
      />
      <label :for="item.id" class="radio__lable" :ref="item.value">
        <span>{{ item.text }}</span>
      </label>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: null,
      radioButtons: [
        {
          id: 1,
          value: 'low',
          text: 'Низкий'
        },
        {
          id: 2,
          value: 'middle',
          text: 'Средний'
        },
        {
          id: 3,
          value: 'high',
          text: 'Высокий'
        }
      ]
    }
  },
  watch: {
    checked(value, oldValue) {
      if (oldValue) this.$refs[oldValue][0].className = 'radio__lable'
      this.$refs[value][0].classList.add(this.bgColorClass)
      this.$emit('selected', value)
    }
  },
  computed: {
    bgColorClass() {
      return 'radio__lable-' + this.checked
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  color: $Gray;
  font-size: 13px;
  &__lable {
    font-size: 16px;
    padding: 5px 20px;
    cursor: pointer;
    & ~ & {
      margin-left: 10px;
    }
    &-low {
      color: #fff;
      background-color: rgb(101, 197, 101);
    }
    &-middle {
      color: #fff;
      background-color: rgb(255, 174, 0);
    }
    &-high {
      color: #fff;
      background-color: rgb(251, 79, 22);
    }
  }
  &__item {
    position: absolute;
    top: -100%;
    visibility: hidden;
    &:checked + lable {
      border: 3px solid $FunBlue;
    }
  }
}
.slot {
  margin-bottom: 10px;
}
</style>
