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
					We use cookies to ensure you get the best experience on our website.
					<a href="/cookies">Learn More...</a>
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

    export default {
        data(){
            return{
                id: 'cookie'
			}
		},
		methods:{
            cookieStatus(){
				return true
            },
            cookieClickedAccept(){
                return true
            },
            cookieClickedDecline(){
                return false
            }
		},
        components: {
            App,
            VueCookieAcceptDecline,
            AppHeader,
            AppMain,
            AppFooter,
            AppNotify,
            Modals
        }
    }
</script>