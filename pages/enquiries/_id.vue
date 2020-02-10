<template>
	<div class = "page">
		<div class = "section section-not-padding">
			<div class = "container-big">
				<Dashboard>
					<DashboardSidebar />
					<DashboardMain>
						<div class = "section-breadcrumbs">
							<Breadcrumbs :breadcrumbs = "breadcrumbs" />
						</div>
						<DashboardHeader :title = "`Enquiries ID: ${$route.params.id} Information`">
							<EnquiriesStatus />
						</DashboardHeader>
						<DashboardContent>
							<Id />
						</DashboardContent>
					</DashboardMain>
				</Dashboard>
			</div>
		</div>
	</div>
</template>

<script>
    import Dashboard from "~/components/Dashboard/Dashboard"
    import DashboardSidebar from "~/components/Dashboard/DashboardSidebar"
    import DashboardMain from "~/components/Dashboard/DashboardMain"
    import DashboardHeader from "~/components/Dashboard/DashboardHeader"
    import DashboardContent from "~/components/Dashboard/DashboardContent"
    import EnquiriesStatus from "~/components/Enquiries/EnquiriesStatus"
    import Id from "~/components/Enquiries/Id"

    export default {
        async fetch({app, store, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null){
                await store.dispatch('user/LOAD_USER', {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                })
                           .catch(error => {
                               app.$cookies.remove(app.cookie.names.token)
                               app.$cookies.remove(app.cookie.names.tokenId)
                           })
            }
        },
        components : {
            Dashboard,
            DashboardSidebar,
            DashboardMain,
            DashboardHeader,
            DashboardContent,
            EnquiriesStatus,
            Id,
        },
        data(){
            return {
                breadcrumbs : [
                    {
                        text : this.$t("links.home"),
                        to   : this.$routes.home.path
                    },
                    {
                        text : this.$t("links.hautarzt"),
                        to   : this.$routes.hautarzt.path
                    },
                    {
                        text : this.$route.params.id
                    }
                ]
            }
        }
    }
</script>

<style lang = "scss">
	.section-breadcrumbs {
		padding-bottom : 30px;
	}
	
	.dashboard-header {
		align-items    : flex-end;
		flex-direction : column;
		
		@include tablet {
			align-items    : center;
			flex-direction : row;
		}
	}
</style>
