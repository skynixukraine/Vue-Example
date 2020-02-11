<template lang="html">
    <div class="account-status"><span class="account-status__title">Kontostatus:</span> <span class="account-status__active">aktiv</span></div>
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
    &__active {
        color : $color-user-is-active;
    }

}
</style>