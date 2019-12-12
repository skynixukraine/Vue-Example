<template>
    <div class="page">
        <Section>
            <Container>
                <h1>online-hautarzt.net</h1>
            </Container>
        </Section>
    </div>
</template>

<script>
// mixins
import User from '~/services/app/User'

export default {
    head() {
        return { title: "Homepage" }
    },
    mounted() {
        setTimeout(() => {
            this.fireCriticalError({ statusCode: 404, message: 'fireCriticalError' })
        }, 200000)
    },
    async fetch ({ store }) {
        if (!store.getters['user/USERS'].length) {
            await store.dispatch('user/LOAD_AND_COMMIT_USERS')
        }
    }
}
</script>