import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'dark',
            themes: {
                dark: {
                    colors: {
                        primary: '#1A3E5F',      // Основной темно-синий для акцентов
                        secondary: '#8DA1B4',    // Второстепенный серый для менее акцентных элементов
                        accent: '#F57C00',       // Оранжевый для активных элементов
                        background: '#121212',   // Темный фон

                        success: '#4CAF50',      // Зеленый для успешных операций
                        warning: '#FFC107',      // Желтый для предупреждений
                        error: '#FF5252',        // Красный для ошибок
                        info: '#2196F3',         // Синий для информации

                        menuIcon: '#B0BEC5',     // Светло-серый для иконок меню
                        menuIconHover: '#F57C00' // Оранжевый при наведении на иконки меню
                    },
                },
            },
        },
        components,
        directives,
        ssr: true,
    })

    app.vueApp.use(vuetify)
})
