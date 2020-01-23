<template>
    <aside class="dashboard-sidebar">
        <div class="dashboard-sidebar__main">
            <div class="dashboard-sidebar__item">
                <h4>Konto Einstellungen</h4>
                <ul class="dashboard-sidebar__list">
                    <li class="dashboard-sidebar__item">
                         <NuxtLink class="app-footer__link" :to="$routes.personalInformation.path">Konto Informationen</NuxtLink>
                    </li>
                    <li class="dashboard-sidebar__item">
                         <NuxtLink class="app-footer__link" :to="$routes.billing.path">Billing</NuxtLink>
                    </li>
                    <li class="dashboard-sidebar__item">
                         <NuxtLink class="app-footer__link" :to="$routes.enquiries.path">Anfragen</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <footer class="dashboard-sidebar__footer">
            <div class="dashboard-sidebar__item">
                <ul class="dashboard-sidebar__list">
                    <li class="dashboard-sidebar__item">
                         <LogoutButton />
                    </li>
                    <li class="dashboard-sidebar__item">
                         <NuxtLink class="app-footer__link" :to="$routes.contact.path">Hilfe</NuxtLink>
                    </li>
                </ul>
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

<style lang="scss" scoped>
.dashboard-sidebar {
    padding: 40px 30px;
    width: 283px;
    background: $color-gradient-blue-light-revert;
    color: $color-white;
}    
</style>