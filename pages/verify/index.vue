<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <template v-if="isVerifyRequestSending">
                    <div>Loading...</div>
                </template>
                <template v-if="!isVerifyRequestSending">
                    <div>isUserEmailVerify: {{ isUserEmailVerify }}</div>
                    <div>{{ verifyMessage }}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    beforeCreate() {
        const verifyRequestData = {
                expires: this.$route.query.expires,
                id: this.$route.query.id,
                signature: this.$route.query.signature
            }
        this.$store.dispatch('user/VERIFY_USER_EMAIL', verifyRequestData)
            .then((response) => {
                console.log('VERIFY_USER_EMAIL response: ', response);
            })
            .catch((error) => {
                console.log('VERIFY_USER_EMAIL error: ', error);
            })


        this.$store.dispatch('user/AUTOLOGIN_USER')
    },

    data() {
        return {
            isUserEmailVerify: false,
            isVerifyRequestSending: false,
            verifyMessage: 'Verify email page.',
        }
    }
}
</script>