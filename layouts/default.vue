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

export default {
    components: {
        App,
		AppHeader,
		AppMain,
        AppFooter,
        AppNotify,
        Modals,
    }
}
</script>