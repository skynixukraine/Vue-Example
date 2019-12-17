<template>
    <footer class="app-footer">

        <div class="app-footer__item">
            <div class="app-footer__container">
                <div class="app-footer__row">
                    <div class="app-footer__column">
                        <h3 class="app-footer__title">{{ $t('headers.for-patients') }}</h3>
                        <ul class="app-footer__list">
                            <li class="app-footer__item" v-for="(link, index) in links.forPatients" :key="index">
                                <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="app-footer__column">
                        <h3 class="app-footer__title">{{ $t('headers.for-dermatologists') }}</h3>
                        <ul class="app-footer__list">
                            <li class="app-footer__item" v-for="(link, index) in links.forDermatologists" :key="index">
                                <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="app-footer__column">
                        <h3 class="app-footer__title">{{ $t('headers.research') }}</h3>
                        <ul class="app-footer__list">
                            <li class="app-footer__item" v-for="(link, index) in links.research" :key="index">
                                <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="app-footer__column">
                        <h3 class="app-footer__title">{{ $t('headers.formal') }}</h3>
                        <ul class="app-footer__list">
                            <li class="app-footer__item" v-for="(link, index) in links.formal" :key="index">
                                <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="app-footer__row">
                    <div class="app-footer__column">
                        <button>Facebook</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="app-footer__item">
            <div class="app-footer__container">
                <div class="app-footer__row">
                    <div class="app-footer__column">
                        <div class="app-footer__copyright">Copyright</div>
                    </div>
                </div>
            </div>
        </div>

    </footer>
</template>

<script>
export default {
    data() {
        return {
            links: {
                forPatients: [{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                }],
                forDermatologists: [{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                }],
                research: [{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                }],
                formal: [{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                },{
                    text: 'text',
                    to: 'link'
                }],
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.app-footer {

    &__row {
        display: flex;
    }
}
</style>