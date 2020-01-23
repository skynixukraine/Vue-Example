<template>
    <aside class="dashboard-sidebar">
        <div class="dashboard-sidebar__main">
            <div class="dashboard-sidebar__item">
                <ul class="dashboard-sidebar__list">
                    <li class="dashboard-sidebar__item">
                         <NuxtLink class="app-footer__link" :to="$routes.personalInformation.path">Account Settings</NuxtLink>
                    </li>
                    <li class="dashboard-sidebar__item">
                         <NuxtLink class="app-footer__link" :to="$routes.billing.path">Billing</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="dashboard-sidebar__item"></div>
        </div>
        <footer class="dashboard-sidebar__footer">
            <div class="dashboard-sidebar__item">
                <LogoutButton />
            </div>
        </footer>
    </aside>
</template>

<script>
import LogoutButton from "~/components/Authorization/LogoutButton"

export default {
    components: {
        LogoutButton,
    }
}
</script>