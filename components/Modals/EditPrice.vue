<template>
	<modal :name = "$modals.editPrice"
		   transition = "nice-modal-fade"
		   :width = "1100"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click = "closeModal($modals.editPrice)"></button>
		<header class = "modal__header">
			<h3 class = "modal__title">{{ this.$t('page-billing.prices.popup-text') }}</h3>
		</header>
		<div class = "modal__main billing-prices">
			<div class = "billing-variants">
				<div class = "billing-list">
					<div class = "billing-list__elem billing-list__elem--doctor"><p>{{
						$t("page-billing.prices.doctor-fee") }}</p> <span>$12</span></div>
					<div class = "billing-list__elem billing-list__elem--admin"><p>{{
						$t("page-billing.prices.admin-fee") }}</p> <span>$1.5</span></div>
					<div class = "billing-list__elem billing-list__elem--total"><p>{{ $t("page-billing.prices.total")
						}}</p> <span>$12.55</span></div>
				</div>
				<div class = "billing-list">
					<div class = "billing-list__elem billing-list__elem--doctor"><p>{{
						$t("page-billing.prices.doctor-fee") }}</p> <span>$12</span></div>
					<div class = "billing-list__elem billing-list__elem--admin"><p>{{
						$t("page-billing.prices.admin-fee") }}</p> <span>$1.5</span></div>
					<div class = "billing-list__elem billing-list__elem--total"><p>{{ $t("page-billing.prices.total")
						}}</p> <span>$12.55</span></div>
				</div>
				<div class = "billing-list">
					<div class = "billing-list__elem billing-list__elem--doctor"><p>{{
						$t("page-billing.prices.doctor-fee") }}</p> <span>$12</span></div>
					<div class = "billing-list__elem billing-list__elem--admin"><p>{{
						$t("page-billing.prices.admin-fee") }}</p> <span>$1.5</span></div>
					<div class = "billing-list__elem billing-list__elem--total"><p>{{ $t("page-billing.prices.total")
						}}</p> <span>$12.55</span></div>
				</div>
			</div>
		</div>
		<footer class = "modal__footer">
			<button class = "control-btn--cancel"
					@click.stop = "closeModal($modals.editPrice)">
				{{ this.$t('page-billing.prices.cancel') }}
			</button>
			<button class = "control-btn--submit">
				{{ this.$t('page-billing.prices.confirm') }}
			</button>
		</footer>
	</modal>
</template>

<script>
    // mixins
    import modal from '~/mixins/modal';

    export default {
        mixins  : [
            modal,
        ],
        methods : {}
    }
</script>
<style lang = "scss">
	.modal__main.billing-prices {
		.billing-variants {
			display        : flex;
			flex-direction : column;
			margin-top     : 20px;
			align-items    : center;
			@include tablet-big {
				flex-direction  : row;
				justify-content : space-between;
			}
			.billing-list {
				width         : 100%;
				max-width     : 300px;
				margin-bottom : 20px;
				padding       : 20px 25px;
				border-radius : 7px;
				cursor        : pointer;
				border        : 1px solid #DCDCDC;
				@include tablet-big {
					margin-bottom : 0;
				}
				&__elem {
					display         : flex;
					justify-content : space-between;
					p, span {
						font-weight : bold;
					}
					&--doctor {
						span {
							color : $green;
						}
					}
					
					&--total {
						color : $color-curious-blue;
					}
				}
				&:hover {
					background : rgba(37, 126, 229, 0.3);
				}
			}
		}
	}

</style>