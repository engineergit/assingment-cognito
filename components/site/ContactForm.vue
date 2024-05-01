<template>
  <div>
    <v-card class="rounded-xl">
      <v-card-title class="py-5 px-9">
        <div class="text-h6 text-center font-weight-black">Still got questions?</div>
      </v-card-title>
      <v-card-text class="px-9 py-3" style="overflow-x: hidden">
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field variant="outlined" rounded :rules="requiredRules">
                <template v-slot:label>
                  <div>Name <span class="text-primary">*</span></div>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field variant="outlined" rounded :rules="requiredRules">
                <template v-slot:label>
                  <div>Email <span class="text-primary">*</span></div>
                </template>
              </v-text-field>
            </v-col>

            <v-col>
              <v-textarea variant="outlined" rounded :rules="requiredRules">
                <template v-slot:label>
                  <div>Question <span class="text-primary">*</span></div>
                </template>
              </v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="px-9 pb-8 d-flex flex-row">
        <v-spacer />
        <v-btn color="primary" variant="elevated" class="text-caption rounded-xl" @click="onSave"> save </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script setup lang="ts">
const valid = ref(false);

const requiredRules = [
  (value: any) => {
    if (value) return true;
    return 'value is required';
  }
];

const emit = defineEmits<{ (e: 'cancel'): void }>();

const onCancel = () => emit('cancel');

const onSave = () => {};
</script>
