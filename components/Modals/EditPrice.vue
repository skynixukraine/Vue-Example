<template>
	<modal :name = "$modals.editPrice"
		   transition = "nice-modal-fade"
		   :width = "1100"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal modal--billing-prices'">
		<button class = "modal__close-button" @click = "closeModal($modals.editPrice)"></button>
		<header class = "modal__header">
			<h3 class = "modal__title">{{ this.$t('page-billing.prices.popup-text') }}</h3>
		</header>
		<div class = "modal__main billing-prices">
			<div class = "billing-variants" >
				<div class = "billing-list" v-for="(item, index) in data" :key="'billing-price-' + index" :id="item.id" ref="index" @click="selectedPrice(item)">
					<div class = "billing-list__elem billing-list__elem--doctor"><p>{{ $t("page-billing.prices.doctor-fee")
						}}</p> <span>&#8364; {{item.enquire_doctor_fee}}</span></div>
					<div class = "billing-list__elem billing-list__elem--admin"><p>{{ $t("page-billing.prices.admin-fee")
						}}</p> <span>&#8364; {{item.enquire_admins_fee}}</span></div>
					<div class = "billing-list__elem billing-list__elem--total"><p>{{ $t("page-billing.prices.total") }}</p>
						<span>&#8364; {{item.enquire_total_price}}</span></div>
				</div>
			</div>
		</div>
		<footer class = "modal__footer">
			<button class = "control-btn--cancel"
					@click.stop = "closeModal($modals.editPrice)">
				{{ this.$t('page-billing.prices.cancel') }}
			</button>
			<button class = "control-btn--submit" @click.stop = "Submit()">
				{{ this.$t('page-billing.prices.confirm') }}
			</button>
		</footer>
	</modal>
</template>

<script>
    // mixins
    import modal from '~/mixins/modal';
    import PricingPoliciesApi from "~/services/api/PricingPolicies";
    export default {
        data(){
            return {
                data:null,
                result: {
                    id: this.$store.state.user.user.price_policy ? this.$store.state.user.user.price_policy.id : "",
                }
            }
        },
        mixins  : [
            modal,
        ],
        methods : {
            selectedPrice(item) {
                this.result = {
                    id: item.id,
                }
                this.$refs.index.map((elem,  index)=>{
                    elem.style.background = "none";
					if(elem.id == this.result.id)  {
                      elem.style.background = "rgba(37, 126, 229, 0.3)"
					}
				})
            },
            Submit() {
                let formData = new FormData();
                formData.append("price_policy_id", this.result.id);
                formData.append("_method", "PATCH");
                this.$store.dispatch("user/UPDATE_USER", {
                    id     : this.$store.state.user.user.id,
                    token  : this.$cookies.get(this.$cookie.names.token),
                    params : formData
                }).then((response) => {
                }).catch((error) => {
                });
                setTimeout(() => location.reload(), 500);
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
<style lang = "scss">
	.modal--billing-prices {
		overflow: auto;
	}
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