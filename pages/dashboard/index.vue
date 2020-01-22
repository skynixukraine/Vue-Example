<template>
    <div class="page">
        <div class="section">
            <div class="dashboard-container">
                <aside class="dashboard-container__sidebar dashboard-sidebar">
                    <div class="dashboard-sidebar__main">
                        <div class="dashboard-sidebar__item">
                            <ul class="dashboard-sidebar-list">
                                <li class="dashboard-sidebar-list__item">
                                    <NuxtLink :to="$routes.personalInformation.path">Personal Information</NuxtLink>
                                </li>
                                <li class="dashboard-sidebar-list__item">
                                    <NuxtLink :to="$routes.billing.path">Billing</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <footer class="dashboard-sidebar__footer">
                        <div class="dashboard-sidebar__item">
                            <ul class="dashboard-sidebar-list">
                                <li class="dashboard-sidebar-list__item">
                                    <LogoutButton />
                                </li>
                            </ul>
                        </div>
                    </footer>
                </aside>
                <!-- <div class="dashboard-container__content dashboard-content">
                    <h1>{{ `Good ${this.$timeOfDay}` }}, {{ $store.getters['user/USER'].first_name }} {{ $store.getters['user/USER'].last_name }}</h1>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import LogoutButton from "~/components/Authorization/LogoutButton"

export default {
    middleware: [
        'auth',
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
        LogoutButton,
    }
}
</script>