<template>
    <div class = "page">
        <div class = "section">
            <div class = "container">
                <h1>Hautarzt</h1>
                <div class = "filters" ref = "filterContainer">
                    <label class = "filters__item">
                        <div class = "filters__item__title">Region</div>
                        <select class = "filters__item__select"
                                name = "region"
                                @change = "onChangeFilter">
                            <option value = "-1">All</option>
                            <option v-for = "(regionItem) in regionsList"
                                    :key = "'region_' + regionItem.id"
                                    :value = "regionItem.id">
                                {{regionItem.name}}
                            </option>
                        </select>
                    </label>
                    <label class = "filters__item">
                        <div class = "filters__item__title">Specialization</div>
                        <select class = "filters__item__select"
                                name = "specialization"
                                @change = "onChangeFilter">
                            <option value = "-1">All</option>
                            <option v-for = "specializationItem in specializationsList"
                                    :key = "'specialization_' + specializationItem.id"
                                    :value = "specializationItem.id">
                                {{specializationItem.name}}
                            </option>
                        </select>
                    </label>
                </div>
                <div class = "doctors">
                    <div class = "doctors__item"
                         v-for = "(doctor, index) in filteredDoctors.slice(pageNumber * ITEMS_PER_PAGE, pageNumber * ITEMS_PER_PAGE + ITEMS_PER_PAGE)"
                         :key = "'doctor_' + index">
                        <DoctorCard :doctor = "doctor" :isPreview = true />
                    </div>
                </div>
                <div class = "pagination"
                     v-html = "paginationHTML"
                     @click.stop = "onClickPagination"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import DoctorCard from "~/components/Cards/DoctorCard"

    export default {
        async fetch({app, store, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null){
                await store.dispatch('user/LOAD_USER', {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token)
                    app.$cookies.remove(app.cookie.names.tokenId)
                })
            }

            // Load content
            await store.dispatch("regions/LOAD_REGIONS")
            await store.dispatch("specializations/LOAD_SPECIALIZATIONS")
            await store.dispatch("doctors/LOAD_AND_SAVE_ALL_DOCTORS")
        },
        components : {
            DoctorCard
        },
        data(){
            return {
                pageNumber      : null,
                ITEMS_PER_PAGE  : 16,
                selectedFilters : {
                    region         : -1,
                    specialization : -1
                }
            }
        },
        computed   : {
            regionsList(){
                return this.$store.state.regions.regions;
            },
            specializationsList(){
                return this.$store.state.specializations.specializations;
            },
            doctors(){
                return this.$store.state.doctors.doctors;
            },
            filteredDoctors(){
                if(this.selectedFilters.region < 0 && this.selectedFilters.specialization < 0){ return this.doctors }

                let result = []

                for(let i = 0; i < this.doctors.length; i++){
                    if(this.selectedFilters.region > -1 && this.selectedFilters.specialization > -1){
                        if(this.doctors[i].region && this.doctors[i].region.id === this.selectedFilters.region && this.doctors[i].specialization && this.doctors[i].specialization.id === this.selectedFilters.specialization){
                            result.push(this.doctors[i])
                        }
                    } else{
                        if(this.doctors[i].region && this.doctors[i].region.id === this.selectedFilters.region){
                            result.push(this.doctors[i])
                            continue
                        }

                        if(this.doctors[i].specialization && this.doctors[i].specialization.id === this.selectedFilters.specialization){
                            result.push(this.doctors[i])
                        }
                    }
                }

                return result
            },
            paginationHTML(){
                const countButtons = Math.ceil(this.filteredDoctors.length / this.ITEMS_PER_PAGE)

                if(countButtons < 2){ return "" }

                let result = ""

                for(let i = 0; i < countButtons; i++){
                    result += `<button type="button" class="pagination__item link--button link--button-white ${this.pageNumber === i ? 'active' : ''}" value="${i}">${i + 1}</button>`
                }

                return result
            }
        },
        created(){
            this.pageNumber = this.$route.params.page ? (this.$route.params.page + "").replace(/[^0-9]/g, "") : 0
        },
        methods    : {
            onChangeFilter(event){
                this.selectedFilters[event.target.name] = +event.target.value
            },
            onClickPagination(event){
                if(event.target.value !== undefined && +event.target.value !== this.pageNumber){
                    window.scrollTo({
                        top      : +this.$refs.filterContainer.pageY,
                        behavior : "smooth"
                    })

                    this.pageNumber = +event.target.value
                }
            }
        }
    }
</script>

<style lang = "scss">
    $offset : 20px;

    .filters {
        margin          : 0 #{-$offset};
        display         : flex;
        flex-wrap       : wrap;
        max-width       : 100%;
        justify-content : flex-start;

        &__item {
            $bottom_padding : 5px;
            color       : #7A7D84;
            margin      : 0 $offset $offset / 2;
            position    : relative;
            font-size   : 18px;
            max-width   : 100%;
            font-style  : normal;
            font-weight : 500;
            line-height : 28px;

            &__title { margin-bottom : 4px; }

            &__select {
                border             : 1px solid #E0E1E3;
                padding            : 8px $offset * 2 $bottom_padding $offset;
                position           : relative;
                font-size          : 18px;
                max-width          : 100%;
                background         : #FFF;
                box-sizing         : border-box;
                font-style         : normal;
                font-weight        : 500;
                line-height        : 28px;
                border-radius      : 4px;
                -moz-appearance    : none;
                -webkit-appearance : none;
            }

            &:after {
                $size : 20px;
                bottom           : calc(.5em + #{$bottom_padding / 2});
                right            : $offset / 2;
                width            : $size;
                height           : $size;
                content          : "";
                display          : block;
                position         : absolute;
                pointer-events   : none;
                background-image : url("~static/images/icons/arrow-down.svg");
            }
        }
    }

    .doctors {
        margin           : $offset #{$offset / -2} 0;
        display          : flex;
        flex-wrap        : wrap;
        justify-content  : space-around;

        &__item {
            width          : 100%;
            margin         : 0 $offset / 2 $offset;
            display        : flex;
            flex-direction : column;

            @include tablet {
                flex: 0 1 calc(50% - #{$offset});
            }

            @include tablet-big {
                flex: 0 1 calc(100% / 3 - #{$offset});
            }

            @include desktop {
                flex: 0 1 calc(25% - #{$offset});
            }
        }
    }

    .pagination {
        display         : flex;
        flex-wrap       : wrap;
        margin-top      : $offset;
        justify-content : center;

        &__item {
            margin     : $offset / 8 $offset / 4;
            padding    : $offset / 2 $offset / 1.4 $offset / 2.5;
            transition : $transition;

            @include tablet {
                padding : 20px 31px 16px;
            }

            &.active {
                color            : white;
                background-color : $color-tory-blue;
            }
        }
    }
</style>