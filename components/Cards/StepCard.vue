<template>
    <div class="step-card">
        <div class="step-card__sidebar">{{ step.number }}</div>
        <div class="step-card__main">
            <h3 class="step-card__title">{{ step.title }}</h3>
            <p class="step-card__text">{{ step.text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        step: {
            type: Object,
            required: true
        }
    }
}
</script>