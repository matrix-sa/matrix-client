<script setup>
  import { computed, ref } from 'vue'
  import { useAuthStore } from '@/stores/useAuthStore'

  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const registerEmail = ref('')
  const registerPassword = ref('')
  const phoneNumber = ref('')
  const acceptTerms = ref(false)
  const authStore = useAuthStore()

  const loading = computed(() => authStore.loading)

  const onLoginSubmit = async () => {
    try {
      await authStore.login({
        // email: email.value,
        // password: password.value,
        // remember_me: rememberMe.value,
        mobile_number: '+966556782748',
      })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const onRegisterSubmit = async () => {
    try {
      await authStore.register({
        email: registerEmail.value,
        password: registerPassword.value,
        accept_terms: acceptTerms.value,
        // static data for mobile number,name and currency for now
        mobile_number: '+966556782747',
        currency: 'USD',
        name: 'hello',
      })
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const appendScript = scriptSrc => {
    const script = document.createElement('script')
    script.src = scriptSrc
    document.body.appendChild(script)
  }

  appendScript('https://code.jquery.com/jquery-3.6.0.min.js')
  appendScript('https://code.jquery.com/jquery-3.2.1.slim.min.js')
  appendScript('https://cdn.jsdelivr.net/npm/tsparticles@2.2.3/tsparticles.bundle.min.js')
  appendScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js')
  appendScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js')
  appendScript('https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js')
  appendScript('https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js')
  appendScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js')
  appendScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js')
  appendScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js')
  appendScript('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js')
  appendScript('https://unpkg.com/aos@2.3.1/dist/aos.js')
  appendScript('https://matrix.sa/website/en/js/custom.js')

</script>

<template>
  <section class="login-sec">
    <div class="login-container">
      <div class="login-logo">
        <!-- Logo or image can go here -->
      </div>
      <div class="tabs">
        <ul class="tabs-login">
          <li><a href="#tab-111">Login</a></li>
          <li><a href="#tab-112">Create your account for free</a></li>
        </ul>
        <div class="tabs-stage">
          <!-- Login Tab -->
          <div id="tab-111">
            <div class="login_content">
              <h4>Welcome Back to Matrix!</h4>
              <p>Log in to your Matrix account and take control of your product <br> sales and marketing campaigns.</p>
              <div class="signup-form-text">
                <form @submit.prevent="onLoginSubmit">
                  <div class="form-group">
                    <label>Email *</label>
                    <input v-model="email" placeholder="Enter here" required type="email">
                  </div>

                  <div class="form-group password">
                    <label>Password *</label>
                    <input v-model="password" placeholder="Enter here" required type="password">
                  </div>

                  <div class="form-group checkbox_login">
                    <p>
                      <input id="login-checkbox" v-model="rememberMe" type="checkbox">
                      <label for="login-checkbox">Log out after session ends</label>
                    </p>
                    <a href="">Forgot password?</a>
                  </div>

                  <div class="form-group">
                    <button class="signup-btn" :disabled="loading" type="submit">
                      Login
                      <span v-if="loading" class="loader-spinner" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Registration Tab -->
          <div id="tab-112">
            <div class="login_content">
              <h4>Create Your Account!</h4>
              <p>Sign up for a Matrix account and start managing your product sales and marketing campaigns.</p>
              <div class="signup-form-text">
                <form @submit.prevent="onRegisterSubmit">
                  <div class="form-group">
                    <label>Email *</label>
                    <input v-model="registerEmail" placeholder="Enter here" required type="email">
                  </div>

                  <div class="form-group password">
                    <label>Password *</label>
                    <input v-model="registerPassword" placeholder="Enter here" required type="password">
                  </div>

                  <div class="form-group">
                    <label>Phone *</label>
                    <input v-model="phoneNumber" placeholder="Enter here" required type="number">
                  </div>

                  <div class="form-group checkbox_login">
                    <p>
                      <input id="register-checkbox" v-model="acceptTerms" required type="checkbox">
                      <label for="register-checkbox">I agree to the terms and conditions</label>
                    </p>
                  </div>

                  <div class="form-group">
                    <button class="signup-btn" :disabled="loading" type="submit">
                      Create your account for free
                      <span v-if="loading" class="loader-spinner" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <component :is="'script'">
    $(function () {
    AOS.init();
    });
  </component>

</template>

  <style scoped>
  .loader-spinner {
    margin-left: 8px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spinner 0.6s linear infinite;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
  </style>

<style>
    @import url('https://matrix.sa/website/en/css/style.css');
    @import url('https://matrix.sa/website/en/css/custom.css');
    @import url('https://matrix.sa/website/en/css/animations.css');
    @import url('https://matrix.sa/website/en/css/responsive.css');
</style>
