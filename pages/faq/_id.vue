<template>
    <div class="page">
        <Section>
            <Container>
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </Container>
        </Section>
        <Section>
            <Container>
                <h1>ID: {{ $route.params.id }}</h1>
            </Container>
        </Section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadcrumbs: [{
                text: this.$t('links.home'),
                to: this.$routes.home.path
            },{
                text: this.$t('links.faq'),
                to: this.$routes.faq.path
            },{
                text: this.$route.params.id,
            }],
        }
    }
}
</script>