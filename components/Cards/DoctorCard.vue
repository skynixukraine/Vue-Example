<template>
    <NuxtLink :to="'/'" class="link link--card">
        <div class="doctor-card">
            <header class="doctor-card__header">
                <img src="" alt="">
            </header>
            <div class="doctor-card__main">
                <h3 class="doctor-card__title">Doctor Name</h3>
                <p class="doctor-card__text">Doctor description abot self.</p>
            </div>
        </div>
    </NuxtLink>
</template>

<script>
export default {
    props: {
        doctor: {
            type: Object,
            required: true
        }
    }
}
</script>