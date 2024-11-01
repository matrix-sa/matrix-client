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
  function appendScripts (scripts) {
    function loadScript (index) {
      if (index < scripts.length) {
        const script = document.createElement('script')
        script.src = scripts[index]
        script.onload =
          index + 1 === scripts.length
            ? () => {
              const _script = document.createElement('script')
              _script.innerHTML = `
              $(function () {
                  AOS.init();
              });`
              document.body.appendChild(_script)
            }
            : () => loadScript(index + 1)
        document.body.appendChild(script)
      }
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
    <div class="login-container">
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
                <form>
                  <div class="form-group">
                    <label>بريد إلكتروني *</label>
                    <input
                      v-model="email"
                      placeholder="أدخل هنا"
                      required
                      type="email"
                    >
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
          <div id="tab-112">
            <div class="login_content">
              <h4>مرحبًا بك مرة أخرى في ماتريكس!</h4>
              <p>
                قم بتسجيل الدخول إلى حساب Matrix الخاص بك وتحكم في مبيعات
                منتجاتك وحملاتك التسويقية.
              </p>
              <div class="signup-form-text">
                <form>
                  <div class="form-group">
                    <label>بريد إلكتروني *</label>
                    <input placeholder="أدخل هنا " type="email">
                  </div>

                  <div class="form-group password">
                    <label>كلمة المرور *</label>
                    <input placeholder="أدخل هنا" type="password">
                    <img
                      alt=""
                      src="https://matrix.sa/website/ar/images/eyes.png"
                    >
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

label {
  text-align: right !important;
}
</style>

<style>
:deep(.login-sec) {
  @import url("https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css");
  @import url("https://unpkg.com/aos@2.3.1/dist/aos.css");
  @import url("https://matrix.sa/website/ar/css/style.css");
  @import url("https://matrix.sa/website/ar/css/custom.css");
  @import url("https://matrix.sa/website/ar/css/animations.css");
  @import url("https://matrix.sa/website/ar/css/responsive.css");
}
</style>
