<template>
  <v-card class="rounded-xl" @click.prevent="openDialog()" height="340px" max-width="300px">
    <div class="d-flex justify-end pr-3 pt-2">
      <v-btn icon elevation="0">
        <v-icon color="primary" icon="mdi-dots-vertical"></v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center mt-n12" style="height: 70%">
      <v-img width="100%" height="100%" contain :src="`${imageUrl}`" alt="Image description" />
    </div>
    <div class="text-center py-3">
      <p class="font-weight-500">{{ licensePlate }}</p>
      <p class="text-caption" style="color: #c6c6c6">{{ model }}</p>
    </div></v-card
  >
</template>

<script setup lang="ts">
defineProps<{
  licensePlate: string;
  model: string;
  imageUrl: string;
}>();

const emit = defineEmits<{
  (e: 'open-dialog'): void;
}>();

function openDialog() {
  emit('open-dialog');
}
</script>

<style scoped></style>
