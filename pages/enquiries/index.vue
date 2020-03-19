<template>
    <div class = "page">
        <div class = "section section-not-padding">
            <div class = "container-fluid">
                <Dashboard>
                    <DashboardSidebar />
                    <DashboardMain>
                        <DashboardHeader :title = "`Enquiries`" />
                        <DashboardContent>
                            <Enquiries />
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
    import Enquiries from "~/components/Enquiries/Enquiries"
    
    export default {
            async fetch ({ app, store, error }) {
                // if token exist and user empty - load User object
                if (app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null) {
                    await store.dispatch('user/LOAD_USER', { id: app.$cookies.get(app.cookie.names.tokenId), token: app.$cookies.get(app.cookie.names.token) })
                               .catch(error => {
                                   app.$cookies.remove(app.cookie.names.token)
                                   app.$cookies.remove(app.cookie.names.tokenId)
                               })
                }

                await store.dispatch('doctors/LOAD_AND_SAVE_DOCTOR_ENQUIRES', {
                    token       : app.$cookies.get(app.cookie.names.token),
                    doctor_id   : store.state.user.user.id,
                    requestData : {
                        per_page  : 3,
                        order_by  : "id",
                        direction : "asc"
                    }
                })
            },
        components : {
            Dashboard,
            DashboardSidebar,
            DashboardMain,
            DashboardHeader,
            DashboardContent,
            Enquiries,
        },
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
