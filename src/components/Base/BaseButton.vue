<template>
  <component
    :is="computedTag"
    :to="to"
    :type="type"
    :class="classes"
    :disabled="disabled"
    class="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    to: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
      validator: (val) => ['full', 'default', 'search'].includes(val)
    },
    theme: {
      type: String,
      default: 'default',
      validator: (val) => ['default', 'danger', 'accept'].includes(val)
    }
  },
  emits: ['click'],
  computed: {
    computedTag() {
      if (this.to) {
        return 'router-link'
      }
      return 'button'
    },
    classes() {
      return [this.size, 'button__' + this.theme]
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  color: #fff;
  font-size: 13px;
  font-weight: 300;
  border: none;
  border-radius: 0;
  line-height: 15px;
  text-decoration: none;
  cursor: pointer;

  &:disabled {
    background-color: $Nobel;
  }

  &__default {
    background-color: $FunBlue;
  }

  &__danger {
    background-color: $OldBrick;
  }

  &__accept {
    background-color: $ForestGreen;
  }

  &.full {
    padding: 5px;
    width: 100%;
  }

  &.default {
    padding: 5px 58px;
  }

  &.search {
    padding: 0px 20px;
  }
}
</style>
