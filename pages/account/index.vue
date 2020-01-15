<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <h1>Account</h1>
                <ul>
                    <li><NuxtLink :to="$routes.accountPersonalInformation.path">Personal Information</NuxtLink></li>
                    <li><NuxtLink :to="$routes.accountBilling.path">Billing</NuxtLink></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>