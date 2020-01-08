<template>
    <nav class="navigation" :class="{ 'navigation--active': isActive }">
        <ul class="navigation__list">
            <li class="navigation__item" v-for="(link, index) in links" :key="index">
                <NuxtLink :to="link.to" class="link navigation__link">{{ link.text }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script>
// libs
import scrollLock from 'scroll-lock'
// mixins
import window from '~/mixins/window'

// options
const DEFAULT_IS_ACTIVE = false

export default {
    mixins: [window],
    data() {
        return {
            isActive: DEFAULT_IS_ACTIVE
        }
    },
    created() {
        this.startHandleToggleNavigation()
    },
    beforeDestroy() {
        this.stopHandleToggleNavigation()
    },
    computed: {
        links() {
            return [
                {
                    to: this.$routes.hautarzt.path,
                    text: this.$t('links.hautarzt')
                },
                {
                    to: this.$routes.vorteile.path,
                    text: this.$t('links.vorteile')
                },
                {
                    to: this.$routes.faq.path,
                    text: this.$t('links.faq')
                },
                {
                    to: this.$routes.about.path,
                    text: this.$t('links.about')
                },
            ]
        }
    },
    watch: {
        windowWidth(width) {
            if (width >= 720) {
                this.closeNavigation()
            }
        }
    },
    methods: {
        startHandleToggleNavigation() {
            this.$root.$on('toggleNavigation', this.onToggleNavigation)
        },
        stopHandleToggleNavigation() {
            this.$root.$off('toggleNavigation', this.onToggleNavigation)
        },
        onToggleNavigation() {
            this.isActive ? this.closeNavigation() : this.openNavigation()
        },
        openNavigation() {
            this.isActive = true
            scrollLock.disablePageScroll()
        },
        closeNavigation() {
            this.isActive = false
            scrollLock.enablePageScroll()
        }
    }
}
</script>

<style lang="scss" scoped>
.navigation {
    position: fixed;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: $color-stratos;
    transition: left 200ms ease-in-out;
    padding: 68px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--active {
        left: 0;
    }


    &__list {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    &__link {
        font-size: 18px;
        font-weight: 400;
        color: $color-white;
        text-decoration: none;
    }


    @include tablet-big {
        position: static;
        display: flex;
        align-items: center;
        background: transparent;
        padding: 0;

        &__list {
            display: flex;
            justify-content: flex-end;
        }

        &__item {
            margin-right: 30px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>