<template>
        <select :name="data.name" class="main-search__select" v-on:change="updateValue($event.target.value)">
                <option v-if="data.placeholder" class="main-search__option"  value="">{{data.placeholder}}</option>
            <template v-if="data.data">
                <option class="main-search__option"  v-for="option in data.data" :value="option.value" :key="option.value" :selected="option.value == data.value">{{option.name}}</option>
            </template>
        </select>
</template>

<script>
    export default {
        name: 'SelectV',
        props: {
            data: {
                default: {}
            }
        },
        data() {
            return {}
        },
        computed: {
            
        },
        methods: {
            updateValue: function(value){
                this.$emit('updateValue', {value, name: this.data.name})
            }
        }
    }
</script>

<style scoped>
</style>