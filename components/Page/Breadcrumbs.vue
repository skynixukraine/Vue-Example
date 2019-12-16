<template>
    <div class="breadcrumbs">
        <div class="breadcrumbs__item" v-for="(crumb, index) in breadcrumbs" :key="index">
            <template v-if="crumb.hasOwnProperty('to')">
                <nuxt-link :to="crumb.to">{{ crumb.text }}</nuxt-link>
            </template>
            <template v-else>
                <span>{{ crumb.text }}</span>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        breadcrumbs: {
            type: Array,
            required: true
        }
    }
}
</script>