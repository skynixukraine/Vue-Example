<template lang = "html">
    <div class="patient">
        <div class="section">
            <div class="container">
                <p class="patient-block__paragraph">
                {{this.$t('page-patient.p1')}}<br>
                </p>
                <p class="patient-block__paragraph">
                {{this.$t('page-patient.p2')}}<br>
                </p>
                <p class="patient-block__paragraph">
                {{this.$t('page-patient.p3')}}<br>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async fetch ({ app, store, error }) {
        // if token exist and user empty - load User object        
        if (app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null) {
            await store.dispatch('user/LOAD_USER', { id: app.$cookies.get(app.cookie.names.tokenId), token: app.$cookies.get(app.cookie.names.token) })
                .catch(error => {
                    app.$cookies.remove(app.cookie.names.token)
                    app.$cookies.remove(app.cookie.names.tokenId)
                })
        }
    },
}
</script>
<style lang = "scss">
.patient-block{
        &__paragraph{
            margin-bottom: 20px;
        }
}
.patient {
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
</style>