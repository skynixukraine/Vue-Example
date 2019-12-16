<template>
    <div class="page">
        <Section>
            <Container>
                <HeroBanner />
            </Container>
        </Section>
         <Section>
            <Container>
                <GmapMap
                    :center="{lat:10, lng:10}"
                    :zoom="7"
                    style="width: 100%; height: 300px"
                />
            </Container>
        </Section>
         <Section>
            <Container>
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </Container>
        </Section>
        <Section>
            <Container>
                <SectionHeader :title="$t('headers.our-family-doctors')" />
                <List :items="users.slice(0, 3)" #default="{ item }">
                    <DoctorCard :doctor="item" />
                </List>
                <SectionFooter>
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-blue" exact>{{ $t('buttons.show-all') }}</NuxtLink>
                </SectionFooter>
            </Container>
        </Section>
        <Section>
            <Container>
                <SectionHeader :title="$t('headers.your-advantages')" />
                <List :items="advantages" #default="{ item }">
                    <AdvantageCard :advantage="item" />
                </List>
                <SectionFooter>
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-white" exact>{{ $t('buttons.learn-more') }}</NuxtLink>
                </SectionFooter>
            </Container>
        </Section>
        <Section>
            <Container>
                <SectionHeader :title="$t('headers.few-steps')" />
                <List :items="steps" #default="{ item }">
                    <StepCard :step="item" />
                </List>
                <SectionFooter>
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-blue" exact>{{ $t('buttons.frequently-asked') }}</NuxtLink>
                </SectionFooter>
            </Container>
        </Section>
        <Section>
            <Container>
                <SectionHeader :title="$t('headers.use-us')" />
                <List :items="steps" #default="{ item }">
                    <LogoCard :logo="item" />
                </List>
                <SectionFooter>
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-blue" exact>{{ $t('buttons.show-all') }}</NuxtLink>
                </SectionFooter>
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

    data() {
        return {
            breadcrumbs: [{
                text: this.$t('links.home'),
                to: this.$routes.home.path
            }],
            advantages: [{
                id: 1,
                icon: 'url or svg name',
                text: 'ADV description'
            },{
                id: 2,
                icon: 'url or svg name',
                text: 'ADV description'
            },{
                id: 3,
                icon: 'url or svg name',
                text: 'ADV description'
            },{
                id: 4,
                icon: 'url or svg name',
                text: 'ADV description'
            }],
            steps: [{
                id: 1,
                number: '01',
                title: 'Step Title',
                text: 'My geant step description.'
            },{
                id: 2,
                number: '02',
                title: 'Step Title',
                text: 'My geant step description.'
            },{
                id: 3,
                number: '03',
                title: 'Step Title',
                text: 'My geant step description.'
            }]
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
        LogoCard
    }
}
</script>