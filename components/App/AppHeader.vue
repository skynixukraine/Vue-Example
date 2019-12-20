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
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 30px;
    background: rgba(0,0,0,.5);

    &__inner {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
    }
}
</style>