/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue"

// Composables
import { createApp } from "vue"

// Plugins

import { mockServer } from "@/apimock"

import { registerPlugins } from "@/plugins"


// Settings
import { environment } from "@/settings"


const app = createApp(App)


if (environment.isDev && environment.isMock) {
  mockServer()
}


registerPlugins(app)

app.mount("#app")
