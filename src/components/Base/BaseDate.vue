<template>
  <div class="date">
    <label for="date__input" class="date__lable"><slot /></label>
    <input
      type="date"
      id="date__input"
      class="date__input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseDate',
  props: {
    modelValue: {
      type: [String, Number],
      default() {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  &__lable {
    margin-right: 5px;
    padding: 7px 0px;
    opacity: 0.8;
  }
  &__input {
    border: 1px solid $Alto;
    outline: none;
    padding: 6px 10px;
  }
}
</style>
