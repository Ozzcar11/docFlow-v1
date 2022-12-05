<template>
   <div class="input">
      <div v-if="$slots.default" class="input__slot">
         <slot />
      </div>

      <input :multiple="multiple" :type="type" :value="modelValue" :placeholder="placeholder"
         :style="'font-size:' + size + 'px;'" :disabled="disabled" class="input__self" @input="onInput($event)"
         @keypress.enter="$emit('enter')" />
   </div>
</template>

<script>
export default {
   name: 'BaseInput',
   props: {
      modelValue: {
         type: [Number, String],
         default: ''
      },
      type: {
         type: String,
         default: 'text'
      },
      disabled: {
         type: Boolean,
         default: false
      },
      placeholder: {
         type: String,
         default: ''
      },
      size: {
         type: [Number, String],
         default: 11
      },
      multiple: {
         type: Boolean,
         default: false
      }
   },
   emits: {
      'update:modelValue': null
   },
   methods: {
      onInput(event) {
         this.$emit('update:modelValue', event.target.value)
      }
   }
}
</script>

<style lang="scss" scoped>
.input {
   color: $Gray;
   font-family: Roboto, sans-serif;
   font-size: 13px;
   font-weight: 300;
   flex: 1 1 100px;

   &__self {
      width: 100%;
      padding: 5px 6px;
      border: 1px solid $Alto;
      line-height: 15px;
      outline: none;

      &:disabled {
         opacity: 0.8;
      }

      &[type='file'] {
         color: #000;
         background-color: #fff;
         cursor: pointer;

         &::file-selector-button {
            display: none;
         }
      }
   }

   &__slot {
      margin-bottom: 5px;
   }
}
</style>
