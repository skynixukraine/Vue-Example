<template>
    <v-select v-if="multiple"
              multiple
              v-model="selected"
              :options="this.optionsName"
              @input="setSelected"
              class="v-select__multiple"

    ></v-select>
    <v-select v-else :options="this.optionsName"></v-select>
</template>
<script>
    import Vue from 'vue';
    import vSelect from 'vue-select';
    Vue.component('v-select', vSelect);
    export default {
        data(){
            return{
                multiple: false,
                building: false,
                selected: [],
                selectedId: [],
                optionsName: [],
                map: new Map()
            }
        },
        props:{
            config:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        mounted(){
            let options = this.config.options;
            this.multiple = this.config.multiple;

            options.forEach(item=>{
                this.optionsName.push(item.name);
                this.map.set(item.name, item.id);
            });
        },
        beforeUpdate(){
            let _o={},
                _selected=[];
            for (let [key, value] of this.map) {
                _o[value] = key;
            }
            this.config.selected.forEach(item=>{
                _selected.push(_o[item]);
            });
            this.selected = _selected;
        },
        methods: {
            setSelected(value) {
                if(!this.building){
                    this.building = !this.building;
                    return false;
                }
                let idArr = [];
                for(let i=0; i<value.length; i++){
                    idArr.push(this.map.get(value[i]));
                }
                this.selectedId = idArr;
                this.$emit('selectedData', {id:this.selectedId, selected:this.selected});
            }
        }
    }
</script>
<style>
    .v-select {
        position: relative;
        font-family: inherit;
        border-radius: 4px;
    }
    .v-select__multiple {
        border: 1px solid #e0e1e3;
    }
    .v-select__multiple .vs__dropdown-toggle {
        min-height: 40px;

    }
    @media (min-width: 480px){
        .v-select__multiple .vs__dropdown-toggle {
            min-height: 56px;
        }
    }
    @media (min-width: 720px) and (max-width: 962px) {
        .v-select {
            width: 140px;
        }
    }
    @media (min-width: 1120px) {
        .v-select {
            min-width: 140px;
        }
    }
    @media (min-width: 1366px) {
        .v-select {
            min-width: 170px;
        }
    }
    .v-select,
    .v-select * {
        box-sizing: border-box;
    }
    @-webkit-keyframes vSelectSpinner {
        0% {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(1turn);
        }
    }
    @keyframes vSelectSpinner {
        0% {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(1turn);
        }
    }
    .vs__fade-enter-active,
    .vs__fade-leave-active {
        pointer-events: none;
        transition: opacity .15s cubic-bezier(1, .5, .8, 1);
    }
    .vs__fade-enter,
    .vs__fade-leave-to {
        opacity: 0;
    }
    .vs--disabled .vs__clear,
    .vs--disabled .vs__dropdown-toggle,
    .vs--disabled .vs__open-indicator,
    .vs--disabled .vs__search,
    .vs--disabled .vs__selected {
        cursor: not-allowed;
        background-color: #f8f8f8;
    }
    .v-select[dir=rtl] .vs__actions {
        padding: 0 3px 0 6px;
    }
    .v-select[dir=rtl] .vs__clear {
        margin-left: 6px;
        margin-right: 0;
    }
    .v-select[dir=rtl] .vs__deselect {
        margin-left: 0;
        margin-right: 2px;
    }
    .v-select[dir=rtl] .vs__dropdown-menu {
        text-align: right;
    }
    .vs__dropdown-toggle {
        min-height: 35px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: flex;
        padding: 0 0 4px;
        background: none;
        border-radius: 4px;
        white-space: normal;
        background: #ffffff;
    }
    .vs__selected-options {
        display: flex;
        flex-basis: 100%;
        flex-grow: 1;
        flex-wrap: wrap;
        padding: 0 2px;
        position: relative;
    }
    .vs__actions {
        display: flex;
        align-items: center;
        padding: 4px 6px 0 3px;
        cursor: pointer;
    }
    .vs--searchable .vs__dropdown-toggle {
        cursor: text;
    }
    .vs--unsearchable .vs__dropdown-toggle {
        cursor: pointer;
    }
    .vs--open .vs__dropdown-toggle {
        border-bottom-color: transparent;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .vs__open-indicator {
        fill: rgba(35, 125, 229, 1);
        transform: scale(1);
        transition: transform .15s cubic-bezier(1, -.115, .975, .855);
        transition-timing-function: cubic-bezier(1, -.115, .975, .855);
    }
    .vs--open .vs__open-indicator {
        transform: rotate(180deg) scale(1);
    }
    .vs--loading .vs__open-indicator {
        opacity: 0;
    }
    .vs__clear {
        fill: rgba(60, 60, 60, .5);
        padding: 0;
        border: 0;
        background-color: transparent;
        cursor: pointer;
        margin-right: 8px;
    }
    .vs__dropdown-menu {
        display: block;
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        z-index: 1000;
        padding: 5px 0;
        margin: 0;
        width: 100%;
        max-height: 350px;
        overflow-y: auto;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .15);
        border: 1px solid rgba(60, 60, 60, .26);
        border-top-style: none;
        border-radius: 0 0 4px 4px;
        text-align: left;
        list-style: none;
        background: #fff;
    }
    .vs__no-options {
        text-align: center;
    }
    .vs__dropdown-option {
        line-height: 1.42857143;
        display: block;
        padding: 3px 5px;
        clear: both;
        color: #333;

    }
    .vs__dropdown-option:not(:last-child){
        border-bottom: 1px solid #e0e1e3;
    }
    .vs__dropdown-option:hover {
        cursor: pointer;
    }
    .vs__dropdown-option--highlight {
        background: #5897fb;
        color: #fff;
    }
    .vs__dropdown-option--disabled {
        background: inherit;
        color: rgba(60, 60, 60, .5);
    }
    .vs__dropdown-option--disabled:hover {
        cursor: inherit;
    }
    .vs__selected {
        display: flex;
        align-items: center;
        background-color: #247ee5;
        border: 1px solid rgba(60, 60, 60, .26);
        border-radius: 4px;
        line-height: 1.4;
        margin: 4px 2px 0 0;
        padding: 2px 10px 2px;
        color: #eef6fe;
    }
    .vs__deselect {
        display: inline-flex;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin-left: 4px;
        padding: 0;
        border: 0;
        cursor: pointer;
        background: none;
        fill: rgba(60, 60, 60, .5);
        text-shadow: 0 1px 0 #fff;
    }
    .vs__deselect svg {
        fill: #66bd7e;
    }
    .vs--single .vs__selected {
        background-color: transparent;
        border-color: transparent;
        color: #7a7d84;
        cursor: pointer;
    }
    .vs--single.vs--open .vs__selected {
        position: absolute;
        opacity: .4;
    }
    .vs--single.vs--searching .vs__selected {
        display: none;
    }
    .vs__search::-webkit-search-cancel-button {
        display: none;
    }
    .vs__search::-ms-clear,
    .vs__search::-webkit-search-decoration,
    .vs__search::-webkit-search-results-button,
    .vs__search::-webkit-search-results-decoration {
        display: none;
    }
    .vs__search,
    .vs__search:focus {
        width: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        line-height: 1.4;
        font-size: 1em;
        border: 1px solid transparent;
        border-left: none;
        outline: none;
        margin: 4px 0 0;
        padding: 0 7px;
        max-width: 100%;
        flex-grow: 1;
        color: #7a7d84;
        background: transparent;
        position: absolute;
    }
    .vs__search::-webkit-input-placeholder {
        color: inherit;
    }
    .vs__search::-moz-placeholder {
        color: inherit;
    }
    .vs__search:-ms-input-placeholder {
        color: inherit;
    }
    .vs__search::-ms-input-placeholder {
        color: inherit;
    }
    .vs__search::placeholder {
        color: inherit;
    }
    .vs--unsearchable .vs__search {
        opacity: 1;
    }
    .vs--unsearchable .vs__search:hover {
        cursor: pointer;
    }
    .vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {
        opacity: .2;
    }
    .vs__spinner {
        align-self: center;
        opacity: 0;
        font-size: 5px;
        text-indent: -9999em;
        overflow: hidden;
        border: .9em solid hsla(0, 0%, 39.2%, .1);
        border-left-color: rgba(60, 60, 60, .45);
        transform: translateZ(0);
        -webkit-animation: vSelectSpinner 1.1s linear infinite;
        animation: vSelectSpinner 1.1s linear infinite;
        transition: opacity .1s;
    }

    .vs__spinner,
    .vs__spinner:after {
        border-radius: 50%;
        width: 5em;
        height: 5em;
    }
    .vs--loading .vs__spinner {
        opacity: 1;
    }
</style>