import { NuxtAuthHandler } from '#auth';
import CognitoProvider from 'next-auth/providers/cognito';

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CognitoProvider.default({
      clientId: '1ft79dsnft1keomhmpome6vk5l',
      clientSecret: '903btq6r6gf3k5kbi1ula76u0h3gqsefn8aqkgp1gpoj8u3djk0',
      issuer: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_wlpZ3dcAp'
    })
  ]
});
