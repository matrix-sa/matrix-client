/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

//TODO: Remove. Inject access token temporarily
localStorage.setItem('accessToken', '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiKzk2NjU1Njc4Mjc0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImNsaWVudF9yb2xlIiwiVXNlcklkIjoiNjY0NWM2YmVhZDFiZDQ5MDU3ZmVkYjBiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIrOTY2NTU2NzgyNzQ4Iiwic3ViIjoiNjY0NWM2YmVhZDFiZDQ5MDU3ZmVkYjBiIiwianRpIjoiNzBmOTMyNTQtOTY4NC00MGJjLThhNzEtMzAxY2M4ZDcwYzZmIiwiaWF0IjoxNzI1OTgxNzE3LCJuYmYiOjE3MjU5ODE3MTcsImV4cCI6MTcyODU3MzcxNywiaXNzIjoibWF0cml4LWJhY2tlbmQtY2xpZW50cy0zMjM0NzFfOTgyNHYiLCJhdWQiOiJodHRwOi8vMTkyLjE2OC4xNDkuMjI3OjkyNTcvIn0.1yKV4b4j0HNyCkyn76jfM-l1sBjz5sNYGAXxHpWCIc0"')

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
