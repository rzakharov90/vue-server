<template>
    <form v-bind:class="{ error: !isValid }" class="main-search">
        <div class="main-search__row">
            <div class="main-search__elem-wrap">
                <select name="category" class="main-search__select" v-model="category">
                    <option class="main-search__option" v-for="elem in mainRowData.category.data" :value="elem.value">{{elem.name}}</option>
                </select>
            </div>
            <div class="main-search__elem-wrap">
                <input type="text" name="term" :placeholder="mainRowData.term.placeholder"  class="main-search__input"  v-model="term"/>
            </div>
            <div class="main-search__elem-wrap main-search__elem-wrap_submit">
                <button type="submit" class="main-search__submit">Найти</button>
            </div>
        </div>
        <div v-if="additionalRowData">
            <additionalRow :data="additionalRowData" v-on:updateValue="updateAdditionalRowValue"></additionalRow>
        </div>
    </form>
</template>


<script>
    import additionalRow from './additionalRow.vue';

    const Data = {
        category: {
            value: 'auto',
            data: [
                {
                    value: '',
                    name: 'Любая категория'
                },
                {
                    value: 'auto',
                    name: 'Автомобили'
                },
                {
                    value: 'beton',
                    name: 'Бетон'
                },
                {
                    value: 'pesok',
                    name: 'Песок'
                },
            ]
        },
        term: {
            placeholder: 'Поиск',
            value: ''
        }
    }
    
    const AddData = {
        auto: {
            brand: {
                type: 'select',
                name: 'brand',
                data: [{
                    value: 'vaz',
                    name: 'vaz'
                }, {
                    value: 'ford',
                    name: 'ford'
                }, {
                    value: 'bmw',
                    name: 'bmw'
                },{
                    value: 'opel',
                    name: 'opel'
                }, ]
            },
            model: {
                type: 'select',
                parent: 'brand',
                name: 'model',
                placeholder: 'Выберите марку',
                data: {
                    vaz: [{
                        value: 10,
                        name: '10'
                    }, {
                        value: 12,
                        name: '12'
                    }, {
                        value: 13,
                        name: '13'
                    }, {
                        value: 14,
                        name: '14'
                    }],
                    ford: [{
                        value: 'focus',
                        name: 'focus'
                    }, {
                        value: 'transit',
                        name: 'transit'
                    }, {
                        value: 'mondeo',
                        name: 'mondeo'
                    }],
                    bmw: [{
                        value: 'bfocus',
                        name: 'bfocus'
                    }, {
                        value: 'btransit',
                        name: 'btransit'
                    }, {
                        value: 'bmondeo',
                        name: 'bmondeo'
                    }]
                }
            },
            price_from: {
                type: 'input',
                name: 'price_from',
                placeholder: 'Цена от',
                value: 10000
            }
        }
    }


    export default {
        name: 'Search',
        props: {},
        data() {
            return {
                term: Data.term.value,
                category: Data.category.value,
                brand: 'vaz',
                model: '10',
                price_from: '10000',
                mainRowData: Data,
            }
        },
        methods: {
            onValueChange: function(data) {
                this.value[data.name] = data;
            },
            updateAdditionalRowValue: function({value, name}){
                this[name] = value;
            }
        },
        computed: {
            additionalRow: function() {
                return this.additionalRowData[this.category];
            },
            isValid: function() {
                let valid = true
                for (let item in this.value) {
                    if (!this.value[item].isValid) {
                        valid = false
                    }
                }
                return valid
            },
            additionalRowData: function(){
                if (!AddData[this.category]) {
                    return false;
                }
                let finData = {},
                    data = AddData[this.category];
                for (let name in data){
                    let d = data[name];
                    
                    finData[name] = {...d};
                    finData[name].value = this[name]; // Возможно бред - нужен, чтобы пробрасывать актуальное value в элементы форм - Косяк - вызывает лишний раз additionalRowData - Или не лишний?
                    
                    if (d.parent) {
                        let parent = d.parent;
                        let parentValue = this[parent];
                        finData[name].data = d.data[parentValue];
                       // this[name] = d.data[parentValue][0].value
                    }
                }
                return finData;
                
            }
        },
        components: {
            additionalRow
        }
    }
</script>

<style>
    .main-search__row {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        border: 2px solid #ccc;
    }
    .main-search__row_flex-wrap {
        flex-wrap: wrap;
    }
    .main-search__elem-wrap {
        flex-grow: 1;
        border: 1px solid #ccc;
    }

    .main-search__elem-wrap_submit {
        flex-grow: 0;
    }

    .main-search__select {
        width: 100%;
        padding: 5px 10px;
        font-size: 16px;
        height: 100%;
        border: none;
    }

    .main-search__option {
        padding: 5px;
    }

    .main-search__input {
        width: 100%;
        padding: 5px 10px;
        font-size: 16px;
        height: 100%;
    }

    .main-search__submit {
        ;
        padding: 5px 10px;
        font-size: 16px;
        height: 100%;
        background: violet;
        color: white;
        border: none;
        cursor: pointer;
    }
</style>