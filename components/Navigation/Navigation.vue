<template>
    <nav class="navigation" :class="{ 'navigation--active': isActive }">
        <button @click="emitToggleNavigation" v-if="windowWidth < 962">CLOSE</button>
        <ul class="navigation__list">
            <li class="navigation__item" v-for="(link, index) in links" :key="index">
                <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
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
    data() {
        return {
            isActive: false
        }
    },
    created() {
        this.handleToggleNavigation()
    },
    computed: {
        links() {
            return [
                {
                    to: this.$routes.dermatologists.path,
                    text: this.$t('links.dermatologists')
                },
                {
                    to: this.$routes.advantages.path,
                    text: this.$t('links.advantages')
                },
                {
                    to: this.$routes.faq.path,
                    text: this.$t('links.faq')
                },
                {
                    to: this.$routes.about.path,
                    text: this.$t('links.about')
                },
                {
                    to: this.$routes.jobs.path,
                    text: this.$t('links.jobs')
                },
            ]
        }
    },
    watch: {
        windowWidth(width) {
            if (width >= 720) {
                this.isActive = false
            }
        }
    },
    methods: {
        handleToggleNavigation() {
            this.$root.$on('toggleNavigation', () => {
                this.isActive = !this.isActive
                if (this.isActive) {
                    scrollLock.disablePageScroll()
                } else {
                    scrollLock.enablePageScroll()
                }
            })
        },
        emitToggleNavigation() {
            this.$root.$emit('toggleNavigation')
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
    background: #001A4B;
    transition: left 200ms ease-in-out;

    &--active {
        left: 0;
    }


    &__list {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    &__item {
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }

    &__link {
        font-size: 18px;
        font-weight: 400;
        color: #FFF;
        text-decoration: none;
    }


    @include tablet-big {
        position: static;
        display: flex;
        align-items: center;
        background: transparent;

        &__list {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>