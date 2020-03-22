<template>
    <div class="enquiries__filter">
        <form>
            <div class="enquiries__search">
                <input type="search"
                       placeholder="patient's full name"
                       class="input enquiries__search-input"
                       @change="querySearch"
                       @search="querySearch('clean')"
                       @keyup="searchKeydown"
                       v-model="search"

                >
                <span class="enquiries__warning" v-if="space">Enter only last name or first name</span>
            </div>
            <div class="enquiries__date">
                <h3>Filter by:</h3>
                <div class="enquiries__date-wrapper">

                    <div class="enquiries__date-item">
                        <span class="enquiries__date-title">Enquiry ID:</span>
                        <div class="enquiries__date-main">

                            <label class="enquiries__date-field">
                                <span class="enquiries__label-hidden">:</span>
                                <input type="number"
                                       class="enquiries__date-input input"
                                       v-model="enquiryID"
                                       @change="querySearch"

                                >
                            </label>
                        </div>
                    </div>
                    <div class="enquiries__date-item">
                        <span class="enquiries__date-title">Date</span>
                        <div class="enquiries__date-main">
                            <label class="enquiries__date-field">
                                from:
                                <input type="date"
                                       class="enquiries__date-input input"
                                       v-model="data.from"
                                >
                            </label>
                            <label class="enquiries__date-field">
                                to:
                                <input type="date"
                                       class="enquiries__date-input input"
                                       v-model="data.to"
                                       @change="querySearch"
                                >
                            </label>
                        </div>
                    </div>
                    <div class="enquiries__date-item">
                        <span class="enquiries__date-title">Date of transaction:</span>
                        <div class="enquiries__date-main">
                            <label class="enquiries__date-field">
                                from:
                                <input type="date"
                                       class="enquiries__date-input input"
                                       v-model="dateTransaction.from"
                                >
                            </label>
                            <label class="enquiries__date-field">
                                to:
                                <input type="date"
                                       class="enquiries__date-input input"
                                       v-model="dateTransaction.to"
                                       @change="querySearch"
                                >
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="enquiries__submit">
                <button class="link link--button link--button-blue link--button-gradient" type="reset">Reset
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: '',
                enquiryID: null,
                data:{
                    from:null,
                    to:null
                },
                dateTransaction:{
                    from:null,
                    to:null
                },
                space: false
            }
        },
        methods :{
            querySearch(e){
                if(e === 'clean'){
                    this.search = '';
                }
                if( this.data.to && (!this.data.from || this.data.from > this.data.to) ){
                    let toD = new Date(this.data.to);
                    let newD = new Date(toD.setMonth(toD.getMonth() - 1)).toJSON(); // 1 month ago
                    let parsNewD = newD.slice(0,4) + '-' + newD.slice(5,7) + '-' +newD.slice(8,10);
                    this.data.from = parsNewD;
                }
                if( this.dateTransaction.to && (!this.dateTransaction.from || this.dateTransaction.from > this.dateTransaction.to) ){
                    let toD = new Date(this.dateTransaction.to);
                    let newD = new Date(toD.setMonth(toD.getMonth() - 1)).toJSON(); // 1 month ago
                    let parsNewD = newD.slice(0,4) + '-' + newD.slice(5,7) + '-' +newD.slice(8,10);
                    this.dateTransaction.from = parsNewD;
                }

                let query ={
                    search: this.search,
                    enquiryID: this.enquiryID,
                    data: this.data,
                    dateTransaction: this.dateTransaction
                };

                this.$emit('search', query);
            },
            searchKeydown(e){

                if(e.keyCode === 32){
                    let _this = this;
                    this.space = true;
                    this.search =  e.target.value.slice(0,-1);

                    setTimeout(()=>{
                        _this.space = false;
                    },5000)
                }
            }
        }
    }
</script>
<style lang = "scss">
    .enquiries {
        margin : 30px 0 20px 0;

        &__filter {
            margin-bottom : 90px;
        }

        &__search {
            width: 100%;
            margin: 25px 0;
            position: relative;

            @include tablet-big {
                width : 50%;
            }
        }

        &__date {
            margin-bottom : 25px;

            &-wrapper {
                display        : flex;
                flex-wrap      : wrap;
                flex-direction : column;

                @include tablet-big {
                    flex-direction : row;
                }
            }

            &-item {
                margin-bottom : 15px;

                &:nth-last-child(2){
                    @include tablet-big {
                        margin-right : 20px;
                    }
                }
            }

            &-main {
                display        : flex;
                flex-direction : column;
                align-items    : flex-start;

                @include phone-big {
                    flex-direction : row;
                }
            }

            &-title {
                color         : $color-curious-blue;
                font-weight   : 600;
                margin-bottom : 15px;
            }

            &-field {
                display        : flex;
                margin-bottom  : 5px;
                flex-direction : column;

                &:first-child {
                    @include phone-big {
                        margin-right : 15px;
                    }
                }
            }

            &-input {
                margin-top : 6px;
            }
        }

        &__submit {
            .link {
                margin-bottom : 20px;
                @include tablet {
                    margin-bottom : 0;
                }
            }
        }
        &__label-hidden{
            visibility: hidden;
        }
        &__warning{
            position: absolute;
            bottom: -26px;
            left: 0;
        }
    }

    .table__header-item_id,
    .table__header-item_status,
    .table__header-item_enquiry-date,
    .table__header-item_last-contact {
        position : relative;

        &:after {
            $size : 20px;
            top              : 0;
            right            : 5px;
            width            : $size;
            height           : $size;
            margin           : auto;
            bottom           : 0;
            content          : "";
            display          : block;
            position         : absolute;
            pointer-events   : none;
            background-image : url("~static/images/icons/arrow-down.svg");
        }

        @include desktop{
            &:after {
                right: 16px;
            }
        }
    }
</style>