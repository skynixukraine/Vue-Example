<template>
	<button class = "link logout__link" @click.stop = "onLogout">Logout</button>
</template>

<script>
    export default {
        methods : {
            onLogout(){
                this.$store.dispatch("user/LOGOUT_USER", this.$cookies.get(this.$cookie.names.token))
                    .then(response => {
                        this.removeUserCookie();
                        this.$router.push({path : this.$routes.home.path});
                    });
            },
            removeUserCookie(){
                this.$cookies.remove(this.$cookie.names.token);
                this.$cookies.remove(this.$cookie.names.tokenId);
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.logout__link {
		color            : $color-white;
		border           : none;
		padding          : 0;
		line-height      : 1.28;
		background-color : transparent;
	}
</style>