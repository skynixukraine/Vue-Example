<template lang = "html">
	<div class = "enquries-status"><span class = "enquries-status__title">Status:</span>
		<span class = "enquries-status__awaiting-your">awaiting your response</span></div>
</template>

<style lang = "scss" scoped>
	.enquries-status {
		
		&__title {
			display : none;
			
			@include tablet {
				display : inline;
			}
		}
		
		&__awaiting {
			&-your {
				color : $color-cinnabar;
			}
			&-patient {
				color : $color-tory-blue;
			}
		}
		
		&__resolved {
			color : $color-user-is-active;
		}
	}
</style>