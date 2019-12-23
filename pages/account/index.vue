<template>
    <div class="page">
        <Section>
            <Container>
                <h1>Account</h1>
                <ul>
                    <li><NuxtLink :to="$routes.accountPersonalInformation.path">Personal Information</NuxtLink></li>
                    <li><NuxtLink :to="$routes.accountBilling.path">Billing</NuxtLink></li>
                </ul>
            </Container>
        </Section>
    </div>
</template>