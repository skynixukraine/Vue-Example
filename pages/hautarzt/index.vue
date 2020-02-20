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
						 v-for = "doctor in doctors"
						 :key = "'doctor_' + doctor.id">
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
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);
                })
            }

            // Load content
            await store.dispatch("regions/LOAD_REGIONS");
            await store.dispatch("specializations/LOAD_SPECIALIZATIONS");
            await store.dispatch("doctors/LOAD_AND_SAVE_FILTERED_DOCTORS", {per_page : store.state.doctors.MAX_DOCTORS_PER_PAGE});
        },
        components : {
            DoctorCard
        },
        data(){
            return {
                pageNumber      : null,
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
                return this.$store.state.doctors.doctorsFiltered;
            },
            paginationHTML(){
                const TOTAL_PAGES = Math.ceil(this.$store.state.doctors.doctorsFilteredTotalCount / this.$store.state.doctors.MAX_DOCTORS_PER_PAGE);

                if(TOTAL_PAGES < 2){ return ""; }

                const COUNT_BUTTONS = 3;
                const HALF          = Math.ceil(COUNT_BUTTONS / 2);

                const POINTS_CLASS_NAME = "pagination__item--points";
                const BTN_CLASS_NAME    = "pagination__item link--button link--button-white";
                
                // Вся логика работает нормально, кроме этого случая
				const TROUBLE_TOTAL_PAGES = 5;

                let result = "";

                result += `<button type="button" class="${BTN_CLASS_NAME} ${this.pageNumber <= 1 ? 'active' : ''}" value="1">1</button>`;

                if(this.pageNumber - COUNT_BUTTONS > 0 && TOTAL_PAGES / (COUNT_BUTTONS + 2) > 1){
                    result += `<div class="${POINTS_CLASS_NAME}"><span>...</span></div>`;
                }

                // Определяем с какого номера начать нумерацию
                let innerPageNumber = 0;
                if(this.pageNumber - HALF <= 0){
                    innerPageNumber = HALF - 1;
                } else{
                    if(this.pageNumber + HALF > TOTAL_PAGES){
                        innerPageNumber = TOTAL_PAGES > TROUBLE_TOTAL_PAGES ? TOTAL_PAGES - COUNT_BUTTONS + 1 : TOTAL_PAGES - COUNT_BUTTONS;
                    } else{
                        innerPageNumber = this.pageNumber - HALF + 1;
                    }
                }

                // Основные кнопки пагинации
                let countToBreak = 0;
                do{
                    if(innerPageNumber > 1 && innerPageNumber < TOTAL_PAGES){
                        result += `<button type="button" class="${BTN_CLASS_NAME} ${this.pageNumber === innerPageNumber ? 'active' : ''}" value="${innerPageNumber}">${innerPageNumber}</button>`;
                    }
                } while(++countToBreak < COUNT_BUTTONS && innerPageNumber++ < TOTAL_PAGES - 1);

				if(TOTAL_PAGES === TROUBLE_TOTAL_PAGES && this.pageNumber < TROUBLE_TOTAL_PAGES - HALF){
                    result += `<button type="button" class="${BTN_CLASS_NAME} ${this.pageNumber === TROUBLE_TOTAL_PAGES - 1 ? 'active' : ''}" value="${TROUBLE_TOTAL_PAGES - 1}">${TROUBLE_TOTAL_PAGES - 1}</button>`;
				}
                
                if(this.pageNumber + HALF < TOTAL_PAGES && TOTAL_PAGES / (COUNT_BUTTONS + 2) > 1){
                    result += `<div class="${POINTS_CLASS_NAME}"><span>...</span></div>`;
                }

                result += `<button type="button" class="${BTN_CLASS_NAME} ${TOTAL_PAGES === this.pageNumber ? 'active' : ''}" value="${TOTAL_PAGES}">${TOTAL_PAGES}</button>`;

                return result;
            }
        },
        created(){
            this.pageNumber = this.$route.params.page ? (this.$route.params.page + "").replace(/[^0-9]/g, "") : 1;
        },
        methods    : {
            onChangeFilter(event){
                this.selectedFilters[event.target.name] = +event.target.value;
                this.pageNumber                         = 1;
                this.loadDoctors();
            },
            onClickPagination(event){
                if(event.target.value !== undefined && +event.target.value !== this.pageNumber){
                    window.scrollTo({
                        top      : +this.$refs.filterContainer.pageY,
                        behavior : "smooth"
                    });

                    this.pageNumber = +event.target.value;
                    this.loadDoctors();
                }
            },
            loadDoctors(){
                let requestFiltersParams = {};

                if(this.selectedFilters.region > -1){
                    requestFiltersParams.region_id = this.selectedFilters.region;
                }

                if(this.selectedFilters.specialization > -1){
                    requestFiltersParams.specialization_id = this.selectedFilters.specialization;
                }

                requestFiltersParams.page = this.pageNumber;

                this.$store.dispatch("doctors/LOAD_AND_SAVE_FILTERED_DOCTORS", requestFiltersParams)
            }
        }
    }
</script>

<style lang = "scss">
	
	.filters {
		margin          : 0 #{-$main_offset};
		display         : flex;
		flex-wrap       : wrap;
		max-width       : 100%;
		justify-content : flex-start;
		
		&__item {
			$bottom_padding : 5px;
			color       : $color-rolling-stone;
			margin      : 0 $main_offset $main_offset / 2;
			position    : relative;
			font-size   : 18px;
			max-width   : 100%;
			font-style  : normal;
			font-weight : 500;
			line-height : 28px;
			
			&__title { margin-bottom : 4px; }
			
			&__select {
				border             : 1px solid #E0E1E3;
				padding            : 8px $main_offset * 2 $bottom_padding $main_offset;
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
				right            : $main_offset / 2;
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
		margin          : $main_offset #{$main_offset / -2} 0;
		display         : flex;
		flex-wrap       : wrap;
		justify-content : space-around;
		
		&__item {
			width          : 100%;
			margin         : 0 $main_offset / 2 $main_offset;
			display        : flex;
			flex-direction : column;
			
			@include tablet {
				flex : 0 1 calc(50% - #{$main_offset});
			}
			
			@include tablet-big {
				flex : 0 1 calc(100% / 3 - #{$main_offset});
			}
			
			@include desktop {
				flex      : 0 1 calc(25% - #{$main_offset});
				min-width : calc(25% - #{$main_offset});
			}
		}
	}
	
	.pagination {
		margin          : $main_offset #{-$main_offset} 0;
		display         : flex;
		flex-wrap       : wrap;
		justify-content : center;
		
		&__item {
			$margin : $main_offset / 8 $main_offset / 4;
			
			margin     : $margin;
			padding    : $main_offset / 2 $main_offset / 1.4 $main_offset / 2.5;
			min-width  : auto;
			transition : $transition;
			
			@include tablet {
				padding : $main_offset 31px 16px;
			}
			
			&--points {
				cursor          : default;
				display         : flex;
				flex-direction  : column;
				justify-content : flex-end;
				
				@include tablet {
					margin      : $margin;
					font-size   : 2em;
					line-height : 1;
				}
			}
			
			&.active {
				color            : white;
				cursor           : not-allowed;
				background-color : $color-tory-blue;
			}
		}
	}
</style>