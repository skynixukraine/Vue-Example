<template>
	<div class = "table">
		<div class = "table__info">
			<div class = "table__info-count">
				1-50 from 120
			</div>
			<div class = "table__info-nav">
				<NuxtLink class = "table__info-link table__info-prev" to = "/"></NuxtLink>
				<NuxtLink class = "table__info-link table__info-next" to = "/"></NuxtLink>
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
				<NuxtLink :to="$routes" class = "table__main-items">
					<div class = "table__main-item" data-title="Enquiry ID">1</div>
					<div class = "table__main-item" data-title="First Name">Doe</div>
					<div class = "table__main-item" data-title="Last Name">Jane</div>
					<div class = "table__main-item" data-title="Enquiry Date">dd/mm/yyyy hh:mm </div>
					<div class = "table__main-item" data-title="Last Contact">dd/mm/yyyy hh:mm </div>
					<div class = "table__main-item" data-title="Status"><select2 /></div>
				</NuxtLink>
				<NuxtLink :to="$routes" class = "table__main-items">
					<div class = "table__main-item" data-title="Enquiry ID">2</div>
					<div class = "table__main-item" data-title="First Name">Doe</div>
					<div class = "table__main-item" data-title="Last Name">Jane</div>
					<div class = "table__main-item" data-title="Enquiry Date">dd/mm/yyyy hh:mm</div>
					<div class = "table__main-item" data-title="Last Contact">dd/mm/yyyy hh:mm</div>
					<div class = "table__main-item" data-title="Status"><select2 /></div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script>
    import select2 from "~/components/select2/select2.vue"
    export default {
        components : {
            select2,
        },
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

