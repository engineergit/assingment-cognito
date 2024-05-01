<template>
  <v-app class="app_container">
    <v-app-bar :elevation="1" class="">
      <v-row class="nav-container">
        <v-col cols="4" class="d-flex align-center">
          <h2>
            <a class="text-primary" href="/"> Logo</a>
          </h2>
        </v-col>
        <v-col cols="6" class="d-flex align-center justify-center">
          <div></div>
        </v-col>
        <v-col cols="2" class="d-flex align-center justify-center">
          <v-btn @click="handleLogin" color="primary" variant="outlined" class="rounded-pill" style="height: 42px">
            signin
          </v-btn>
          <v-btn to="/attributes" color="primary" variant="outlined" class="rounded-pill ml-5" style="height: 42px">
            Add Attributes
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-row no-gutters class="mt-16">
      <div class="flex-grow-1" style="width: 100%; height: 100%">
        <slot />
      </div>
    </v-row>
  </v-app>
</template>

<script setup>
const { signIn, status, data } = useAuth();

function handleLogin() {
  signIn();
}
</script>

<style lang="css" scoped>
.app_container {
  height: 100%;
  width: 100%;
}

.site-app-bar-container {
  height: 70px;
}

.nav-container {
  max-width: 80%;
  min-height: 100%;
  margin: 0 auto;
}

ul {
  list-style: none;
}

/* .main_container {
  max-width: 1200px;
  margin: 0px auto;
  border: 1px solid green;
} */

/* .app-bg {
  background-color: #f2f2f2;
} */
</style>
