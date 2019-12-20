<template>
    <div class="page">
        <Section
            :paddingTop="76"
            :paddingBottom="24"
            :bgImage="require('~/static/images/bg/abstract-bg-2.jpg')"
            :fullscreen="true"
        >
            <Container>
                <HeroBanner />
            </Container>
        </Section>
        <Section>
            <Container>
                <SectionHeader :title="$t('headers.our-family-doctors')" />
                <List :items="users" #default="{ item }">
                    <DoctorCard :doctor="item" />
                </List>
                <SectionFooter>
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-blue" exact>{{ $t('links.show-all') }}</NuxtLink>
                </SectionFooter>
            </Container>
        </Section>
        <Section :padding="64" :bgImage="require('~/static/images/bg/abstract-bg-1.jpg')">
            <Container>
                <SectionHeader :title="$t('headers.your-advantages')" :color="'white'" />
                <List :items="advantages" #default="{ item }" :columns="[100, 50, 50, 25, 25, 25]">
                    <AdvantageCard :advantage="item" />
                </List>
                <SectionFooter>
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-white" exact>{{ $t('links.learn-more') }}</NuxtLink>
                </SectionFooter>
            </Container>
        </Section>
        <Section>
            <Container>
                <SectionHeader :title="$t('headers.few-steps')" />
                <List :items="steps" #default="{ item }" :columns="[100, 100, 100, 100, 100, 100]">
                    <StepCard :step="item" />
                </List>
                <SectionFooter>
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-blue" exact>{{ $t('links.frequently-asked') }}</NuxtLink>
                </SectionFooter>
            </Container>
        </Section>
        <Section>
            <Container>
                <RequestBanner />
            </Container>
        </Section>
    </div>
</template>

<script>
import HeroBanner from "~/components/Banners/HeroBanner"
import DoctorCard from "~/components/Cards/DoctorCard"
import AdvantageCard from "~/components/Cards/AdvantageCard"
import StepCard from "~/components/Cards/StepCard"
import LogoCard from "~/components/Cards/LogoCard"
import RequestBanner from "~/components/Banners/RequestBanner"

export default {
    head() {
        return { title: this.$t('page-home.head.title') }
    },
    async fetch ({ store, error }) {
        if (!store.getters['user/USERS'].length) {
            const users = await store.dispatch('user/LOAD_USERS').catch((e) => {
                error({ statusCode: e.status, message: e.message })
            })
            store.commit('user/SET_USERS', users)
        }
    },

    mounted() {
        this.$root.$emit('showNotify', { type: 'success', text: 'Home page is mounted.' })
    },

    data() {
        return {
            breadcrumbs: [{
                text: this.$t('links.home'),
                to: this.$routes.home.path
            }],
            advantages: [{
                icon: require('~/static/images/advantages/diamond.svg'),
                text: this.$t('advantages.professional-trustworthy')
            },{
                icon: require('~/static/images/advantages/shield.svg'),
                text: this.$t('advantages.data-protection-compliant')
            },{
                icon: require('~/static/images/advantages/clock.svg'),
                text: this.$t('advantages.fast-time-saving')
            },{
                icon: require('~/static/images/advantages/loupe.svg'),
                text: this.$t('advantages.independent-accessible')
            }],
            steps: [{
                number: '01',
                title: this.$t('steps.choose-dermatologist'),
                text: this.$t('steps.dermatologist-at-clinic-essen')
            },{
                number: '02',
                title: this.$t('steps.describe-symptoms'),
                text: this.$t('steps.what-complaints-problem')
            },{
                number: '03',
                title: this.$t('steps.you-get-specialist-advice'),
                text: this.$t('steps.specialist-initial-assessment')
            }],
        }
    },
    computed: {
        users() {
            return this.$store.getters['user/USERS']
        }
    },

    components: {
        HeroBanner,
        DoctorCard,
        AdvantageCard,
        StepCard,
        LogoCard,
        RequestBanner
    }
}
</script>