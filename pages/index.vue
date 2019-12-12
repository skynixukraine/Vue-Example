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
            await store.dispatch('user/LOAD_AND_COMMIT_USERS').catch((e) => {
                error({ statusCode: e.status, message: e.message })
            })
        }
    }
}
</script>