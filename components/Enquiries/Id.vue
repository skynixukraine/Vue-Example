<template lang = "html">
	<div class = "enquiries-id">
		<div class = "enquiries-id__main">
			<Table />
			<div class = "enquiries-id__links">
				<button class = "link link--button link--button-blue link--button-gradient" @click="openModal($modals.sendFindings)">{{ $t('page-enquiries.submit-diagnosis') }}</button>
			</div>
		</div>
		<div class = "enquiries-id__footer">
			<NuxtLink :to = "$routes.enquiries.path" class = "link link--button-transparent">
				GO BACK
			</NuxtLink>
		</div>
	</div>
</template>

<script>
    import Table from "~/components/Enquiries/EnquiriesIdTable.vue"
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
			
			.table__header-item {
				flex-basis: 50%;
			}
			
			&-items {
				min-height: 40px;
				
			}
		}
		
		.table__main {
			&-item {
				flex-basis: 50%;
				font-weight: 600;
				
				&.enquiries-id__answer {
					font-weight: 100;
				}
			}
		}
		
		.edit-answer-area__upload-image__user-image-container {
			width: 40%;
			img {
				width: 100%;
			}
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
				margin-bottom : $main_offset;
				@include tablet {
					margin-right : $main_offset;
				}
			}
		}
	}
</style>
