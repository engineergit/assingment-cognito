<template>
  <div :style="`width: ${searchBoxWidth}px`">
    <v-text-field
      id="menu-activator"
      v-model="searchPayload"
      variant="outlined"
      density="compact"
      flat
      hide-details
      label="search"
      rounded="false"
      single-line
      append-inner-icon="mdi-magnify"
      @keyup="search($event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
const searchPayload = ref('');

const { name, width } = useDisplay();
const searchBoxWidth = computed(() => {
  switch (name.value) {
    case 'xs':
      return width.value;
    case 'sm':
      return 300;
    case 'md':
    case 'lg':
    case 'xl':
    case 'xxl':
      return 642;
  }
});

function search(payload: string) {}
</script>

<style scoped>
.search-card-border-bottom {
  border-bottom: 1px solid #7a7a7a;
}
</style>
