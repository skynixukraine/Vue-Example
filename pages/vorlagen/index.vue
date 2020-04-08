<template>
    <div class = "page page-vorlagen">
        <div class = "section section-not-padding">
            <div class = "container-fluid">
                <Dashboard>
                    <DashboardSidebar />
                    <DashboardMain>
                        <DashboardHeader :title = "`Vorlagen`" />
                        <DashboardContent>
                            <Vorlagen />
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
    import Vorlagen from "~/components/Vorlagen/Vorlagen"

export default {
    head(){
            return {title : this.$t("page-vorlagen.head.title")}
        },
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
    components : {
            Dashboard,
            DashboardSidebar,
            DashboardMain,
            DashboardHeader,
            DashboardContent,
            Vorlagen,
        },
        middleware : [
            "auth",
        ],
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