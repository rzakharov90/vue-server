<template>
    <form v-bind:class="{ error: !isValid }" class="main-search">
        <div class="main-search__row">
            <div class="main-search__elem-wrap">
                <select name="category" class="main-search__select" :value="mainValues.category" v-on:change="mainValues.category = $event.target.value">
                    <option class="main-search__option" v-for="elem in MainData.category.data" :value="elem.value">{{elem.name}}</option>
                </select>
            </div>
            <div class="main-search__elem-wrap">
                <input type="text" name="term" :placeholder="MainData.term.placeholder"  class="main-search__input" :value="mainValues.term" v-on:change="mainValues.term = $event.target.value"/>
            </div>
            <div class="main-search__elem-wrap main-search__elem-wrap_submit">
                <button type="submit" class="main-search__submit">Найти</button>
            </div>
        </div>
        <div v-if="additionalRowData">
            <additionalRow :data="additionalRowData" v-on:updateValue="updateAdditionalValue"></additionalRow>
        </div>
    </form>
</template>


<script>
    import additionalRow from './additionalRow.vue';

    export default {
        name: 'Search',
        props: {
            MainData: Object,
            AddData: Object
        },
        data() {
            return {  
                mainValues: {
                    term: this.MainData.term.value,
                    category: this.MainData.category.value,
                },
                addValues: {
                    auto: {
                        brand: null,
                        model: null,
                        price_from: null
                    },
                    beton: {
                        brand: null,
                        model: null,
                        price_from: null,
                        price_to: null,
                        body: null
                    }
                }
            }
        },
        methods: {
            updateAdditionalValue: function({value, name}){
                this.addValues[this.mainValues.category][name] = value;
                // ручное обновление значений зависимых элементов форм
                if(this.AddData[this.mainValues.category][name].childs && this.AddData[this.mainValues.category][name].childs.length) {
                    this.AddData[this.mainValues.category][name].childs.forEach(el => {
                        if (this.addValues[this.mainValues.category][el]) {
                            this.addValues[this.mainValues.category][el] = '';
                        }
                    })
                }
            },
            getAdditionalData: function(AddData){
                // Создаём копию объекты данных дополнительных фильтров
                const addData = Object.assign({}, AddData);
                let data = {}; // инициализация объекта, который мы вернём из метода
                for (let name in addData) { // цикл по всем свойствам нашего объекта
                    
                    let property = addData[name]; // короткий доступ к каждому свойству
                    
                    if (property.parent) { // Если это фильтр, который зависит от других, то:
                        let parentValue = this.addValues[this.mainValues.category][property.parent]; // Узнаём актуальное значение у фильтра, который является главным к нему
                        if (property.data[parentValue] && property.data[parentValue].length) {
                            
                            data[name] = Object.assign({}, property); // записываем новое свойство в новый объект, используя клонирование
                            data[name].value = this.addValues[this.mainValues.category][name]; // Записываем в это свойство актуальное значение value 
                            data[name].data = property.data[parentValue]; // Используем это значение, чтобы забрать актуальную data - например список селектов.
                            
                        }
                    } else {
                        data[name] = Object.assign({}, property); // записываем новое свойство в новый объект, используя клонирование
                        data[name].value = this.addValues[this.mainValues.category][name]; // Записываем в это свойство актуальное значение value 
                    }

                }
                return data;
            },
            getInitialAdditionalData: function(AddData) {
                for (let name in this.addValues) {
                    for (let name2 in this.addValues[name]) {
                        this.addValues[name][name2] = AddData[name][name2].value || '';
                    }
                }
            },
            
        },
        computed: {
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
                if (!this.AddData[this.mainValues.category]) {
                    return false;
                }
                return this.getAdditionalData(this.AddData[this.mainValues.category]);

            },
            finallyData: function(){
                let data = Object.assign({}, this.mainValues);
                if (this.addValues[this.mainValues.category]) {
                   data = Object.assign(data, this.addValues[this.mainValues.category]);
                }
                return data;
            }
            
        },
        created: function(){
            this.getInitialAdditionalData(this.AddData);
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