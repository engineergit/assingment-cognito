<template>
  <div class="main-container d-flex align-center flex-column justify-center" style="height: 100%">
    <h1 class="text-center">WELCOME TO ALEXANDERS AWS COGNITO APP</h1>
    <div v-if="attributesStore.length">
      <!-- {{ attributesStore }} -->
      <div v-for="(item, index) in attributesStore">
        <div>{{ `ToDos - ${item.todos}` }}</div>
        <div>{{ `Favorite songs - ${item.songs}` }}</div>
        <div>{{ `Recipes ${item.recipes}` }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'site', auth: false });
//const { token } = useAuthState();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const { status } = useAuth();

import {
  CognitoIdentityProviderClient,
  UpdateUserAttributesCommand,
  type UpdateUserAttributesCommandInput
} from '@aws-sdk/client-cognito-identity-provider';
import * as AWS from 'aws-sdk';

// const token = computed(() => useCookie('next-auth.session-token').value);

// const credentials = new AWS.Credentials({
//   accessKeyId: process.env.accessKeyId,
//   secretAccessKey: process.env.secretAccessKey
// });

// const client = new CognitoIdentityProviderClient({
//   region: process.env.location,
//   credentials
// });

// //p@ssw0rD
// const input: UpdateUserAttributesCommandInput = {
//   // UpdateUserAttributesRequest
//   UserAttributes: [
//     // AttributeListType // required
//     {
//       // AttributeType
//       Name: 'country', // required
//       Value: 'countryx'
//     }
//   ],
//   AccessToken: token.value as string,
//   ClientMetadata: {}
// };
// const command = new UpdateUserAttributesCommand(input);

// async function addCustomAttribute() {
//   try {
//     console.log('clicked');
//     console.log(token);
//     const response = await client.send(command);
//     console.log(response);
//   } catch (ex) {
//     console.log(ex);
//   }
// }

const attributesStore: any = ref({});

onMounted(async () => {
  try {
    if (status.value === 'authenticated') {
      const response = await $fetch(`/api/attributes`, {
        baseURL: '/',
        method: 'get'
      });
      attributesStore.value = response;
    } else {
      return;
    }
  } catch (ex) {}
});
</script>

<style lang="css" scoped>
.main-container {
  height: 100%;
  width: 80%;
  margin: 0 auto;
}
</style>
