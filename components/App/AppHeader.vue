<template>
    <header class="app-header">
        <div class="app-header__inner">
            <div class="app-header__item">
                <logo />
            </div>
            <div class="app-header__item">
                <Navigation />
            </div>
        </div>
    </header>
</template>

<script>
import Logo from "~/components/Logo/Logo"
import Navigation from "~/components/Navigation/Navigation"

export default {
    components: {
        Logo,
        Navigation
    }
}
</script>

<style lang="scss">
.app-header {
    padding: 20px 0;

    &__inner {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }
}
</style>