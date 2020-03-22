<template>
    <div class = "table">
        <div class = "table__info">
            <div class = "table__info-count">
                1-50 from 120
                <!--{{meta.total}}-->
            </div>
            <div class = "table__info-nav">
                <NuxtLink class = "table__info-link table__info-prev" to = "/"></NuxtLink>
                <NuxtLink class = "table__info-link table__info-next" to = "/"></NuxtLink>
            </div>
        </div>
        <div class = "table__content">
            <div class = "table__header">
                <div class = "table__header-item">Transaction<br class = "table__br"> ID</div>
                <div class = "table__header-item table__header-item--date"
                     :class="[ sortingName === 'date' ? query.direction : '' ]"
                     @click.stop = "sortingData('date')"
                >
                    Date
                </div>
                <div class = "table__header-item table__header-item--enquiry"
                     :class="[ sortingName === 'enquiryID' ? query.direction : '' ]"
                     @click.stop = "sortingData('enquiryID')">
                    Enquiry<br class = "table__br"> ID
                </div>
                <div class = "table__header-item">Patient's<br class = "table__br"> full name</div>
                <div class = "table__header-item">Amount</div>
                <div class = "table__header-item table__header-item--status"
                     :class="[ sortingName === 'status' ? query.direction : '' ]"
                     @click.stop = "sortingData('status')">
                    Status
                </div>
            </div>
            <div class = "table__main-items table__main-items--billing" v-for="(item, index) in data" :key="'billing2-' + index">
                <div class = "table__main-item" data-title="Transaction ID">{{item.id}}</div>
                <div class = "table__main-item" data-title="Date">{{item.enquire.created_at.date | dateFormat}}</div>
                <div class = "table__main-item" data-title="Enquiry ID">{{item.enquire.id}}</div>
                <div class = "table__main-item table__main-item--full-name" data-title="Patient's full name">
                    {{item.enquire.first_name}} {{item.enquire.last_name}}
                </div>
                <div class = "table__main-item" data-title="Amount">
                    <span class = "table__currency" >{{item.currency}}</span> {{item.amount}}</div>
                <div class = "table__main-item" data-title="Status">{{item.enquire.status}}</div>
            </div>
        </div>
        <span v-if = "responseErrorMessage">{{ responseErrorMessage }}</span>
    </div>
</template>


<script>
    import UserApi from "~/services/api/User";


    export default {
        data(){
            return {
                data:null,
                links: {
                    prev: null,
                    next: null
                },
                meta: {

                },
                query:{
                    page: 1,
                    perPage: 50,
                    search: '',
                    field: null,
                    direction: null

                },
                sortingName: null,

                responseErrorMessage  : ""

            }
        },
        props:{
            querySearch:{
                type:Object,
                default(){
                    return {};
                }
            }
        },
        computed:{


        },
        watch:{
            querySearch() {
                this.query.search          = this.querySearch.search;
                this.query.enquiryID       = this.querySearch.enquiryID;
                this.query.data            = this.querySearch.data;
                this.query.dateTransaction = this.querySearch.dateTransaction;

                console.log('********************************************1', this.querySearch);

                this.requestSO();
            }

        },
        methods : {
            requestSO(search, field, direction){
                let query = {
                    page: this.query.page,
                    per_page:  this.query.perPage,
                    search : search || this.query.search,
                    order_field: field || this.query.field,
                    order_direction: direction ||  this.query.direction
                };
                console.log('2 query =', query);

                UserApi.requestStripeOperations({
                    id    : this.$store.state.user.user.id,
                    token : this.$cookies.get(this.$cookie.names.token),
                    query : query
                }).then((response) => {
                    this.data = response.data.data;
                    this.links = response.data.links;
                    this.meta = response.data.meta;

                }).catch((error) => {
                    this.responseErrorMessage = error.message;
                });
            },
            sortingData(prop){
                let _prop;

                if(prop){

                    if(this.sortingName === prop){

                        this.query.direction === 'desc'
                            ? this.query.direction = 'asc'
                            : this.query.direction = 'desc';
                    } else {
                        this.sortingName = prop;
                        this.query.direction = 'desc';
                    }

                    if(prop === 'enquiryID'){
                        this.query.field = 'enquire_id';
                        this.requestSO();

                    }
                    if(prop === 'date'){}
                    if(prop === 'status'){}
                    _prop = prop;

                } else if(this.sortingName) {
                    _prop = this.sortingName;
                } else {
                    return false;
                }

                if( this.query.direction === 'desc'){
                    this.data.sort(function (a, b) {
                        let _a=0, _b;
                        if(_prop === 'date'){
                            _a = new Date(a[_prop]).valueOf();
                            _b = new Date(b[_prop]).valueOf();
                        } else {
                            _a = a[_prop];
                            _b = b[_prop];
                        }

                        if (_a > _b) {
                            return 1;
                        }
                        if (_a < _b) {
                            return -1;
                        }
                        return 0;
                    });
                } else if(this.query.direction === 'asc'){
                    this.data.sort(function (a, b) {
                        let _a=0, _b;
                        if(_prop === 'date'){
                            _a = new Date(a[_prop]).valueOf();
                            _b = new Date(b[_prop]).valueOf();
                        } else {
                            _a = a[_prop];
                            _b = b[_prop];
                        }

                        if (_a < _b) {
                            return 1;
                        }
                        if (_a > _b) {
                            return -1;
                        }
                        return 0;
                    });
                }

            }
        },
        mounted(){
            this.requestSO();
        },
        filters:{
            dateFormat(val){  //dd/mm/yyyy hh:mm
               let _date = new Date(val).toJSON();

               return _date.slice(8,10) + '/' + _date.slice(5,7)+ '/'+ _date.slice(0,4) + ' ' + _date.slice(11,16);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .table{
        margin-top: 30px;

        &__header-item{
            &--date,
            &--enquiry,
            &--status {
                position: relative;
                cursor: pointer;

                &:after {
                    $size: 20px;
                    top: -5px;
                    right: 5px;
                    width: $size;
                    height: $size;
                    margin: auto;
                    bottom: 0;
                    content: "";
                    display: block;
                    position: absolute;
                    pointer-events: none;
                    background-image: url("~static/images/icons/arrow-down.svg");
                }

                @include desktop {

                    &:after {
                        right: 16px;
                    }
                }
            }
            &.asc{
                &:after {
                    transform: rotate(180deg);
                }
            }
        }
        &__main-items{
            cursor: default;
            &--billing{
                min-height: 50px;
            }
        }
        &__currency{
            text-transform: uppercase;
        }

        @include tablet {
            margin-top: 90px;
        }
        @include phone-big-max{
            &__main-item{

                &--full-name{
                    min-height: 43px;

                    &:before{
                        padding-top: 5px;
                        line-height: 16px;
                        white-space: pre-line;
                    }
                }
            }
        }
    }
</style>

