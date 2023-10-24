/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'


const myCustomTheme = {
  dark: true,
  colors: {
    background: '#27272A',
    primary: '#FF0066',
    error: '#FFFFFF',
  },
}



// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: 'mdi', 
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
      
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
