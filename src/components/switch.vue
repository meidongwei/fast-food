<template>
  <div>
    <input v-show="false" type="checkbox" :id="name" class="raw-checkbox">
    <label :for="name" class="emulate-ios-button"></label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'tmpName'
    }
  }
}
</script>

<style lang="css" scoped>
.emulate-ios-button {
  display: block;
  width: 60px;
  height: 30px;
  background: #ccc;
  border-radius: 5rem;
  cursor: pointer;
  position: relative;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

/* 使用伪类模拟滑块滑动 */
.emulate-ios-button:after {
  content: '';
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  position: absolute;
  left: .1rem;
  top: .1rem;
  -webkit-transform:translateZ(0);
  transform:translateZ(0);
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

/* 滑块滑动过程中，滑块的拉伸变化 */
.emulate-ios-button:active:after {
  width: 35px;
}
.emulate-ios-button:active {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}


.raw-checkbox:checked + label {
  background: #34bf49;
}


/* 滑块滑动的距离 */
.raw-checkbox:checked + label:after {
  left: 30px;
}
.raw-checkbox:checked + label:active:after {
  left: 30px;
}


.raw-checkbox:disabled + label {
  background: #d5d5d5;
  pointer-events: none;
}
.raw-checkbox:disabled + label:after {
  background: #bcbdbc;
}
</style>
