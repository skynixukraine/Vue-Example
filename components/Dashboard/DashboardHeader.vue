<template lang = "html">
	<header class = "dashboard-header">
		<div class = "dashboard-header__item">
			<h1 class = "dashboard-header__title">{{ title }}</h1>
		</div>
		<div class = "dashboard-header__item">
			<slot></slot>
		</div>
	</header>
</template>

<script>
    export default {
        props : {
            title : {
                type     : String,
                required : true,
                default  : ""
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.dashboard-header {
		display         : flex;
		align-items     : center;
		border-bottom   : 1px solid $color-mercury;
		padding-bottom  : 8px;
		justify-content : space-between;
		
		&__title {
			font-size     : 24px;
			line-height   : 1.25;
			margin-bottom : 0;
		}
	}
</style>