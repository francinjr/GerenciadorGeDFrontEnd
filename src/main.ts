import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    // Se eu quiser usar o primary color do vuetify:
    /*theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#ff5733',
            },
          },
        },
      },*/ 
})

app.use(vuetify)
app.use(router)

app.mount('#app')

//createApp(App).use(vuetify).mount('#app')
