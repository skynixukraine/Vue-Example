<template>
    <div class="doctor-card">
        <header class="doctor-card__header">
                <img src="" alt="">
        </header>
        <div class="doctor-card__main">
            <p class="doctor-card__text">{{ advantage.text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        advantage: {
            type: Object,
            required: true
        }
    }
}
</script>