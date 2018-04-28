<template>
    <component v-bind:is="type" :data="data" v-on:updateValue="updateValue"></component>
</template>

<script>
    import SelectVue from './Elements/SelectV.vue';
    import InputTextV from './Elements/InputTextV.vue';
    
    const types = {
        select: 'SelectVue',
        input: 'InputTextV'
    }
    export default {
        name: 'formElement',
        props: {
            data: {
                default: {}
            }
        },
        data() {
            return {
            }
        },
        computed: {
            type: function(){
                return types[this.data.type];
            }
        },
        methods: {
            updateValue: function(value){
                this.$emit('updateValue', value)
            }
        },
        components: {
            SelectVue,InputTextV
        }
    }
</script>

<style scoped>
</style>