<template>
    <div class="advantage-card">
        <header class="advantage-card__header">
            <div class="advantage-card__round">
                <div class="advantage-card__round-inner">
                    <img class="advantage-card__image" :src="advantage.icon" :alt="advantage.text">
                </div>
            </div>
        </header>
        <div class="advantage-card__main">
            <p class="advantage-card__text">{{ advantage.text }}</p>
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

<style lang="scss">
.advantage-card {
    text-align: center;
    max-width: 170px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    &__header {
        display: flex;
        justify-content: center;
        margin-bottom: 18px;
    }

    &__round {
        width: 164px;
        height: 164px;
        background: $color-white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-inner {
            width: 152px;
            height: 152px;
            border: 3px solid #0F44B2;
            background: $color-white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    &__text {
        font-family: $font-family-secondary;
        font-size: 18px;
        color: $color-white;
    }
}
</style>