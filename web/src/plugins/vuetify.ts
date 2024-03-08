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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1b3c5f',
          'primary-light': '#1867C0',
          'primary-light-1': '#28578a',
          'primary-light-2': '#86afdb',
          'primary-light-3': '#f0f8ff',
          secondary: '#a0a0a0',
          'menu-background': 'd3d3d3',
          success: '#a6c70d',
          warning: '#f3b109',
          danger: '#e83942',
          'danger-light': '#eb6c72',
          partial: '#00FFFF',
          text: '#000',
        },
      },
    },
  },
})
