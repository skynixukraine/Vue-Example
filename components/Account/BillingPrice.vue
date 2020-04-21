<template>
	<div class = "billing-prices">
		<p class = "billing-prices__title" v-if="visible_select === true">{{ $t("page-billing.prices.title") }}:</p>
		<div class = "billing-variants" v-if="visible_select === true" >
			<div class = "billing-list" v-for="(item, index) in data" :key="'billing-price-' + index" :id="index" @click="selectPrice(item)">
				<div class = "billing-list__elem billing-list__elem--doctor"><p>{{ $t("page-billing.prices.doctor-fee")
					}}</p> <span>&#8364; {{item.enquire_display_price}}</span></div>
				<div class = "billing-list__elem billing-list__elem--admin"><p>{{ $t("page-billing.prices.admin-fee")
					}}</p> <span>&#8364; {{item.enquire_admins_fee}}</span></div>
				<div class = "billing-list__elem billing-list__elem--total"><p>{{ $t("page-billing.prices.total") }}</p>
					<span>&#8364; {{item.enquire_total_price}}</span></div>
			</div>
		</div>
		<div class = "billing-result" v-else>
			<p class = "billing-prices__title billing-result__title">{{ $t("page-billing.prices.plan-selected") }}:</p>
			<div class = "billing-result__list">
				<div class = "billing-result__elem billing-result__elem--doctor"><p>{{
					$t("page-billing.prices.doctor-fee") }}</p> <span>&#8364; {{result.doctor}}</span></div>
				<div class = "billing-result__elem billing-result__elem--admin"><p>{{
					$t("page-billing.prices.admin-fee") }}</p> <span>&#8364; {{result.admin}}</span></div>
				<div class = "billing-result__elem billing-result__elem--total"><p>{{ $t("page-billing.prices.total")
					}}</p> <span>&#8364; {{result.total}}</span></div>
			</div>
			<button class = "billing-result__button" @click = "openModal($modals.editPrice)">{{
				$t("page-billing.prices.edit-but") }}
			</button>
		</div>
	</div>
</template>

<script>
    import modal from '~/mixins/modal';
    import PricingPoliciesApi from "~/services/api/PricingPolicies";
    export default {
        data(){
            return {
                data:null,
				visible_select: false,
                visible_result: false,
				result: {
                    id: this.$store.state.user.user.price_policy ? this.$store.state.user.user.price_policy.id : "",
                    doctor: this.$store.state.user.user.price_policy ? this.$store.state.user.user.price_policy.enquire_display_price  : "",
					admin: this.$store.state.user.user.price_policy ? this.$store.state.user.user.price_policy.enquire_admins_fee  : "",
					total: this.$store.state.user.user.price_policy ? this.$store.state.user.user.price_policy.enquire_total_price : ""
				}
            }
        },
        mixins : [
            modal,
        ],
        methods : {
            selectPrice(item){
				this.result = {
                    id: item.id,
                    doctor: item.enquire_display_price,
                    admin: item.enquire_admins_fee,
                    total: item.enquire_total_price
				}
                this.visible_select = false;
                this.visible_result = true;
                let formData = new FormData();
                formData.append("price_policy_id", item.id);
                formData.append("_method", "PATCH");
                this.$store.dispatch("user/UPDATE_USER", {
                    id     : this.$store.state.user.user.id,
                    token  : this.$cookies.get(this.$cookie.names.token),
                    params : formData
                }).then((response) => {
                }).catch((error) => {
                });
			}
        },
        mounted(){
            PricingPoliciesApi.loadPricing().then((response) => {
                this.data = response.data.data;
            }).catch((error) => {
            });
         if (this.$store.state.user.user.price_policy) {
             this.visible_select = false;
             this.visible_result = true;
		 } else {
             this.visible_select = true;
             this.visible_result = false;
		 }
        },
    }
</script>

<style lang = "scss" scoped>
	
	.billing-prices {
		&__title {
			color : $color-curious-blue;
		}
		.billing-variants {
			display        : flex;
			flex-direction : column;
			margin-top     : 20px;
			@include desktop {
				flex-direction : row;
			}
			.billing-list {
				width         : 100%;
				max-width     : 300px;
				margin-bottom : 20px;
				padding       : 20px 25px;
				border-radius : 7px;
				cursor        : pointer;
				border        : 1px solid #DCDCDC;
				@include desktop {
					margin-right  : 20px;
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
		.billing-result {
			margin-top : 20px;
			&__list {
				margin-top : 20px;
			}
			&__elem {
				width           : 100%;
				max-width       : 300px;
				display         : flex;
				justify-content : space-between;
				&--doctor {
					span {
						color : $green;
					}
				}
				
				&--total {
					color : $color-curious-blue;
				}
				p, span {
					font-weight : bold;
				}
			}
			&__button {
				margin-top : 20px;
				border     : none;
				background : none;
				outline    : none;
				padding    : 0;
				font-size  : 20px;
				color      : $color-curious-blue;
			}
		}
	}

</style>

