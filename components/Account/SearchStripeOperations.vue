<template>
    <div class="enquiries__filter">
        <form>
            <div class="enquiries__search">
                <input type="search"
                       placeholder="Suchen..."
                       class="input enquiries__search-input"
                       @change="querySearch"
                       @search="querySearch('clean')"
                       v-model="search"
                >
            </div>

            <div class="enquiries__submit">
                <button class="link link--button link--button-blue link--button-gradient"
                        type="button"
                        @click.stop="resetResults"
                >
                   Zurücksetzen
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: ''
            }
        },
        methods :{
            querySearch(e){
                if(e === 'clean'){
                    this.search = '';
                }

                this.$emit('search', this.search);
            },
            resetResults(){
                this.querySearch('clean');
            }
        }
    }
</script>
<style lang = "scss">
    .enquiries {
        margin : 30px 0 20px 0;



        &__search {
            width: 100%;
            margin: 25px 0;
            position: relative;

            @include tablet-big {
                width : 50%;
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

    }

</style>