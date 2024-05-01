<template>
  <div>
    <v-row>
      <v-col cols="8">
        <v-expansion-panels :flat="true" variant="accordion" :multiple="true">
          <v-expansion-panel class="" v-for="i in 5" :key="i" title="Example question">
            <template v-slot:text>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat
              </p>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="4">
        <ContactForm />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ContactForm from './ContactForm.vue';
</script>

<style scoped></style>
