<template lang = "html">
	<div class = "enquiries-id">
		
		<div class = "enquiries-id__main">
			
			<Table />
			
			<div class = "enquiries-id__atachments">
				<h3 class = "enquiries-id__atachments-title">Attachment: </h3>
				<ul class = "enquiries-id__atachments-items">
					<li class = "enquiries-id__atachments-item">
						<NuxtLink class = "enquiries-id__atachments-link" to = "/">Attachment 1 (download)</NuxtLink>
					</li>
					<li class = "enquiries-id__atachments-item">
						<NuxtLink class = "enquiries-id__atachments-link" to = "/">Attachment 2 (download)</NuxtLink>
					</li>
					<li class = "enquiries-id__atachments-item">
						<NuxtLink class = "enquiries-id__atachments-link" to = "/">Attachment 3 (download)</NuxtLink>
					</li>
				</ul>
				<button class = "link link--button link--button-blue link--button-gradient">Download all attachments
				</button>
			</div>
			
			<div class = "enquiries-id__links">
				<button class = "link link--button link--button-blue link--button-gradient">CONTACT PATIENT</button>
				<button class = "link link--button link--button-blue link--button-gradient">SUBMIT DIAGNOSIS AND CLOSE THE CASE</button>
			</div>
		</div>
		
		<div class = "enquiries-id__footer">
			<button class = "link link--button-transparent">GO BACK</button>
		</div>
	</div>
</template>npm run dev

<script>
    import Table from "~/components/Content/Table"

    export default {
        components : {
            Table,
        }
    }
</script>


<style lang = "scss">
	.enquiries-id {
		&__answer {
			flex-basis : 80%;
		}
		
		&__main {
			padding-top : 50px;
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
