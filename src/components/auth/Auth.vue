<script setup>
  import { computed, ref } from 'vue'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { useRequest } from 'vue-request'
  import CurrenciesService from '@/services/currencies-service'

  const authStore = useAuthStore()

  // common
  const loading = computed(() => authStore.loading)

  // login
  const phoneNumber = ref(null)
  const otp = ref(null)
  const otpDisabled = ref(true)
  const loadingScripts = ref(true)
  const loginDisplay = computed(() => (loadingScripts.value ? 'none' : 'block'))
  const onLoginSubmit = async () => {
    try {
      if (otpDisabled.value) {
        await authStore.login({
          mobile_number: `+966${phoneNumber.value}`,
        })
        otpDisabled.value = false
        return
      }

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
</script>

<template>
  <section
    class="login-sec"
    style="
      background-image: url('https://matrix.sa/website/ar/images/login-bg.png');
    "
  >
    <p v-if="loadingCurrencies">Loading...</p>
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
          <a
            class="cta"
            href="../index.html"
          >English&nbsp;<img
            alt="image"
            class="lang_icon"
            src="https://matrix.sa/website/ar/images/language-2.svg"
          ></a>
        </div>
      </div>
      <div class="tabs">
        <ul class="tabs-login">
          <li><a href="#tab-111">تسجيل الدخول</a></li>
          <li><a href="#tab-112">قم بإنشاء حسابك مجانا</a></li>
        </ul>
        <div class="tabs-stage">
          <div id="tab-111">
            <div class="login_content">
              <h4>مرحبًا بك مرة أخرى في ماتريكس!</h4>
              <p>
                قم بتسجيل الدخول إلى حساب Matrix الخاص بك وتحكم في مبيعات
                منتجاتك وحملاتك التسويقية.
              </p>
              <div class="signup-form-text">
                <form @submit.prevent="onLoginSubmit">
                  <div class="form-group">
                    <label>رقم الهاتف *</label>
                    <input
                      v-model="phoneNumber"
                      dir="rtl"
                      placeholder="56xxxxxxxx"
                      type="tel"
                    >
                  </div>

                  <div class="form-group">
                    <label>الرمز السري *</label>
                    <input
                      v-model="otp"
                      :disabled="otpDisabled"
                      placeholder="أدخل هنا"
                      type="number"
                    >
                  </div>

                  <div class="form-group">
                    <button class="signup-btn" type="submit">
                      <v-progress-circular
                        v-if="loading"
                        color="secondary"
                        indeterminate
                        size="25"
                        :width="3"
                      />
                      <span v-else> أرسل الرمز </span>
                    </button>
                    <button
                      v-if="!otpDisabled"
                      class="signup-btn"
                      type="submit"
                    >
                      <v-progress-circular
                        v-if="loading"
                        color="secondary"
                        indeterminate
                        size="25"
                        :width="3"
                      />
                      <span v-else> تسجيل الدخول </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div id="tab-112">
            <div class="login_content">
              <h4>مرحبًا بك مرة أخرى في ماتريكس!</h4>
              <p>
                قم بتسجيل الدخول إلى حساب Matrix الخاص بك وتحكم في مبيعات
                منتجاتك وحملاتك التسويقية.
              </p>
              <div class="signup-form-text">
                <form @submit.prevent="onRegisterSubmit">
                  <div class="form-group">
                    <label>الاسم *</label>
                    <input
                      v-model="registerForm.name"
                      placeholder="أدخل هنا "
                      type="text"
                    >
                  </div>

                  <div class="form-group">
                    <label>البريد الإلكتروني *</label>
                    <input
                      v-model="registerForm.email"
                      placeholder="أدخل هنا "
                      type="email"
                    >
                  </div>

                  <div class="form-group">
                    <label>رقم الهاتف *</label>
                    <input
                      v-model="registerForm.mobile_number"
                      dir="rtl"
                      placeholder="56xxxxxxxx"
                      required
                      type="tel"
                    >
                  </div>

                  <div class="form-group">
                    <label>العملة *</label>
                    <select
                      v-model="registerForm.currency"
                      placeholder="اختر العملة"
                    >
                      <option
                        v-for="currency in currencies"
                        :key="currency.code"
                        :value="currency.code"
                      > {{ currency.name }} </option>
                    </select>
                  </div>

                  <div class="form-group">
                    <button class="signup-btn" type="submit">
                      تسجيل الدخول
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
  }

  input:disabled {
    background-color: #f5f5f5; /* Light gray background */
    color: #a9a9a9; /* Gray text color */
    border: 1px solid #dcdcdc; /* Light gray border */
    cursor: not-allowed; /* Not-allowed cursor */
    opacity: 0.6; /* Slightly transparent */
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

label {
  text-align: right !important;
}

}
</style>
