<template>
    <div class="hero-banner">
        <header class="hero-banner__header">
            <h1 class="hero-banner__title">{{ $t('banners.herobanner.title') }}</h1>
        </header>
        <div class="hero-banner__main">
            <p class="hero-banner__text">{{ $t('banners.herobanner.description') }}</p>
            <button>Button</button>
        </div>
        <footer class="hero-banner__footer">{{ $t('banners.herobanner.scroll-to-run') }}</footer>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.hero-banner {
    background: #FFF;
}
</style>