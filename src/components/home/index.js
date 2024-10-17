import i18n from "@/i18n"



const currentLanguage = ref(i18n.global.locale.value)
export const isRtl = computed(() => currentLanguage.value === "ar")
