<template>
    <nav class="navigation" :class="{ 'navigation--active': $store.getters['app/IS_NAVIGATION_ACTIVE'] }"
        @click.stop="closeNavMenu"
    >
        <ul class="navigation__list">
            <li
                class="navigation__item"
                v-for="(link, index) in links"
                :key="index"
            >
                <NuxtLink class="link navigation__link" :to="link.to">{{ link.text }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script>
// libs
import scrollLock from 'scroll-lock'
// mixins
import window from '~/mixins/window'

export default {
    mixins: [window],

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
        },
    },

    watch: {
        windowWidth(width) {
            // if return to desktop viewport - reset 'app/IS_NAVIGATION_ACTIVE' to default state
            if (width > 961 && this.$store.getters['app/IS_NAVIGATION_ACTIVE']) {
                this.$store.commit('app/SET_IS_NAVIGATION_ACTIVE', false)
            }
        },
        '$store.state.app.isNavigationActive'(isNavigationActive) {
            isNavigationActive ? scrollLock.disablePageScroll() : scrollLock.enablePageScroll()
        },
    },

    methods: {
        closeNavMenu(){
            this.$store.commit('app/SET_IS_NAVIGATION_ACTIVE', false)
        }
    }

}
</script>

<style lang="scss" scoped>
.navigation {
    position: fixed;
    // top: 0;
    bottom: 0;
    left: -100%;
    width: 100%;
    height: calc(100% - 98px);;
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

    &__item {
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__link {
        display: block;
        font-size: 24px;
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
            
            
            margin-bottom: 0;

            &:last-child {
                margin-right: 0;
            }
        }

        &__link {
            font-size: 18px;
        }
    }
}
</style>