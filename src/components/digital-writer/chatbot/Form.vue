<template>
  <div class="main-container">
    <VTextField
      class="text-input chat elevated-input"
      :placeholder="$t('enter_text_here')"
      v-bind="{
        'bg-color': '#fff',
        flat: true,
        variant: 'plain',
        rounded: true
      }"
    />
    <div class="btn-con">
      <VBtn class="custom-btn" color="orange">
        {{ $t('chat_message_send_btn') }}
        <VIcon class="icon-send" icon="tabler-send-2" />
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss">
.v-text-field input {
  padding-top: 0 !important;
  padding-right: 12px !important;
  border-radius: 200px;
}

.main-container {
  position: relative;
}

.elevated-input .v-field__outline {
  box-shadow: 0px 6px 12px 0px #00000026;
  border-radius: 100px !important;
}

.custom-btn {
  position: absolute;
  top: 50.5%;
  transform: translateY(-80%);
  width: 104px !important;
  height: 40px !important;
  gap: 8px;
  left: 8px;
  border-radius: 200px;
  color: #FFF !important;
  font-size: 16px;
}

.icon-send {
  transform: rotate(180deg);
}
</style>
