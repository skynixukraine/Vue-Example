<template lang = "html">
	<div class = "enquiries-id">
		<div class = "enquiries-id__main">
			
			<Table />
			
			<div class = "enquiries-id__atachments">
				<h3 class = "enquiries-id__atachments-title">Attachment: </h3>
				<ul class = "enquiries-id__atachments-items">
					<li class = "enquiries-id__atachments-item">
						<button class = "enquiries-id__atachments-link">Attachment 1</button>
					</li>
					<li class = "enquiries-id__atachments-item">
						<button class = "enquiries-id__atachments-link">Attachment 2</button>
					</li>
					<li class = "enquiries-id__atachments-item">
						<button class = "enquiries-id__atachments-link">Attachment 3</button>
					</li>
				</ul>
				<button  class = "link link--button link--button-blue link--button-gradient" >Download all attachments
				</button>
			</div>
			
			<div class = "enquiries-id__links">
				<button class = "link link--button link--button-blue link--button-gradient" @click="openModal($modals.contactModals)">CONTACT PATIENT</button>
				<button class = "link link--button link--button-blue link--button-gradient">SUBMIT DIAGNOSIS AND CLOSE THE CASE</button>
			</div>
		</div>
		
		<div class = "enquiries-id__footer">
			<buttom class = "link link--button-transparent">GO BACK</buttom>
		</div>
	</div>
</template>

<script>
    import Table from "~/components/Enquiries/EnquiriesTable.vue"
    import modal from '~/mixins/modal'
	
    export default {
        mixins : [
            modal,
        ],
		
        components : {
            Table,
        },
    }
</script>


<style lang = "scss">
	.enquiries-id {
		&__answer {
			flex-basis : 75%;
		}
		
		&__main {
			padding-top : 70px;
		}
		
		&__atachments {
			margin-bottom : 50px;
			&-items {
				list-style : none;
			}
			
			&-item {
				margin-bottom : 10px;
			}
			
			&-link {
				color : $color-rolling-stone;
				cursor : pointer;
				border : none;
				background-color: transparent;
				&:after {
					content : ' (download)';
				}
			}
		}
		
		&__links {
			margin-bottom  : 30px;
			display        : flex;
			flex-direction : column;
			@include tablet {
				flex-direction : row;
			}
			
			.link {
				margin-bottom : 20px;
				@include tablet {
					margin-right : 20px;
				}
			}
		}
	}
</style>
