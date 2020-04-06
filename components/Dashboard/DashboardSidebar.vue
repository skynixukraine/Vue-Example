<template>
	<aside class = "dashboard-sidebar">
		<div class = "dashboard-sidebar__main"
			 :class = "{'dashboard-sidebar__main--stick': isStickSidebarMain}"
			 ref = "sidebarMain">
			<div class = "dashboard-sidebar__items">
				<ul class = "dashboard-sidebar__list">
					<li class = "dashboard-sidebar__item dashboard-sidebar__item--account">
						<NuxtLink class = "dashboard-sidebar__link dashboard-sidebar__link_active"
								  :to = "$routes.personalInformation.path">
							{{ $t("sidebar.proff-info") }}
						</NuxtLink>
					</li>
					<li class = "dashboard-sidebar__item dashboard-sidebar__item--billing">
						<NuxtLink class = "dashboard-sidebar__link" :to = "$routes.billing.path">Abrechnung</NuxtLink>
					</li>
					<li class = "dashboard-sidebar__item dashboard-sidebar__item--enquiries">
						<NuxtLink class = "dashboard-sidebar__link" :to = "$routes.enquiries.path">
							{{ $t("sidebar.request") }}
						</NuxtLink>
						<span class = "dashboard-sidebar__sticker">New</span>
					</li>
				</ul>
			</div>
		</div>
		<footer class = "dashboard-sidebar__footer"
				:class = "{'dashboard-sidebar__main--stick': isStickSidebarFooter}"
				ref = "sidebarFooter">
			<ul class = "dashboard-sidebar__list">
				<li class = "dashboard-sidebar__item dashboard-sidebar__item--logout">
					<LogoutButton />
				</li>
				<li class = "dashboard-sidebar__item dashboard-sidebar__item--help">
					<NuxtLink class = "dashboard-sidebar__link" :to = "$routes.contact.path">Hilfe</NuxtLink>
				</li>

				<li class = "dashboard-sidebar__item dashboard-sidebar__item--vorlagen">
					<NuxtLink class = "dashboard-sidebar__link" :to = "$routes.vorlagen.path">Vorlagen</NuxtLink>
				</li>
			</ul>
		</footer>
	</aside>
</template>

<script>
    import constants from "~/assets/js/appConstans";
    import LogoutButton from "~/components/Authorization/LogoutButton";

    export default {
        components : {
            LogoutButton,
        },
        mounted(){
            this.onResize();
            window.addEventListener("resize", this.onResize);
        },
        beforeDestroy(){
            window.removeEventListener("resize", this.onResize);
        },
        data(){
            return {
                isStickSidebarMain   : false,
                isStickSidebarFooter : false,
            }
        },
        computed   : {
            appHeader(){
                return document.querySelector(".app-header");
            },
            appMain(){
                return document.querySelector(".app-main");
            }
        },
        methods    : {
            onScroll(){
				let sidebar_main = this.$refs.sidebarMain !== undefined ? this.$refs.sidebarMain.clientHeight : 0;
                let sidebar_footer = this.$refs.sidebarFooter !== undefined ? this.$refs.sidebarFooter.clientHeight : 0;
                if(window.innerWidth >= constants.mediaScreenTabletBigMin){
                    if(window.pageYOffset + this.appHeader.clientHeight + sidebar_main > this.appMain.clientHeight - sidebar_footer){
                        if(!this.isStickSidebarMain){
                            this.isStickSidebarMain = true;
                            if (sidebar_main !== 0){
                                this.$refs.sidebarMain.setAttribute("style", `bottom: ${sidebar_footer}px`);
                            }
                        }
                    } else{
                        this.isStickSidebarMain = false;
                        if (sidebar_main !== 0){
                            this.$refs.sidebarMain.setAttribute("style", ``);
                        }
                    }

                    if(window.pageYOffset + window.innerHeight > this.appMain.clientHeight){
                        if(!this.isStickSidebarFooter){
                            this.isStickSidebarFooter = true;
                        }
                    } else{
                        this.isStickSidebarFooter = false;
                    }
                }
            },
            onResize(){
                window.innerWidth >= constants.mediaScreenTabletBigMin ?
                    window.addEventListener("scroll", this.onScroll) :
                    window.removeEventListener("scroll", this.onScroll);
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.dashboard-sidebar .nuxt-link-active {
		color : $color-light-blue;
	}
	.dashboard-sidebar {
		color          : $color-white;
		width          : 283px;
		display        : none;
		padding        : 0 30px;
		background     : $color-gradient-blue-light-revert;
		flex-direction : column;

		
		
		@include tablet-big {
			$header_height : 80px;
			$vertical_offset : $main_offset * 2;
			display    : flex;
			min-height : calc(100vh - #{$header_height});
			
			&__main, &__footer {
				position : fixed;
				
				&--stick {
					position : absolute;
				}
			}
			
			&__main {
				position: relative;
				bottom: 0;
				padding-top : $vertical_offset;
			}
			
			&__footer {
				bottom         : 0;
				padding-bottom : $vertical_offset;
				@media (max-height: 420px) {
				position: relative;
				bottom: 0;
				}
			}
		}
		
		&__list {
			padding       : 0;
			position      : relative;
			list-style    : none;
			margin-bottom : 30px;
		}
		
		&__item {
			position      : relative;
			line-height   : 23px;
			padding-left  : 32px;
			margin-bottom : $main_offset;
			
			&:before {
				$size : 24px;
				top                 : -2px;
				left                : 0;
				width               : $size;
				height              : $size;
				content             : " ";
				display             : block;
				position            : absolute;
				background-repeat   : no-repeat;
				background-position : center;
			}
			
			&--account {
				&:before {
					background-image : url("~static/images/icons/account-icon.svg");
				}
			}
			
			&--enquiries {
				&:before {
					background-image : url("~static/images/icons/heart-icon.svg");
				}
			}
			
			&--billing {
				&:before {
					background-image : url("~static/images/icons/credit-card.svg");
					background-size  : cover;
				}
			}
			
			&--help {
				&:before {
					background-image : url("~static/images/icons/question-icon.svg");
				}
			}
			
			&--logout {
				&:before {
					background-image : url("~static/images/icons/logout-icon.svg");
				}
			}
		}
		
		&__link {
			color : $color-white;
		}
		
		&__count {
			color : $color-count;
		}
		
		&__sticker {
			padding       : 5px 8px;
			font-size     : 15px;
			background    : rgba(255, 255, 255, .16);
			line-height   : 1.27;
			border-radius : 4px;
		}
	}
</style>