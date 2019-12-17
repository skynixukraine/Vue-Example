<template>
    <div class="layout">
        <App>
            <AppHeader />
			<AppMain>
				<Nuxt />
			</AppMain>
            <AppFooter />
            <AppNotify />
        </App>
    </div>
</template>

<script>
import App from "~/components/App/App"
import AppHeader from "~/components/App/AppHeader"
import AppMain from "~/components/App/AppMain"
import AppFooter from "~/components/App/AppFooter"
import AppNotify from "~/components/App/AppNotify"

export default {
    components: {
        App,
		AppHeader,
		AppMain,
        AppFooter,
        AppNotify,
    }
}
</script>