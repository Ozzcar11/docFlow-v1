<template>
  <ul class="menu">
    <router-link
      :to="item.routerPath"
      class="menu__item"
      :class="{ pad }"
      v-for="item in menuList"
      :key="item.routerPath"
      @click="$emit('clickAdmin', item.routerPath)"
    >
      <img
        v-if="item.icon"
        :src="require(`../../assets/icons/${item.icon}`)"
        class="menu__icon"
      />
      <span class="menu__item-text">{{ item.name }}</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    pad: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    pointer-events: none;
  }

  &__item {
    color: inherit;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    line-height: 16px;
    display: flex;
    align-items: center;
    padding: 10px 27px;
    transition: background-color 0.2s;
    &.router-link-active {
      background-color: $MercurySolid;
    }
  }
}
.pad {
  padding: 20px 27px;
}
</style>
