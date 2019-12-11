<template>
    <div class="layout">
        <App>
            <AppHeader />
			<AppMain>
				<Nuxt />
			</AppMain>
            <AppFooter />
        </App>
    </div>
</template>

<script>
import App from "~/components/App/App"
import AppHeader from "~/components/App/AppHeader"
import AppMain from "~/components/App/AppMain"
import AppFooter from "~/components/App/AppFooter"

export default {
    components: {
        App,
		AppHeader,
		AppMain,
        AppFooter,
    }
}
</script>