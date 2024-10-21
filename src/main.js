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

// TODO: Remove. Inject access token temporarily
localStorage.setItem('accessToken', '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiKzk2NjU1Njc4Mjc0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImNsaWVudF9yb2xlIiwiVXNlcklkIjoiNjY0NWM2YmVhZDFiZDQ5MDU3ZmVkYjBiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIrOTY2NTU2NzgyNzQ4Iiwic3ViIjoiNjY0NWM2YmVhZDFiZDQ5MDU3ZmVkYjBiIiwianRpIjoiODFkMTAyMzAtZGJhNS00Zjg3LWFjMmYtODMyMTYwODIzOGVjIiwiaWF0IjoxNzI4NjE4NzU5LCJuYmYiOjE3Mjg2MTg3NTksImV4cCI6MTczMTIxMDc1OSwiaXNzIjoibWF0cml4LWJhY2tlbmQtY2xpZW50cy0zMjM0NzFfOTgyNHYiLCJhdWQiOiJodHRwOi8vMTkyLjE2OC4xNDkuMjI3OjkyNTcvIn0.AoKGcVRlIIBmrXLnhwugeuJKG0gR8Wx5a3rlsmOu6K0"')

const app = createApp(App)

registerPlugins(app)
app.mount('#app')
