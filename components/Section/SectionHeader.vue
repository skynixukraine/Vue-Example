<template>
    <header class="section-header" v-if="Object.keys(link).length || title">
        <h2 class="section-header__title" v-if="title">{{ title }}</h2>
        <p class="section-header__content" v-if="Object.keys(link).length">
            <NuxtLink :to="link.to" class="link" exact>
              {{ link.text }}
            </NuxtLink>
        </p>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        link: {
            type: Object,
            default: () => new Object()
        }
    }
}
</script>