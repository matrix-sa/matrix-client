import { ref } from 'vue'

const data = ref({
  show: false,
  msg: '',
  type: 'info',
})

export default function useSnackbar () {
  const show = (msg, type = 'info') => {
    data.value.show = true
    data.value.msg = msg
    data.value.type = type
  }

  const hide = () => {
    data.value.show = false
  }

  return {
    data,
    show,
    hide,
  }
}
