<template>
    <div class="hero-banner">
        <header class="hero-banner__header">
            <h1 class="hero-banner__title">{{ $t('banners.herobanner.title') }}</h1>
        </header>
        <div class="hero-banner__main">
            <p class="hero-banner__text">{{ $t('banners.herobanner.description') }}</p>
        </div>
        <footer class="hero-banner__footer">
            <NuxtLink :to="this.$routes.home.path" class="link link--button link--button-white">{{ $t('links.start-inquiry') }}</NuxtLink>
        </footer>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.hero-banner {

    &__title {
        font-size: 64px;
        line-height: 76px;
        color: $color-white;
    }

    &__text {
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        color: $color-white;
    }
}
</style>