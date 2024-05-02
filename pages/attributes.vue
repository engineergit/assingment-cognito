<template>
  <div class="d-flex align-center justify-center" style="height: 100%">
    <v-card class="rounded-xl d-flex align-center" style="height: 75%; width: 30%" elevation="3">
      <v-row style="height: 100%">
        <v-col cols="12" class="px-10 d-flex justify-center align-center">
          <div style="width: 100%">
            <h1 class="text-center py-4">Add custom Attributes</h1>

            <v-form v-model="valid" class="mt-10">
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="customAttributesPayload.songs"
                    required
                    rounded
                    variant="outlined"
                    :items="songs"
                    label="Favorite Songs"
                    chips
                    multiple
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="customAttributesPayload.recipes"
                    required
                    rounded
                    variant="outlined"
                    :items="recipes"
                    label="Recipes"
                    chips
                    multiple
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="customAttributesPayload.todos"
                    required
                    rounded
                    variant="outlined"
                    :items="todos"
                    label="Todos"
                    chips
                    multiple
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>

            <v-btn
              color="primary"
              variant="elevated"
              class="rounded-xl py-7 d-flex"
              style="width: 100%"
              @click="register"
              :disabled="!valid"
              :loading="loading"
            >
              Add
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'site', title: 'register', auth: false });
const { status } = useAuth();
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

const attributeList: Array<CognitoUserAttribute> = [];

const todos = ['HOuse Work', 'Test', 'Swimming', 'Walking'];
const songs = ['Hallelujah', 'Come Down', 'Imagine', 'Billie Jean', 'Dancing Queen '];
const recipes = [
  'One-Pan Lemon Garlic Chicken with Roasted Vegetables',
  'Thai Peanut Curry with Vegetables ',
  'Chicken Fajitas',
  'Black Bean Burgers'
];

const valid = ref(false);
const loading = ref(false);

const customAttributesPayload = ref({
  todos: [],
  songs: [],
  recipes: []
});

async function register() {
  try {
    if (status.value === 'authenticated') {
      loading.value = true;
      const response = await $fetch(`/api/attributes`, {
        baseURL: '/',
        method: 'post',
        body: { ...customAttributesPayload.value }
      });
      customAttributesPayload.value.songs = [];
      customAttributesPayload.value.todos = [];
      customAttributesPayload.value.recipes = [];
      useRouter().push('/');
    } else {
      return;
    }
  } catch (ex) {
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
