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
                        placeholder = "Search"
                        class = "input enquiries__search-input">
				</div>
				<div class = "enquiries__date">
					<h3>Filter by:</h3>
					<div class = "enquiries__date-wrapper">
						<div class = "enquiries__date-item">
							<span class = "enquiries__date-title">Enquiry date</span>
							<div class = "enquiries__date-main">
								<label class = "enquiries__date-field">
									from:
									<input
                                        type = "date"
                                        name = "created_at_from"
                                        ref = "created_at_from"
                                        v-model = "models.created_at_from"
                                        class = "enquiries__date-input input">
								</label>
								<label class = "enquiries__date-field">
									to:
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
							<span class = "enquiries__date-title">Last contact date</span>
							<div class = "enquiries__date-main">
								<label class = "enquiries__date-field">
									from:
									<input
                                        type = "date"
                                        name = "last_contact_from"
                                        ref = "last_contact_from"
                                        v-model = "models.last_contact_from"
                                        class = "enquiries__date-input input">
								</label>
								<label class = "enquiries__date-field">
									to:
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
					<button class = "link link--button link--button-blue link--button-gradient" type = "submit" >Search
					</button>
					<button class = "link link--button link--button-blue link--button-gradient" type = "reset">Reset
					</button>
				</div>
			</form>
		</div>
		<div class = "enquiries__main">
			<div class = "table">
                <div class = "table__info" v-if="doctorEnquiresMeta.total > 0">
                    <div class = "table__info-count">
                        {{doctorEnquiresMeta.from}}-{{doctorEnquiresMeta.to}} from {{doctorEnquiresMeta.total}}
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

			    <Table />
			</div>
		</div>
	</div>
</template>

<script>
    import Table from "~/components/Enquiries/EnquiriesTable.vue"
    import modal from '~/mixins/modal'

    export default {
        mixins : [
            modal,
        ],

        components : {
            Table,
        },
        data(){
            return {
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
        methods  : {
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

        &.desc{
            &:after {
                transform: rotate(180deg);
            }
        }
	}
</style>
