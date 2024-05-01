<template>
  <div class="d-flex align-center justify-center" style="height: 100%">
    <v-card class="rounded-xl d-flex align-center" style="height: 75%; width: 30%" elevation="3">
      <v-row style="height: 100%">
        <v-col cols="12" class="px-10 d-flex justify-center align-center">
          <div style="width: 100%">
            <h1 class="text-center py-4">Log In</h1>
            <v-form v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginPayload.username"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    rounded
                    :rules="emailRules"
                  >
                    <template v-slot:label>
                      <div>email <span class="text-primary">*</span></div>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="loginPayload.password"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    @click:append-inner="visible = !visible"
                    rounded
                    :rules="requiredRules"
                  >
                    <template v-slot:label>
                      <div>password <span class="text-primary">*</span></div>
                    </template>
                  </v-text-field>
                  <div class="text-center pb-6">
                    <p>Forgot Password?</p>
                  </div>
                </v-col>
              </v-row>
            </v-form>

            <v-btn
              color="primary"
              variant="elevated"
              :loading="loading"
              class="rounded-xl py-7 d-flex"
              style="width: 100%"
              @click="login"
              :disabled="!valid"
            >
              login
            </v-btn>

            <p class="text-center py-6">
              New here?
              <NuxtLink to="/register"> <span class="text-primary"> Create an Account</span></NuxtLink>
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', title: 'login' });

const valid = ref(false);
const visible = ref(false);
const loginPayload = ref({
  username: '',
  password: ''
});
const loading = ref(false);

const requiredRules = [
  (value: any) => {
    if (value) return true;
    return 'value is required';
  }
];

const emailRules = [
  (value: any) => {
    if (value) return true;
    return 'value is required';
  },
  (value: any) => {
    if (/.+@.+\..+/.test(value)) return true;
    return 'E-mail must be valid.';
  }
];

async function login() {
  try {
    loading.value = true;

    loginPayload.value = {
      username: '',
      password: ''
    };
  } catch (ex) {
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
