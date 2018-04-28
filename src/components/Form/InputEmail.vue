<template>
    <div>
        <input 
               type="text"
               ref="input"
               v-bind:value="val"
               v-on:input="validateOnInput($event.target.value)"
               v-on:blur="validateOnBlur($event.target.value)"
               v-bind:class="{ error: !isValid }"
        />
        <span class="error" v-if="!isValid">{{errorMsg}}</span>
    </div>
</template>

<script>
export default {
  name: 'InputEmail',
  props: {
    data: {
      default: ''
    }
  },
  data () {
    return {
      errorMsg: '',
      val: this.data.value,
      condition: /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/
    }
  },
  computed: {
    isValid: function () {
      return !this.errorMsg
    }
  },
  methods: {
    validateOnInput: function (value) {
      if (this.errorMsg) {
        if (value !== '' && this.condition.test(value)) {
          this.errorMsg = ''
          this.val = value
        }
      }
      this.$emit('onValueChange', this.returnParentData())
    },
    validateOnBlur: function (value) {
      if (value !== '' && this.condition.test(value)) {
        this.errorMsg = ''
      } else {
        this.errorMsg = 'Неверно введен e-mail'
      }
      this.val = value
      this.$emit('onValueChange', this.returnParentData())
    },
    returnParentData () {
      return {name: this.data.name, value: this.value, isValid: this.isValid}
    }
  }
}
</script>

<style scoped>
div {
    text-align: center;
    padding: 10px;
}
input {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 17px;
    background: white;
}
input.error {
    border-color: red;
}
span.error {
    color: red;
    display: block;
    font-size: 13px;
    font-style: italic;
}
</style>