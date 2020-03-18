<template>
    <div class="table--cookie">
        <div class="table__content">
            <div class="table__header table__header--cookie">
                <div class="table__header-item table__header-item_id">Name</div>
                <div class="table__header-item">Provider</div>
                <div class="table__header-item">Purpose</div>
                <div class="table__header-item table__header-item_enquiry-date">Akzeptiert</div>
            </div>
            <template v-for="(item, index) in this.$t('cookie')">
                <div class="table__main table__main-items table__main-items--cookies" :key="'cookie-' + index" v-if="item[cookieGroups]">
                    <div class="table__main-item table__main-item-list" data-title="Name">{{item.name}}</div>
                    <div class="table__main-item table__main-item-list" data-title="Provider">{{item.provider}}</div>
                    <div class="table__main-item table__main-item-list" data-title="Purpose">{{item.purpose}}
                    </div>
                    <div class = "table__main-item table__main-item-list" data-title="akzeptiert">
                        <input class="table__checkbox--position"
                               name="checkedCookies[]"
                               :value="item.name"
                               type="checkbox"
                               v-if="item.selectedDefault"
                               v-model="checked[item.name]"
                               disabled>

                        <input class="table__checkbox table__checkbox--position"
                               name="checkedCookies[]"
                               :value="item.name"
                               type="checkbox"
                               @click.stop="changeCheckedCookie(item.name)"
                               v-model="checked[item.name]"
                               v-else>
                    </div>
                </div>
            </template>

        </div>
    </div>
</template>
<script>

    export default {

        props:{
            cookieGroups:{
                type: String,
                default(){
                    return ''
                }
            },
            checked:{
                type: Object,
                default(){
                    return {}
                }
            }
        },

        methods: {
            changeCheckedCookie(name){
                this.$emit('changeChecked', name);
            }
        }
    }
</script>
<style lang="scss">
    .table{
        &--cookie{
            margin-left: 0;
        }
        &__main-items{
            cursor: default;
            background-color: #ffffff;

            &:hover{
                width: 100%;
                cursor: default;
            }
            @include tablet {
                &:after {
                    width: 100%;
                }
            }
            &--cookies{
                background: #f7f7f7;
            }
        }
        &__header{

            &--cookie{
                margin-top: 12px;

                &:after {
                    width: 100%;
                }
            }
        }
        &__checkbox{
            &--position{
                position: relative;
                top: 5px;
            }
            &:not([disabled]){
                cursor: pointer;
            }
        }
        @include tablet-max {
            &__main-item-list{
                padding-left: 35%;
            }
            &__checkbox{
                &--position{
                    left: 25px;
                }
            }
        }
    }
</style>