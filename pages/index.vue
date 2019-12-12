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
import Error from '~/mixins/Error'

export default {
    mixins: [Error],
    head() {
        return { title: "Homepage" }
    },
    mounted() {
        setTimeout(() => {
            this.fireCriticalError({ statusCode: 404, message: 'fireCriticalError' })
        }, 2000)
    }
    // async fetch ({ store }) {
    //     if (!store.getters['blog/POSTS'].length) {
    //         await store.dispatch('blog/GET_POSTS')
    //     }
    // }
}
</script>