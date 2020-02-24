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
                <NuxtLink
                    :to="this.$routes.hautarzt.path"
                    class="link link--button link--button-white"
                >{{ $t('links.start-inquiry') }}</NuxtLink>
            </div>
            <div class="hero-banner__footer-item">
                <NuxtLink
                    :to="this.$routes.hautarzt.path"
                    class="link link--button link--button-white"
                >{{ $t('links.our-dermatologists') }}</NuxtLink>
            </div>
        </footer>
        <img
            class="hero-banner__phone"
            :src="require('~/static/images/images/iPhone_banner.png')"
            alt="iphone"
        />
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hero-banner {
    position: relative;
    margin-top: 50px;

    @include tablet {
        margin-top: auto;
    }

    &__main {
        margin-bottom: 64px;
    }

    &__title {
        color: $color-white;
        font-family: $TheAntiquaB;
        letter-spacing: -0.02em;
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
        position : relative;
        z-index : 1;
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
            width: 100%;
            display: block;
            position: absolute;
            top: 100px;
            right: -320px;
            top: 50px;
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