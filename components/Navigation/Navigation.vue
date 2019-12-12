<template>
    <nav class="navigation">
        <ul class="navigation__list">
            <li class="navigation__item" v-for="link in links" :key="link.id">
                <NuxtLink :to="link.to" class="navigation__link">{{ link.text }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    computed: {
        links() {
            return [
                {
                    id: 1,
                    to: this.$routes.dermatologists.path,
                    text: this.$t('navigation.dermatologists')
                },
                {
                    id: 2,
                    to: this.$routes.advantages.path,
                    text: this.$t('navigation.advantages')
                },
                {
                    id: 3,
                    to: this.$routes.faq.path,
                    text: this.$t('navigation.faq')
                },
                {
                    id: 4,
                    to: this.$routes.about.path,
                    text: this.$t('navigation.about')
                },
                {
                    id: 5,
                    to: this.$routes.jobs.path,
                    text: this.$t('navigation.jobs')
                },
            ]
        }
    }
}
</script>