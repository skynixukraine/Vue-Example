<template lang = "html">
	<div class = "enquries-status"><span class = "enquries-status__title">Status:</span>
		<span class = "enquries-status__awaiting-your">{{model.status}}</span></div>
</template>

<script>
    export default {
        data(){
            return {
                model: {
                    status: this.$store.state.enquires.doctorEnquire.status,
                },
            };
        },
    }
</script>

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