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
                value: 'ford',
                subs: {
                    model: {
                        type: 'select',
                        name: 'model',
                        placeholder: 'Выберите марку',
                        subs: {
                            test: {
                                type: 'select',
                                name: 'test',
                                placeholder: 'Тест',
                                 subs: {
                                    test2: {
                                        type: 'select',
                                        name: 'test2',
                                        placeholder: 'Тест'
                                    }
                                }
                            }
                        }
                    }  
                },
                data: {
                    vaz: {
                        value: 'vaz',
                        name: 'vaz',
                        subs: {
                            model: {
                                data: {
                                    10: {
                                        value: 10,
                                        name: '10',
                                        subs: {
                                            test: {
                                                data: {
                                                    t: {
                                                        value: 't',
                                                        name: 't',
                                                        subs: {
                                                            test2: {
                                                                data: {
                                                                    t: {
                                                                        value: 'tttt',
                                                                        name: 'tttt'
                                                                    },
                                                                    b: {
                                                                        value: 'bbbb',
                                                                        name: 'bbbb'
                                                                    },
                                                                    n: {
                                                                        value: 'nnnn',
                                                                        name: 'nnnn'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    b: {
                                                        value: 'b',
                                                        name: 'b'
                                                    },
                                                    n: {
                                                        value: 'n',
                                                        name: 'n'
                                                    }
                                                }
                                            }
                                        }
                                    }, 
                                    12: {
                                        value: 12,
                                        name: '12'
                                    },
                                    13: {
                                        value: 13,
                                        name: '13'
                                    }, 
                                    14: {
                                        value: 14,
                                        name: '14'
                                    }
                                }
                            }
                        }
                    }, 
                    ford: {
                        value: 'ford',
                        name: 'ford',
                        value: 'focus',
                        subs: {
                            model: {
                                data: {
                                    focus: {
                                        value: 'focus',
                                        name: 'focus'
                                    },
                                    transit: {
                                        value: 'transit',
                                        name: 'transit'
                                    },
                                    mondeo: {
                                        value: 'mondeo',
                                        name: 'mondeo'
                                    }
                                }
                            }
                        }
                    },
                    bmw: {
                        value: 'bmw',
                        name: 'bmw',
                        subs: {
                            model: {
                                data: {
                                    bfocus: {
                                        value: 'bfocus',
                                        name: 'bfocus'
                                    }, 
                                    btransit: {
                                        value: 'btransit',
                                        name: 'btransit'
                                    },
                                    bmondeo: {
                                        value: 'bmondeo',
                                        name: 'bmondeo'
                                    }
                                }
                            }
                        }
                    },
                    opel: {
                        value: 'opel',
                        name: 'opel',
                    }, 
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
                test: 't',
                test2: '',
                data: {},
                mainRowData: Data,
            }
        },
        methods: {
            onValueChange: function(data) {
                this.value[data.name] = data;
            },
            updateAdditionalRowValue: function({value, name}){
                this.data[name] = value;
            },
            setDataTree: function(){
                const mainData = Object.assign({},this.mainRowData),
                      addData = Object.assign({},AddData);
                let finData = {};
                for (let name in mainData) {
                    finData[name] = mainData[name].value;
                }
                
                const setData = ({finData, addData}) => {
                    for (let name in addData) {
                        const val = addData[name].value;
                        finData[name] = val;
                        if (addData[name].subs && addData[name].subs[val]) {
                            setData({finData, addData: addData[name].subs[val]});
                        }
                    }
                }
                setData({finData, addData: addData[this.category]});
                console.error(43434,finData)
            }
        },
        beforeMount: function(){
            this.setDataTree();
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
                let addData = {},
                    data = Object.assign({},AddData[this.category]);
                    
                
                
                
                const setFinData = (data) => {

                    for (let name in data){
                        let d = data[name]; // короткий доступ к обрабатываемому объекту-свойству
                        
                        addData[name] = d; // записываем в финальный объект данные из обрабатываемого 
                        addData[name].value = this.data[name]; // Возможно бред - нужен, чтобы пробрасывать актуальное value в элементы форм - Косяк - вызывает лишний раз additionalRowData - Или не лишний?

                        // если у обрабатываемого объекта есть зависимые объекты, то запускаем рекурсию, чтобы обработать их. Но - данные для зависимого объекта хранятся и в главном. Поэтому - небольшой костыль пока
                        
                        if (d.subs) {
                            let subs =  {...d.subs};
                            for (let n in subs){
                                let data = {},
                                    obj1 = subs[n] || {};
                                if ( typeof d.data[this[name]] != 'undefined' &&  typeof d.data[this[name]].subs != 'undefined') {
                                    console.error(d.data[this[name]])
                                    console.error(d.data[this[name]].subs)
                                    console.error(d.data[this[name]].subs[n])
                                    let obj2 = d.data[this[name]].subs[n];
                                
                                    data[n] = Object.assign({}, obj1, obj2);
                                    setFinData(data);
                                    
                                }
                                    
                            }
                        }
                        
                    }
                }
                
                setFinData(data);
                console.error(1111,addData)
                return addData;
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