<template>
  <v-list density="compact" class="pa-0">
    <v-list-item
      v-for="(item, index) in menuItems"
      :key="index"
      :to="`${item.path}`"
      class="text-center px-0 text-body-2 py-3"
    >
      <v-icon :icon="`${item.icon}`" size="20"></v-icon>
      <v-list-item-title class="pa-0">{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
const menuItems = [
  {
    title: 'Home',
    path: '/',
    icon: 'mdi-view-dashboard'
  },
  {
    title: 'Vehicles',
    path: '/vehicles',
    icon: 'mdi-car'
  },
  {
    title: 'Drivers',
    path: '/drivers',
    icon: 'mdi-account-group'
  },
  {
    title: 'Admins',
    path: '/users',
    icon: 'mdi-account-group'
  }
];
</script>

<style scoped lang="scss">
.v-list-item {
  padding-top: 13px;
  padding-bottom: 13px;
  border-left: 5px solid #ffffff;
  font-size: 12px;

  &:hover {
    border-left: 5px solid #009345;
    background-color: #009345;
    color: white;
  }

  &.v-list-item--active {
    border-left: 5px solid #009345;
    background-color: #009345;
    color: white;

    &:before {
      background-color: #009345;
    }
  }

  .v-list-item-title {
    font-size: 11px;
    line-height: 1.5;
  }
}
</style>
