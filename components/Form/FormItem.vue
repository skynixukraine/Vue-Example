<template>
    <div class="form-item">
        <header class="form-item__header" v-if="title">{{ title }}</header>
        <div class="form-item__main">
            <slot></slot>
        </div>
        <footer class="form-item__footer" v-if="error">{{ error }}</footer>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    error: {
        type: String,
        default: ''
    }
}
</script>