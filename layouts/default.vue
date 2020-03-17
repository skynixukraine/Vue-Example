<template>
	<div class="layout">
		<App>
			<AppHeader />
			<AppMain>
				<Nuxt />
			</AppMain>
			<AppFooter />
			<AppNotify />
			<Modals />
			<VueCookieAcceptDecline
					:elementId="id"
					:debug="false"
					:position="'bottom'"
					:transitionName="'slideFromBottom'"
					@status="cookieStatus"
					@clickedAccept="cookieClickedAccept"
					@clickedDecline="cookieClickedDecline">
				<div slot="message">
					<div>
						We use cookies to ensure you get the best experience on our website.
						<a href="/cookies">Learn More...</a>
					</div>
					<div class="cookie__groups" v-if="showCookieGroups">
						<dl class="cookie__groups-list">
							<dt class="cookie__group-title"
								tabindex="0"
								:class="{'cookie__group-title--open':isFunktion}"
								:aria-expanded="[isFunktion ? true : false]"
								@click.stop="btnGroupsListToggle('isFunktion')">
								<div class="cookie__group-title-text"> Funktion ({{funktion}})</div>
								<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
								</svg>
							</dt>
							<GroupsList
									v-bind:cookieGroups="'funktion'"
									v-bind:checked="checkedCookies"
									@changeChecked="changeCheckeds"
									v-if="isFunktion"/>
							<dt class="cookie__group-title"
								tabindex="0"
								:class="{'cookie__group-title--open':isAnalyse}"
								:aria-expanded="[isAnalyse ? true : false]"
								@click.stop="btnGroupsListToggle('isAnalyse')">
								<div class="cookie__group-title-text">Analyse ({{analyse}})</div>
								<button class="link--button-gradient cookie__btn-accept-all" @click.stop="btnAcceptAll">Analyse Cookies akzeptieren</button>
								<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
								</svg>
							</dt>
							<GroupsList
									v-bind:cookieGroups="'analyse'"
									v-bind:checked="checkedCookies"
									@changeChecked="changeCheckeds"
									v-if="isAnalyse"/>
						</dl>
					</div>
					<button class="cookie__btn-toggle" @click.stop = "btnCookieToggle">Details auf-/zuklappen</button>
				</div>
			</VueCookieAcceptDecline>
		</App>
	</div>
</template>

<script>
    import App from "~/components/App/App"
    import AppHeader from "~/components/App/AppHeader"
    import AppMain from "~/components/App/AppMain"
    import AppFooter from "~/components/App/AppFooter"
    import AppNotify from "~/components/App/AppNotify"
    import Modals from "~/components/Modals/Modals"
    import VueCookieAcceptDecline from 'vue-cookie-accept-decline'
    import GroupsList from "~/components/cookies/GroupsList.vue"
    import localStorage from '~/mixins/localStorage';

    export default {
        data(){
            return{
                id: 'cookie',
                showCookieGroups: false,
                isFunktion: false,
                isAnalyse: false,
                funktion: 0,
                analyse: 0,
                checkedCookies:{}
            }
		},
		beforeMount(){
			let _funktion = 0,
				_analyse = 0,
				_info = {},
                _lStorage = this.getPropLocalStorage('checkedCookies'); //is there information about the checked cookies
            this.$t('cookie').forEach(item => {
                item.funktion ? ++_funktion : null;
                item.analyse ? ++_analyse : null;
			});
            this.funktion = _funktion;
            this.analyse = _analyse;

            if(_lStorage){
                this.checkedCookies = _lStorage;
			} else {

                this.$t('cookie').forEach(item => {
                    _info[item.name] = item.selectedDefault;
                });
                this.checkedCookies = _info;
                this.setObjLocalStorage({'checkedCookies': _info});
			}
            console.log('mounted **********************', this.checkedCookies)
		},
        mixins : [
            localStorage,
        ],
		methods:{
            cookieStatus(){
				return true
            },
            cookieClickedAccept(){
                return true
            },
            cookieClickedDecline(){
                return false
            },
            btnCookieToggle(){
                this.showCookieGroups = !this.showCookieGroups;
			},
            btnGroupsListToggle(cookie){
				this[cookie] = !this[cookie];
			},
            btnAcceptAll(){
                this.$t('cookie').forEach(item => {

                    if(item.analyse){
                        this.checkedCookies[item.name] = true;
					}
                });
                this.setObjLocalStorage({'checkedCookies': this.checkedCookies});
			},
            changeCheckeds(name){
                this.checkedCookies[name] = !this.checkedCookies[name];
                this.setObjLocalStorage({'checkedCookies': this.checkedCookies});
			}
		},
        components: {
            App,
            VueCookieAcceptDecline,
            AppHeader,
            AppMain,
            AppFooter,
            AppNotify,
            Modals,
            GroupsList
        }
    }
</script>
<style lang="scss" scoped>

	.cookie{
		&__floating__wrap {
			position: relative;
		}
		&__groups{
			overflow-y: auto;
			overflow-x: hidden;
			max-height: 190px;
			border: 1px solid #e0e1e3;

			@include tablet{
				max-height: 450px;
			}
		}
		&__groups-list{
			margin: 0;
			background: #ffffff;
		}
		&__group-title {
			display: flex;
			padding: 0 0 0 15px;
			justify-content: space-between;
			border-top: 2px solid #d8d8d8;
			background: #f7fafc;
			cursor: pointer;

			&:last-child{
				border-bottom: 2px solid #d8d8d8;
			}
			&--open{
				background-color: #fff;

				.icon__small{
					-webkit-transform: rotate(-.5turn);
					transform: rotate(-.5turn);
				}
			}
			@include phone-big-max{
				flex-direction: column;
				position: relative;
			}
			&:focus{
				outline: none;
			}


		}
		&__group-title-text{
			padding: 7px 0;
			font-size: 19px;
			line-height: 30px;
			font-weight: 400;
			color: #247ee5;
		}

			&__floating__buttons{
			padding: 0 0 0 265px;
		}
		&__btn-accept-all{
			height: 30px;
			max-width: 250px;
			margin: 7px 0 0 0;
			border: none;
			border-radius: 4px;

			@include phone-big-max{
				margin: 0 0 7px 0;
			}
		}
		&__btn-toggle{
			position: absolute;
			bottom: 0;
			left: 0;
			color         : white;
			border        : none;
			margin        : 0 $main_offset / 2 0 0;
			padding       : 10px $main_offset 9px;
			font-size     : 16px;
			font-weight   : 500;
			background    : linear-gradient(270deg, #0F44B2 0%, #042052 100%);
			font-family   : $TheSansB;
			border-radius : 5px;

			@include tablet {
				margin    : 0 $main_offset 0 0;
				padding   : $main_offset / 2 31px 9px;
				font-size : 18px;
			}
			@include phone-big-max{
				bottom: 47px;
			}
		}
	}
	.icon__small {
		margin: 11px 11px 0 0;

		@include phone-big-max{
			position: absolute;
			top: 2px;
			right: 0;
		}
	}

</style>