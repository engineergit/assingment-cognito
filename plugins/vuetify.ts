import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

declare global {
  interface Window {
    global: any;
  }
}

if (typeof window !== 'undefined') {
  window.global = window;
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#009345',
            secondaryBgColor: '#bfe685'
          },
          variables: {}
        }
      }
    }
  });
  app.vueApp.use(vuetify);
});
