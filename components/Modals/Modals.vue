<template>
    <div class="modals">
        <RegisterModal />
    </div>
</template>

<script>
import RegisterModal from "~/components/Modals/RegisterModal"

export default {
    components: {
        RegisterModal
    }
}
</script>

<style lang="scss">
.modal {

    &__close-button {
        padding: 0;
        margin: 0;
        border: none;
        width: 32px;
        height: 32px;
        background-image: url('~static/images/icons/close.svg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        position: absolute;
        top: 16px;
        right: 16px;
    }

    &__main {
        margin-bottom: 40px;
    }

    & .v--modal {
        padding: 64px 48px;
        background: $color-white;
        border-radius: 20px;
        text-align: center;
    }
}
</style>