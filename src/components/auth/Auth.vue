<script setup>
  import { computed, ref } from 'vue'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { useRequest } from 'vue-request'
  import CurrenciesService from '@/services/currencies-service'
  import { useI18n } from 'vue-i18n'
  import moment from 'moment'

  const { locale, t } = useI18n()

  const authStore = useAuthStore()

  // common
  const language = computed(() =>
    locale.value === 'ar' ? 'English' : 'العربية'
  )
  const switchLanguage = () => {
    const value = locale.value === 'ar' ? 'en' : 'ar'
    localStorage.setItem('lang', value)
    locale.value = value
    window.location.reload()
  }

  // login
  const phoneNumber = ref(null)
  const otp = ref(null)
  const otpDisabled = ref(true)
  const loadingScripts = ref(true)
  const loginDisplay = computed(() => (loadingScripts.value ? 'none' : 'block'))

  const isSendCodeDisabled = computed(() => authStore.otp?.countDown > 0)
  const formattedCounter = computed(() => {
    const duration = moment.duration(authStore.otp?.countDown ?? 0, 'seconds')
    const minutes = duration.minutes()
    const seconds = duration.seconds()
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  })

  const handleSendCode = async () => {
    try {
      await authStore.login({
        mobile_number: `+966${phoneNumber.value}`,
      })

      otpDisabled.value = false
    } catch (error) {
      console.error('Send code failed:', error)
    }
  }

  const handleLogin = async () => {
    try {
      await authStore.verify({
        mobile_number: `+966${phoneNumber.value}`,
        verification_code: otp.value.toString(),
      })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // register
  const registerForm = ref({
    name: null,
    email: null,
    mobile_number: null,
    currency: null,
    accept_terms: null,
  })

  const currencies = ref([])

  const { loading: loadingCurrencies } = useRequest(
    () => CurrenciesService.getSupportedCurrencies(),
    {
      onSuccess: res => {
        currencies.value = res.data?.data
        registerForm.value.currency = 'SAR'
      },
    }
  )

  const onRegisterSubmit = async () => {
    try {
      registerForm.value.mobile_number = `+966${registerForm.value.mobile_number}`
      await authStore.register(registerForm.value)
      if (authStore.otp) {
        document.querySelector('.tabs-login li:nth-child(1) a').click()
        registerForm.value = {
          name: null,
          email: null,
          mobile_number: null,
          currency: null,
          accept_terms: null,
        }
      }
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  // scripts
  const createScript = ({ src, onload, content }) => {
    const script = document.createElement('script')
    script.src = src
    script.innerHTML = content
    script.onload = onload
    document.body.appendChild(script)
  }

  const appendScripts = scripts => {
    const loadScript = index => {
      createScript({
        src: scripts[index],
        onload:
          index === scripts.length - 1
            ? () => {
              createScript({
                content: `
                $(function () {
                  AOS.init();
                });`,
              })

              loadingScripts.value = false
            }
            : () => loadScript(index + 1),
      })
    }
    loadScript(0)
  }

  appendScripts([
    'https://code.jquery.com/jquery-3.6.0.min.js',
    'https://code.jquery.com/jquery-3.2.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/tsparticles@2.2.3/tsparticles.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js',
    'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://matrix.sa/website/ar/js/custom.js',
  ])

  const loading = computed(
    () => authStore.loading || loadingCurrencies.value || loadingScripts.value
  )
</script>

<template>
  <section
    class="login-sec"
    style="
      background-image: url('https://matrix.sa/website/ar/images/login-bg.png');
      font-family: 'Tajawal' !important;
    "
  >
    <VOverlay v-model="loading" class="align-center justify-center" persistent>
      <VProgressCircular indeterminate />
    </VOverlay>

    <div
      class="login-container"
      :style="{
        display: loginDisplay,
      }"
    >
      <div class="login">
        <div class="login-logo">
          <img alt="" src="https://matrix.sa/website/ar/images/signup.png">
        </div>
        <div class="lg_btn">
          <v-btn
            class="cta"
            @click="switchLanguage"
          >{{ language }} &nbsp;<img
            alt="image"
            class="lang_icon"
            src="https://matrix.sa/website/ar/images/language-2.svg"
          ></v-btn>
        </div>
      </div>
      <div class="tabs">
        <ul class="tabs-login">
          <li>
            <a href="#tab-111">{{ t("Login") }}</a>
          </li>
          <li>
            <a href="#tab-112">{{ t("create_account") }}</a>
          </li>
        </ul>
        <div class="tabs-stage">
          <div id="tab-111">
            <div class="login_content">
              <h4>{{ t("welcome_back_to_matrix") }}</h4>
              <p>{{ t("login_message") }}</p>
              <div class="signup-form-text">
                <form @submit.prevent="">
                  <div class="form-group">
                    <label
                      :dir="language === 'English' ? 'rtl' : 'ltr'"
                      :style="{
                        textAlign: language === 'English' ? 'right' : 'left',
                      }"
                    >{{ t(`${"auth.phone"}`) }} *</label>
                    <input
                      v-model="phoneNumber"
                      :dir="language === 'English' ? 'rtl' : 'ltr'"
                      placeholder="56xxxxxxxx"
                      type="tel"
                    >
                    <p
                      class="error-message"
                      :dir="language === 'English' ? 'rtl' : 'ltr'"
                    >خطأ ما</p>
                  </div>

                  <div class="form-group">
                    <label
                      :dir="language === 'English' ? 'rtl' : 'ltr'"
                      :style="{
                        textAlign: language === 'English' ? 'right' : 'left',
                      }"
                    >{{ t(`${"auth.password"}`) }} *</label>
                    <input
                      v-model="otp"
                      :dir="language === 'English' ? 'rtl' : 'ltr'"
                      :disabled="otpDisabled"
                      :placeholder="t('add_here')"
                      type="number"
                    >
                  </div>

                  <div class="form-group">
                    <button
                      class="signup-btn"
                      :disabled="isSendCodeDisabled"
                      type="button"
                      @click="handleSendCode"
                    >
                      <span>{{ t(`${"send_code_verification"}`) }}</span>
                    </button>

                    <p v-if="isSendCodeDisabled" class="count-down">
                      {{ formattedCounter }}
                    </p>

                    <button
                      v-if="!otpDisabled"
                      class="signup-btn"
                      type="button"
                      @click="handleLogin"
                    >
                      <span>{{ t("Login") }}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div id="tab-112">
            <div class="login_content">
              <h4>{{ t("welcome_back_to_matrix") }} !</h4>
              <p>{{ t("login_message") }}</p>
              <div class="signup-form-text">
                <form @submit.prevent="onRegisterSubmit">
                  <div class="form-group">
                    <label
                      :style="{
                        textAlign: language === 'English' ? 'right' : 'left',
                      }"
                    >{{ t("auth.username") }} *</label>
                    <input
                      v-model="registerForm.name"
                      :dir="language === 'English' ? 'rtl' : 'ltr'"
                      :placeholder="t('add_here')"
                      type="text"
                    >
                  </div>

                  <div class="form-group">
                    <label
                      :style="{
                        textAlign: language === 'English' ? 'right' : 'left',
                      }"
                    >{{ t("auth.email") }} *</label>
                    <input
                      v-model="registerForm.email"
                      :dir="language === 'English' ? 'rtl' : 'ltr'"
                      :placeholder="t('add_here')"
                      type="email"
                    >
                  </div>

                  <div class="form-group">
                    <label
                      :style="{
                        textAlign: language === 'English' ? 'right' : 'left',
                      }"
                    >{{ t("auth.phone") }} *</label>
                    <input
                      v-model="registerForm.mobile_number"
                      :dir="language === 'English' ? 'rtl' : 'ltr'"
                      placeholder="56xxxxxxxx"
                      required
                      type="tel"
                    >
                  </div>

                  <div class="form-group">
                    <label
                      :style="{
                        textAlign: language === 'English' ? 'right' : 'left',
                      }"
                    >{{ t("currency") }} *</label>
                    <select
                      v-model="registerForm.currency"
                      :placeholder="t('choose_currency')"
                    >
                      <option
                        v-for="currency in currencies"
                        :key="currency.code"
                        :value="currency.code"
                      >
                        {{ currency.name }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group">
                    <button class="signup-btn" type="submit">
                      {{ t("sign_up") }}
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
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css");
@import url("https://unpkg.com/aos@2.3.1/dist/aos.css");
@import url("https://matrix.sa/website/ar/css/style.css");
@import url("https://matrix.sa/website/ar/css/custom.css");
@import url("https://matrix.sa/website/ar/css/animations.css");
@import url("https://matrix.sa/website/ar/css/responsive.css");

.login-sec * {
  font-family: "Tajawal", sans-serif !important;
}

.login-sec {
  height: 100%;
  display: grid;
  place-items: center;

  .login {
    display: flex;
    justify-content: space-between;
  }

  .cta {
    display: flex;
    height: auto;
    background-color: #fd762b;
    padding: 16px 47px;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    border-radius: 50px;
    line-height: 1.5;
    color: #ffffff;
  }
  .cta:hover {
    background-color: #342592;
    color: #fff;
  }
  input:disabled {
    background-color: #f5f5f5;
    color: #a9a9a9;
    border: 1px solid #dcdcdc;
    cursor: not-allowed;
    opacity: 0.6;
  }

  select {
    height: 100%;
    width: 100%;
    padding: 15px 20px;
    border: 1px solid #34259233;
    border-radius: 10px;
    background-color: #fff;
    color: #000;
    outline: none;
    font-size: 16px;
  }

  .signup-btn:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .count-down {
    display: block !important;
  }
  .error-message{
    color: rgb(var(--v-theme-error));
    margin-block: 0.5rem;
  }
}
section.login-sec {
  padding: 0;
}
.login-container {
  min-height: 100vh;
  padding: 30px 80px;
  align-items: center;
  justify-content: center;
}
</style>
