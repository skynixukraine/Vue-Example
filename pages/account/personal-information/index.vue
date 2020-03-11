<template>
	<div class = "page">
		<div class = "section section--0-0">
			<div class = "container-fluid">
				<Dashboard>
					<DashboardSidebar />
					<DashboardMain>
						<DashboardHeader :title = "'Account Einstellungen'">
							<AccountStatus />
						</DashboardHeader>
						<DashboardContent>
							<PersonalInfo />
						</DashboardContent>
					</DashboardMain>
				</Dashboard>
			</div>
		</div>
	</div>
</template>

<script>
    import Dashboard from "~/components/Dashboard/Dashboard";
    import AccountStatus from "~/components/Account/AccountStatus";
    import DashboardMain from "~/components/Dashboard/DashboardMain";
    import PersonalInfo from "~/components/PersonalInfo/PersonalInfo";
    import DashboardHeader from "~/components/Dashboard/DashboardHeader";
    import DashboardSidebar from "~/components/Dashboard/DashboardSidebar";
    import DashboardContent from "~/components/Dashboard/DashboardContent";

    export default {
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
                });
            }

            // load Titles (need for PersonalInfo component)
            await store.dispatch("doctorTitles/LOAD_DOCTOR_TITLES");

            // load Specializations (need for PersonalInfo component)
            await store.dispatch("specializations/LOAD_SPECIALIZATIONS");

            // load Regions (need for PersonalInfo component)
            await store.dispatch("regions/LOAD_REGIONS");

            // load Languages (need for PersonalInfo component)
            await store.dispatch("languages/LOAD_LANGUAGES");
        },
        components : {
            Dashboard,
            PersonalInfo,
            DashboardMain,
            AccountStatus,
            DashboardHeader,
            DashboardSidebar,
            DashboardContent,
        }
    }
</script>

<style lang = "scss" scoped>
	.account {
		&-section { padding : 0; }
		
		&-container {
			width        : 100%;
			margin-left  : auto;
			margin-right : auto;
		}
	}
</style>