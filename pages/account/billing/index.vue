<template>
	<div class = "page page-billing">
		<div class = "section section--0-0">
			<div class = "container-fluid">
				<Dashboard>
					<DashboardSidebar />
					<DashboardMain>
							<BillingStatus />
						<DashboardContent>
							<SearchStripeOperations @search="search"/>
							<BillingTable v-bind:querySearch="querySearch"/>
						</DashboardContent>
					</DashboardMain>
				</Dashboard>
			</div>
		</div>
	</div>
</template>

<script>
    import Dashboard from "~/components/Dashboard/Dashboard";
    import BillingStatus from "~/components/Account/BillingStatus.vue";
    import DashboardMain from "~/components/Dashboard/DashboardMain";
    import BillingTable from "~/components/Account/BillingTable.vue";
    import DashboardHeader from "~/components/Dashboard/DashboardHeader";
    import DashboardSidebar from "~/components/Dashboard/DashboardSidebar";
    import DashboardContent from "~/components/Dashboard/DashboardContent";
    import SearchStripeOperations from "~/components/Account/SearchStripeOperations.vue";

    export default {
        data() {
            return {
                querySearch: ''
			}
        },
        middleware : [
            "auth",
        ],
        async fetch({app, store, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters["user/USER"] === null){
                await store.dispatch("user/LOAD_USER", {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);
                })
            }

            await store.dispatch("user/LOAD_AND_SAVE_PAYMENT_DATA", {
                doctor_id : store.state.user.user.id,
                token     : app.$cookies.get(app.cookie.names.token)
            })
        },
        computed   : {
            userPaymentData(){
                return this.$store.state.user.userPaymentData;
            }
        },
        methods:{
            search(query){
                this.querySearch = query;
			}
		},
        components : {
            Dashboard,
            SearchStripeOperations,
            BillingTable,
            DashboardMain,
            BillingStatus,
            DashboardHeader,
            DashboardSidebar,
            DashboardContent,
        }
    }
</script>

<style lang = "scss">

</style>