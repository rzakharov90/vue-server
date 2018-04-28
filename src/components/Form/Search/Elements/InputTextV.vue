<template>
        
        <input :name="data.name" class="main-search__input" v-on:change="updateValue($event.target.value)" :value="value" :placeholder="data.placeholder"/>
</template>

<script>
    export default {
        name: 'InputTextV',
        props: {
            data: {
                default: {}
            }
        },
        data() {
            return {
                value: this.data.value || ''
            }
        },
        computed: {

        },
        methods: {
            updateValue: function(value){
                console.log(value);
                this.value = value;
                this.$emit('updateValue', {value, name: this.data.name})
            }
        }
    }
</script>

<style scoped>
</style>