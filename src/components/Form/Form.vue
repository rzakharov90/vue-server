<template>
    <form v-bind:class="{ error: !isValid }">
        <InputNumber v-bind:value="value.tel.value" v-bind:valid="value.tel.isValid"></InputNumber>
        <InputEmail v-bind:data="value.mail" v-on:onValueChange="onValueChange"></InputEmail>
        <InputText v-bind:data="value.name" v-on:onValueChange="onValueChange"></InputText>
    </form>
</template>

<script>
import InputNumber from '@/components/Form/InputNumber.vue'
import InputEmail from '@/components/Form/InputEmail.vue'
import InputText from '@/components/Form/InputText.vue'
export default {
  name: 'Form',
  props: {
  },
  data () {
    return {
      value: {
        tel: {
          value: '',
          isValid: true
        },
        mail: {
          value: '',
          isValid: true,
          name: 'mail'
        },
        name: {
          value: '',
          isValid: true,
          name: 'name',
          minLength: 10
        }
      }
    }
  },
  methods: {
    onValueChange: function (data) {
      console.log(data)
      this.value[data.name] = data
    }
  },
  computed: {
    isValid: function () {
      let valid = true
      for (let item in this.value) {
        if (!this.value[item].isValid) {
          valid = false
        }
      }
      return valid
    }
  },
  components: {
    InputNumber, InputEmail, InputText
  }
}
</script>

<style scoped>
form {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 4px;
    width: 500px;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
}
form.error {
    border-color: red;
}
</style>