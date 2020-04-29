<template lang = "html">
	<div class = "enquiries">
		<div class = "enquiries__filter">
			<form @submit.prevent = "onSubmit" @reset.prevent="onReset">
				<div class = "enquiries__search">
					<input
                        type = "search"
                        name = "search"
                        ref = "search"
                        v-model = "models.search"
                        placeholder = "Suche..."
                        class = "input enquiries__search-input">
				</div>
				<div class = "enquiries__date">
					<h3>{{ $t("page-enquiries.filter") }}</h3>
					<div class = "enquiries__date-wrapper">
						<div class = "enquiries__date-item">
							<span class = "enquiries__date-title">{{ $t("page-enquiries.date-of-the-request") }}</span>
							<div class = "enquiries__date-main">
								<label class = "enquiries__date-field">
									{{ $t("page-enquiries.from") }}
									<input
                                        type = "date"
                                        name = "created_at_from"
                                        ref = "created_at_from"
                                        v-model = "models.created_at_from"
                                        class = "enquiries__date-input input">
								</label>
								<label class = "enquiries__date-field">
									{{ $t("page-enquiries.to") }}
									<input
                                        type = "date"
                                        name = "created_at_to"
                                        ref = "created_at_to"
                                        v-model = "models.created_at_to"
                                        class = "enquiries__date-input input">
								</label>
							</div>
						</div>
						<div class = "enquiries__date-item">
							<span class = "enquiries__date-title">{{ $t("page-enquiries.date-of-last-contact") }}</span>
							<div class = "enquiries__date-main">
								<label class = "enquiries__date-field">
									{{ $t("page-enquiries.from") }}
									<input
                                        type = "date"
                                        name = "last_contact_from"
                                        ref = "last_contact_from"
                                        v-model = "models.last_contact_from"
                                        class = "enquiries__date-input input">
								</label>
								<label class = "enquiries__date-field">
									{{ $t("page-enquiries.to") }}
									<input
                                        type = "date"
                                        name = "last_contact_to"
                                        ref = "last_contact_to"
                                        v-model = "models.last_contact_to"
                                        class = "enquiries__date-input input">
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class = "enquiries__submit">
					<button class = "link link--button link--button-blue link--button-gradient" type = "submit" >{{ $t("page-enquiries.search") }}
					</button>
					<button class = "link link--button link--button-blue link--button-gradient" type = "reset">{{ $t("page-enquiries.reset") }}
					</button>
				</div>
			</form>
		</div>
		<div class = "enquiries__main">
			<div class = "table">
                <div class = "table__info" v-if="doctorEnquiresMeta.total > 0">
                    <div class = "table__info-count">
                        {{doctorEnquiresMeta.from}}-{{doctorEnquiresMeta.to}} {{ $t("page-enquiries.from") }} {{doctorEnquiresMeta.total}}
                    </div>
                    <div class = "table__info-nav">
                        <div
                        class = "table__info-link table__info-prev"
                        :class="[doctorEnquiresMeta.current_page === 1 ? 'disabled' : '']"
                        @click="prev"></div>

                        <div
                        class = "table__info-link table__info-next"
                        :class="[doctorEnquiresMeta.current_page === doctorEnquiresMeta.last_page ? 'disabled' : '']"
                        @click="next"></div>
                    </div>
                </div>
				<div class = "table__content table--enquirie">
					<div class = "table__header">
						<div class = "table__header-item table__header-item_id"
							 :class = "[sortingName === 'id' ? query.direction : '']"
							 @click = "sort('id')">{{ $t("page-enquiries.table.enquiry-id") }}
						</div>
						<div class = "table__header-item">{{ $t("page-enquiries.table.first-name") }}</div>
						<div class = "table__header-item">{{ $t("page-enquiries.table.last-name") }}</div>
						<div
								class = "table__header-item table__header-item_enquiry-date"
								:class = "[sortingName === 'created_at' ? query.direction : '']"
								@click = "sort('created_at')">{{ $t("page-enquiries.table.date-of-the-request") }}
						</div>
						<div
								class = "table__header-item table__header-item_last-contact"
								:class = "[sortingName === 'conclusion_created_at' ? query.direction : '']"
								@click = "sort('conclusion_created_at')">{{ $t("page-enquiries.table.date-of-last-contact") }}
						</div>
						<div
								class = "table__header-item table__header-item_status"
								:class = "[sortingName === 'status' ? query.direction : '']"
								@click = "sort('status')">{{ $t("page-enquiries.table.status") }}
						</div>
					</div>
					<div class = "table__main">
						
						<NuxtLink class = "table__main-items main-items--enquirie"
								  v-for = "(enquire, index) in data"
								  :key = "index"
								  :to = "routes(enquire.id)">
							<div class = "table__main-item" data-title = "Anfrage ID">{{enquire.id}}</div>
							<div class = "table__main-item" data-title = "Vorname">{{enquire.first_name}}</div>
							<div class = "table__main-item" data-title = "Nachname">{{enquire.last_name}}</div>
							<div class = "table__main-item" data-title = "Anfragedatum">{{enquire.created_at.date | dateFormat}}
							</div>
							<div class = "table__main-item" data-title = "Letzter Kontakt">{{enquire.conclusion_created_at ? enquire.conclusion_created_at.date : null | dateFormat}}</div>
							<div class = "table__main-item" data-title = "Status">{{enquire.status}}</div>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import modal from '~/mixins/modal'

    export default {
        mixins : [
            modal,
        ],
        data(){
            return {
                data: "",
                query       : {
                    direction : 'desc'
                },
                sortingName : "id",
                models        : {
                    search             : "",
                    created_at_from    : "",
                    created_at_to      : "",
                    last_contact_from  : "",
                    last_contact_to    : "",
                },
                isFormSending : false,
                requestParams : {
                    per_page          : this.$store.state.doctors.MAX_DOCTOR_ENQUIRES_PER_PAGE,
                    search            : "",
                    created_at_from   : "",
                    created_at_to     : "",
                    last_contact_from : "",
                    last_contact_to   : "",
                    page              : 1,
                    order_field       : "id",
                    order_direction   : "desc"
                }
            };
        },
        computed   : {
            doctorEnquiresMeta() {
                return this.$store.state.doctors.doctorEnquires.meta;
            },
        },
		mounted() {
            this.sendRequest();
		},
        filters  : {
            dateFormat(val){  //dd/mm/yyyy hh:mm
                if (!val) {
                    return val;
                }

                let _date = new Date(val).toJSON();

                return _date.slice(8, 10) + '/' + _date.slice(5, 7) + '/' + _date.slice(0, 4) + ' ' + _date.slice(11, 16);
            }
        },
        methods  : {
            routes(id){
                return this.$routes.enquiries.path + '/' + id;
            },
            sort(column){
                if(this.requestParams.order_field == column){
                    let direction                              = this.requestParams.order_direction;
                    this.requestParams.order_direction = direction === "desc" ? "asc" : "desc";
                } else{
                    this.requestParams.order_field     = column;
                    this.requestParams.order_direction = "desc";
                }
                this.sendRequest();
                this.sortingName     = column;
                this.query.direction = this.requestParams.order_direction;
            },
            onSubmit(){
                this.requestParams = this.prepareDataForSending(this.models, this.requestParams);

                this.sendRequest();

            },
            onReset(){

                this.models = this.setToDefaultModel(this.models);
                this.requestParams = this.prepareDataForSending(this.models, this.requestParams);

                this.sendRequest();

            },
            prepareDataForSending(models, requestParams){

                // optional fields
                requestParams.search = models.search;
                requestParams.created_at_from = models.created_at_from;
                requestParams.created_at_to = models.created_at_to;
                requestParams.last_contact_from = models.last_contact_from;
                requestParams.last_contact_to = models.last_contact_to;
                requestParams.page = 1;

                return requestParams;
            },
            next() {

                this.requestParams.page = this.doctorEnquiresMeta.current_page;

                if (this.requestParams.page < this.doctorEnquiresMeta.last_page) {
                    this.requestParams.page += 1;
                }

                this.sendRequest();
            },
            prev() {

                this.requestParams.page = this.doctorEnquiresMeta.current_page;

                if (this.requestParams.page > 1) {
                    this.requestParams.page -= 1;
                }

                this.sendRequest();

            },
            sendRequest() {
                this.$store.dispatch('doctors/LOAD_AND_SAVE_DOCTOR_ENQUIRES', {
                    token       : this.$cookies.get(this.$cookie.names.token),
                    doctor_id   : this.$store.state.user.user.id,
                    requestData : this.requestParams
                }).then((resolve)=>{
                    this.data = resolve.data.data
				})
            },
            setToDefaultModel(models) {
                models.search = "";
                models.created_at_from = "";
                models.created_at_to = "";
                models.last_contact_from = "";
                models.last_contact_to = "";
                return models;
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
			width         : 100%;
			margin-bottom : 25px;
			
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
				
				&:first-child {
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
				min-width: 150px;
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

    .table__info-prev,
    .table__info-next {
        cursor: pointer;

        &.disabled{
            &:after {
                background-image: url("~static/images/icons/arrow-down-disabled.svg");
            }
        }
    }

	.table__header-item_id,
	.table__header-item_status,
	.table__header-item_enquiry-date,
	.table__header-item_last-contact {
		position : relative;
        cursor: pointer;
		&:after {
			$size : 20px;
			left             : 0;
			right            : 0;
			width            : $size;
			height           : $size;
			margin           : auto;
			bottom           : -10px;
			content          : "";
			display          : block;
			position         : absolute;
			pointer-events   : none;
			background-image : url("~static/images/icons/arrow-down.svg");
			@include desktop-l{
				top              : 0;
				bottom           : 0;
				left             : auto;
				right            : 5px;
			}
		}

		@include desktop{
			&:after {
				right: 16px;
			}
		}

		
        &.desc{
            &:after {
                transform: rotate(180deg);
            }
        }
	}
	
	.main-items--enquirie {
		min-height: 56px;
	}
	.main-items--enquirie:hover {
		cursor: pointer;
	}
	
	@include tablet-big-min--big {
		.table {
			&__header {
				display        : none;
				position       : relative;
				padding-bottom : 10px;
			}
			&__main-item:hover {
				background-color: #c7c7c7;
			}
			&__main-item:not(:last-child) {
				border-bottom : 1px solid #F3F3F3;
			}
			&__main-items {
				min-height: 56px;
				color: #7a7d84;
				display: flex;
				position: relative;
				padding-top: 10px;
				border-radius: 4px;
				padding-bottom: 10px;
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				flex-direction: column;
				&:after {
					right : 0;
					width : 100%;
				}
			}
			&__main-item {
				position     : relative;
				flex-basis   : 25%;
				padding-left : 50%;
				
				&:before {
					top           : 0;
					left          : 6px;
					width         : 45%;
					color         : $color-curious-blue;
					display       : block;
					content       : attr(data-title);
					position      : absolute;
					white-space   : nowrap;
					padding-right : 10px;
				}
			}
			
		}
		
	}
</style>
