<template>
    <footer class="app-footer">
        <Section>
            <Container>
                <div class="app-footer__item">
                    <div class="row">
                        <div class="column">
                            <h3 class="app-footer__title">{{ $t('headers.for-patients') }}</h3>
                            <ul class="app-footer__list">
                                <li class="app-footer__item" v-for="(link, index) in links.forPatients" :key="index">
                                    <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                        <div class="column">
                            <h3 class="app-footer__title">{{ $t('headers.for-dermatologists') }}</h3>
                            <ul class="app-footer__list">
                                <li class="app-footer__item" v-for="(link, index) in links.forPatients" :key="index">
                                    <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                        <div class="column">
                            <h3 class="app-footer__title">{{ $t('headers.research') }}</h3>
                            <ul class="app-footer__list">
                                <li class="app-footer__item" v-for="(link, index) in links.forPatients" :key="index">
                                    <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                        <div class="column">
                            <h3 class="app-footer__title">{{ $t('headers.formal') }}</h3>
                            <ul class="app-footer__list">
                                <li class="app-footer__item" v-for="(link, index) in links.forPatients" :key="index">
                                    <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="app-footer__item">
                    <div class="social-list">
                        <div class="social-list__item">
                            <button>Facebook</button>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
        <Section>
            <Container>
                <div class="app-footer__copyright">Copyright</div>
            </Container>
        </Section>
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
                }]
            }
        }
    }
}
</script>