<template>
    <div class="step-card" :class="`step-card--${step.number}`">
        <header class="step-card__header">
            <div class="step-card__number">{{ step.number }}</div>
        </header>
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

<style lang="scss">
.step-card {
    width: 100%;
    max-width: 928px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 32px;

    &--03 {
        background-image: none;
        padding-bottom: 0;
    }

    &__header {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: center;
    }

    &__number {
        font-family: $font-family-secondary;
        font-size: 24px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 64px;
        min-width: 64px;
        min-height: 64px;
        border-radius: 50%;
        background: $color-gradient-blue-light;
        color: $color-white;
        line-height: 1;
    }

    &__main {
        background: $color-white;
        margin-top: -33px;
        padding: 48px 16px 32px;
        border-radius: 20px;
        text-align: center;
    }


    @include tablet {
        display: flex;
        background-image: url('~static/images/images/dots.png');
        background-repeat: no-repeat;
        padding-bottom: 48px;
        

        &--01 {
            background-position: 60px 77%;
        }

        &--02 {
            background-position: 60px 73%;
        }

        &--03 {
            background-image: none;
            padding-bottom: 0;
        }

        &__number {
            font-size: 48px;
            width: 128px;
            height: 128px;
            min-width: 128px;
            min-height: 128px;
        }

        &__main {
            margin-top: 0;
            margin-left: 64px;
            text-align: left;
            padding: 48px;
        }
    }

    @include tablet-big {

        &--01 {
            background-position: 60px 87%;
        }

        &--02 {
            background-position: 60px 78%;
        }
    }
}
</style>