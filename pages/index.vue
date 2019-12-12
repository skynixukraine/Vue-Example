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
export default {
    head() {
        return { title: "Homepage" }
    },
    async fetch ({ store, error }) {
        if (!store.getters['user/USERS'].length) {
            const users = await store.dispatch('user/LOAD_USERS').catch((e) => {
                error({ statusCode: e.status, message: e.message })
            })
            store.commit('user/SET_USERS', users)
        }
    }
}
</script>