<template>
    <div>
        <input 
               type="text"
               ref="input"
               v-bind:value="val"
               v-on:input="updateValue($event.target.value)"
        />
    </div>
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    value: {
      default: 0
    }
  },
  data () {
    return {
      val: this.value
    }
  },
  methods: {
    updateValue: function (value) {
      let result = format(value)
      this.$refs.input.value = result
      this.$emit('input', result)
      this.val = result
    }
  }
}
function format (value) {
  return value.replace(/[^-0-9]/gim, '')
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
</style>