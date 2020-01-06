<template>
    <div class="hero-banner">
        <header class="hero-banner__header">
            <h1 class="hero-banner__title">{{ $t('banners.herobanner.title') }}</h1>
        </header>
        <div class="hero-banner__main">
            <p class="hero-banner__text">{{ $t('banners.herobanner.description') }}</p>
        </div>
        <footer class="hero-banner__footer">
            <div class="hero-banner__footer-item">
                <NuxtLink :to="this.$routes.home.path" class="link link--button link--button-white">{{ $t('links.start-inquiry') }}</NuxtLink>
            </div>
            <div class="hero-banner__footer-item">
                <NuxtLink :to="this.$routes.home.path" class="link link--button link--button-white">{{ $t('links.our-dermatologists') }}</NuxtLink>
            </div>
        </footer>
        <img class="hero-banner__phone" :src="require('~/static/images/images/iphone.png')" alt="iphone" />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.hero-banner {
    position: relative;

    &__main {
        margin-bottom: 64px;
    }

    &__title {
        color: $color-white;
    }

    &__text {
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        color: $color-white;
    }

    &__footer {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    &__footer-item {
        
        &:first-child {
            margin-bottom: 16px;
        }
    }

    &__phone {
        display: none;
    }


    @include tablet {

        &__footer {
            flex-direction: row;
        }

        &__footer-item {
        
            &:first-child {
                margin-bottom: 0;
                margin-right: 16px;
            }
        }
    }

    @include tablet-big {

        &__header {
            width: 55%;
        }

        &__main {
            width: 55%;
        }

        &__footer {
            justify-content: flex-start;
        }

        &__phone {
            display: block;
            position: absolute;
            top: 100px;
            right: -135px;
        }
    }

    @include desktop {

        &__header {
            width: 60%;
        }

        &__main {
            width: 60%;
        }
    }
}
</style>