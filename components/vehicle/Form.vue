<template>
  <v-card class="rounded-xl">
    <v-card-title class="py-5 px-9">
      <div class="text-h6">Add Vehicle{{ vehicleRequestPayload }}</div>
    </v-card-title>
    <v-card-text class="px-9 py-3" style="overflow-x: hidden">
      <v-form v-model="valid">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="vehicleRequestPayload.make"
              variant="outlined"
              rounded
              required
              :rules="requiredRules"
            >
              <template v-slot:label>
                <div>Make <span class="text-primary">*</span></div>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="vehicleRequestPayload.model"
              variant="outlined"
              rounded
              required
              :rules="requiredRules"
            >
              <template v-slot:label>
                <div>Model <span class="text-primary">*</span></div>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="vehicleRequestPayload.year"
              variant="outlined"
              rounded
              required
              type="number"
              :rules="requiredRules"
            >
              <template v-slot:label>
                <div>Year <span class="text-primary">*</span></div>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="vehicleRequestPayload.licensePlate"
              variant="outlined"
              rounded
              required
              :rules="requiredRules"
            >
              <template v-slot:label>
                <div>License Plate <span class="text-primary">*</span></div>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="px-9 pb-8 d-flex flex-row">
      <v-spacer />
      <v-btn
        color="primary"
        :loading="loading"
        :disabled="!valid"
        variant="elevated"
        class="text-caption rounded-xl"
        @click="onSave"
      >
        save
      </v-btn>
      <v-btn variant="elevated" class="text-caption rounded-xl" @click="onCancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { useVehicleStore } from '~/store/vehicleStore';

const vehicleStore = useVehicleStore();

const valid = ref(false);
const loading = ref(false);
const vehicleRequestPayload = ref({
  make: '',
  model: '',
  year: null,
  licensePlate: ''
});

const requiredRules = [
  (value: any) => {
    if (value) return true;
    return 'value is required';
  }
];

const emit = defineEmits<{ (e: 'cancel'): void }>();

const onCancel = () => emit('cancel');

function restVehiclePayload() {
  vehicleRequestPayload.value.make = '';
  vehicleRequestPayload.value.model = '';
  vehicleRequestPayload.value.year = null;
  vehicleRequestPayload.value.licensePlate = '';
}

async function onSave() {
  try {
    loading.value = true;
    await vehicleStore.addVehicle(vehicleRequestPayload.value);
    restVehiclePayload();
  } catch (e) {
  } finally {
    loading.value = false;
  }
}
</script>
