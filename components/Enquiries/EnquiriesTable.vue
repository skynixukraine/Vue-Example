<template>
	<div class = "table">
		<div class = "table__info">
			<div class = "table__info-count">
                {{doctorEnquiresMeta.from}}-{{doctorEnquiresMeta.to}} from {{doctorEnquiresMeta.total}}
			</div>
			<div class = "table__info-nav">
				<div class = "table__info-link table__info-prev" @click="prev"></div>
				<div class = "table__info-link table__info-next" @click="next"></div>
			</div>
		</div>
		<div class = "table__content">
			<div class = "table__header">
				<div class = "table__header-item table__header-item_id">Enquiry<br class = "table__br"> ID</div>
				<div class = "table__header-item">First<br class = "table__br"> Name</div>
				<div class = "table__header-item">Last<br class = "table__br"> Name</div>
				<div class = "table__header-item table__header-item_enquiry-date">Enquiry<br class = "table__br"> Date</div>
				<div class = "table__header-item table__header-item_last-contact">Last<br class = "table__br"> Contact</div>
				<div class = "table__header-item table__header-item_status">Status</div>
			</div>
			<div class = "table__main">

				<NuxtLink :to="$routes" class = "table__main-items" v-for = "(enquire, index) in doctorEnquiresData" :key = "index">
					<div class = "table__main-item" data-title="Enquiry ID">{{enquire.id}}</div>
					<div class = "table__main-item" data-title="First Name">{{enquire.first_name}}</div>
					<div class = "table__main-item" data-title="Last Name">{{enquire.last_name}}</div>
					<div class = "table__main-item" data-title="Enquiry Date">{{enquire.created_at.date}} </div>
					<div class = "table__main-item" data-title="Last Contact">{{enquire.last_contacted_at}} </div>
					<div class = "table__main-item" data-title="Status"><select2 /></div>
				</NuxtLink>


			</div>
		</div>
	</div>
</template>

<script>
    import select2 from "~/components/select2/select2.vue"
    import {requestParams} from "~/components/Enquiries/Enquiries.vue"

    export default {
        components : {
            select2

        },
        computed   : {
            doctorEnquiresData() {
                return this.$store.state.doctors.doctorEnquires.data;
            },
            doctorEnquiresLinks() {
                return this.$store.state.doctors.doctorEnquires.links;
            },

            doctorEnquiresMeta() {
                return this.$store.state.doctors.doctorEnquires.meta;
            },
        },
        methods  : {
            next() {

                var page = this.doctorEnquiresMeta.current_page;

                if (page < this.doctorEnquiresMeta.last_page) {
                    page = page + 1
                }

                this.$store.dispatch('doctors/LOAD_AND_SAVE_DOCTOR_ENQUIRES', {
                    token       : this.$cookies.get(this.$cookie.names.token),
                    doctor_id   : this.$store.state.user.user.id,
                    requestData : { page: page }
                })
            },

            prev() {

                var page = this.doctorEnquiresMeta.current_page;

                if (page > 1) {
                    page = page - 1
                }

                this.$store.dispatch('doctors/LOAD_AND_SAVE_DOCTOR_ENQUIRES', {
                    token       : this.$cookies.get(this.$cookie.names.token),
                    doctor_id   : this.$store.state.user.user.id,
                    requestData : { page: page }
                })
            },
        }
    }


</script>
<style lang="scss" scoped>

	@include tablet-big-min--big {
		.table{
			&__header {
				display: none;
				position: relative;
				padding-bottom: 10px;
			}
			&__main-item:not(:last-child) {
				border-bottom: 1px solid #f3f3f3;
			}
			&__main-items {
				min-height: 112px;
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
					right: 0;
					width: 100%;
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

