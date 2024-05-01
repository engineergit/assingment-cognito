<template>
  <v-app class="app_container">
    <v-app-bar :elevation="1" class="flex-grow-0" data-cy="appbar">
      <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="6"> <nav-search-bar style="width: 70%" /></v-col>
      </v-row>
      <v-btn data-qa="notification-btn" icon elevation="0" class="mr-1">
        <v-badge content="2" color="error">
          <v-icon icon="mdi-bell" size="22" />
        </v-badge>
      </v-btn>
      <template v-slot:append>
        <v-menu data-cy="appbar-menu">
          <template v-slot:activator="{ props }">
            <v-avatar size="32" color="primary" style="font-size: 16px" v-bind="props">
              <span>M</span>
            </v-avatar>
          </template>
        </v-menu>
      </template>
    </v-app-bar>

    <v-row no-gutters class="d-flex flex-row flex-nowrap mt-16">
      <div class="d-block flex-grow-0 align-stretch side-nav-container">
        <nav-left-nav class="side-nav" />
      </div>
      <div class="flex-grow-1 app-bg">
        <slot />
      </div>
    </v-row>
  </v-app>
</template>

<script setup></script>

<style lang="css" scoped>
.app_container {
  height: 100%;
}

.app-bg {
  background-color: #f2f2f2;
}

.side-nav-container {
  border-right: 1px solid #eeeeee;
  background: #ffffff;
}

.side-nav {
  width: 60px;
}
</style>
