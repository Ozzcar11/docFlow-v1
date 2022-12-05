<template>
   <div v-if="$slots.default" class="slot">
      <slot />
   </div>

   <select class="select" @change="onChange($event.target.value)">
      <option v-for="{ value, text, disabled } of options" :key="value" :value="value" :selected="isSelected(value)"
         :disabled="disabled">
         {{ text }}
      </option>
   </select>
</template>

<script>
export default {
   name: 'BaseSelect',
   props: {
      options: {
         type: Array, // [{ value: '', text: '', disabled: true/false }]
         default: () => []
      },
      modelValue: {
         type: [Number, String],
         default: ''
      }
   },
   methods: {
      onChange(value) {
         this.$emit('update:modelValue', value)
         this.$emit('change', value)
      },
      isSelected(value) {
         return String(this.modelValue) === String(value)
      }
   },
   emits: ['change']
}
</script>

<style lang="scss" scoped>
.select {
   width: 100%;
   padding: 5px;
   border: 1px solid #d1d1d1;
   outline: none;
   font-size: 11px;
}

.slot {
   color: $Gray;
   font-family: Roboto, sans-serif;
   font-size: 13px;
   font-weight: 300;
   margin-bottom: 5px;
}
</style>
