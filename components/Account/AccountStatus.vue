<template lang="html">
    <div class="account-status"><span class="account-status__title">Account status:</span> <span class="account-status__pause">Paused</span></div>
</template>

<style lang="scss" scoped>
.account-status {

    &__title {
        display: none;

        @include  tablet { 
            display: inline;
        }
    }

    &__pause {
        color: $color-cinnabar;
    }

}
</style>