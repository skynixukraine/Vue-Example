<template>
    <div class="page">
        <div class="section">
            <Dashboard>
                <DashboardSidebar />
                <DashboardMain>
                    <DashboardHeader :title="'Account Settings'">
                        <AccountStatus />
                    </DashboardHeader>
                    <DashboardContent>
                        <PersonalInfo />
                    </DashboardContent>
                </DashboardMain>
            </Dashboard>
        </div>
    </div>
</template>

<script>
import Dashboard from "~/components/Dashboard/Dashboard"
import DashboardSidebar from "~/components/Dashboard/DashboardSidebar"
import DashboardMain from "~/components/Dashboard/DashboardMain"
import DashboardHeader from "~/components/Dashboard/DashboardHeader"
import DashboardContent from "~/components/Dashboard/DashboardContent"
import AccountStatus from "~/components/Account/AccountStatus"
import PersonalInfo from "~/components/PersonalInfo/PersonalInfo"

export default {
    middleware: [
        //'auth',
    ],

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

    components: {
        Dashboard,
        DashboardSidebar,
        DashboardMain,
        DashboardHeader,
        DashboardContent,
        AccountStatus,
        PersonalInfo,
    }
}
</script>