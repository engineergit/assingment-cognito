<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center"
    @click.prevent="openDialog()"
    min-height="340px"
    max-width="300px"
  >
    <div class="">
      <v-avatar :color="randomColor" size="120">
        <span class="text-h5">MA</span>
      </v-avatar>
    </div>
    <div class="text-center py-3">
      <p class="font-weight-500">{{ driverName }}</p>
      <p class="text-caption" style="color: #c6c6c6">+256759396703</p>
    </div></v-card
  >
</template>

<script setup lang="ts">
import type { DriverResponsePayload } from '~/types/driver-types';

defineProps<{ driverName: string }>();

const COLOR_PALETTE = [
  '#FF8F00',
  '#757575',
  '#1B5E20',
  '#6D4C41',
  '#78909C',
  '#4CAF50',
  '#BF360C',
  '#3E2723',
  '#7986CB',
  '#FDD835',
  '#03A9F4',
  '#01579B',
  '#311B92',
  '#3F51B5',
  '#673AB7',
  '#9C27B0',
  '#E57373',
  '#F4511E',
  '#26A69A',
  '#FF6D00',
  '#2E7D32',
  '#81C784',
  '#448AFF',
  '#C2185B'
];

function getRandomColor(): string {
  return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
}

const emit = defineEmits<{
  (e: 'open-dialog'): void;
}>();

const randomColor = computed(() => getRandomColor());

function openDialog() {
  emit('open-dialog');
}
</script>

<style scoped></style>
