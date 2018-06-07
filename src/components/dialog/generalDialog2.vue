<template>
  <DialogWrapper :isShow="isShow" :title="title">
    <template slot="content">
      <p class="text">{{ text }}</p>
    </template>
    <template slot="footer">
      <a href="javascript:;" class="btn btn-primary"
        @click="close">{{ btnText }}</a>
    </template>
  </DialogWrapper>
</template>

<script>
import DialogWrapper from '@/components/dialog/dialogWrapper'
export default {
  components: {
    DialogWrapper
  },
  props: {
    isShow: {
      type: Boolean
    },
    title: {
      type: String
    },
    text: {
      type: String
    },
    btnText: {
      type: String
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 20px;
}
.btn {
  width: 100%;
}
</style>
