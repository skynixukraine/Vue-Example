<template>
	<div class = "table__content">
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
					:class = "[sortingName === 'last_contacted_at' ? query.direction : '']"
					@click = "sort('last_contacted_at')">{{ $t("page-enquiries.table.date-of-last-contact") }}
			</div>
			<div
					class = "table__header-item table__header-item_status"
					:class = "[sortingName === 'status' ? query.direction : '']"
					@click = "sort('status')">{{ $t("page-enquiries.table.status") }}
			</div>
		</div>
		<div class = "table__main">
			
			<NuxtLink class = "table__main-items"
					  v-for = "(enquire, index) in doctorEnquiresData"
					  :key = "index"
					  :to = "routes(enquire.id)">
				<div class = "table__main-item" data-title = "Anfrage ID">{{enquire.id}}</div>
				<div class = "table__main-item" data-title = "Vorname">{{enquire.first_name}}</div>
				<div class = "table__main-item" data-title = "Nachname">{{enquire.last_name}}</div>
				<div class = "table__main-item" data-title = "Anfragedatum">{{enquire.created_at.date | dateFormat}}
				</div>
				<div class = "table__main-item" data-title = "Letzter Kontakt">{{enquire.last_contacted_at}}</div>
				<div class = "table__main-item" data-title = "Status">{{enquire.status}}</div>
			</NuxtLink>
		
		
		</div>
	</div>
</template>

<script>
    export default {

        data(){
            return {
                query       : {
                    direction : 'desc'
                },
                sortingName : "id",
            }
        },
        computed : {
            doctorEnquiresData(){
                return this.$store.state.doctors.doctorEnquires.data;
            },
        },
        filters  : {
            dateFormat(val){  //dd/mm/yyyy hh:mm
                let _date = new Date(val).toJSON();

                return _date.slice(8, 10) + '/' + _date.slice(5, 7) + '/' + _date.slice(0, 4) + ' ' + _date.slice(11, 16);
            }
        },
        methods  : {
            routes(id){
                return this.$routes.enquiries.path + '/' + id;
            },
            sort(column){
                if(this.$parent.requestParams.order_field == column){
                    let direction                              = this.$parent.requestParams.order_direction;
                    this.$parent.requestParams.order_direction = direction === "desc" ? "asc" : "desc";
                } else{
                    this.$parent.requestParams.order_field     = column;
                    this.$parent.requestParams.order_direction = "desc";
                }
                this.$store.dispatch('doctors/LOAD_AND_SAVE_DOCTOR_ENQUIRES', {
                    token       : this.$cookies.get(this.$cookie.names.token),
                    doctor_id   : this.$store.state.user.user.id,
                    requestData : this.$parent.requestParams
                });
                this.sortingName     = column;
                this.query.direction = this.$parent.requestParams.order_direction;
            }
        },
    }


</script>
<style lang = "scss" scoped>
	
	@include tablet-big-min--big {
		.table {
			&__header {
				display        : none;
				position       : relative;
				padding-bottom : 10px;
			}
			&__main-item:not(:last-child) {
				border-bottom : 1px solid #F3F3F3;
			}
			&__main-items {
				min-height            : 112px;
				color                 : #7A7D84;
				display               : flex;
				position              : relative;
				padding-top           : 10px;
				border-radius         : 4px;
				padding-bottom        : 10px;
				-webkit-box-orient    : vertical;
				-webkit-box-direction : normal;
				flex-direction        : column;
				
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

