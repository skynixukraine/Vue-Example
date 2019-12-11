<template>
    <div class="page">
        <Section>
            <Container>
                <h1>online-hautarzt.net</h1>
                <h2>{{ $t('lang.ru') }}</h2>
            </Container>
        </Section>
    </div>
</template>

<script>
export default {
    head() {
        return { title: "Homepage" }
    },
    // async fetch ({ store }) {
    //     if (!store.getters['blog/POSTS'].length) {
    //         await store.dispatch('blog/GET_POSTS')
    //     }
    // }
}
</script>