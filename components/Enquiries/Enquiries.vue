<template lang = "html">
	<div class = "enquiries">
		<div class = "enquiries__filter">
			<form>
				<div class = "enquiries__search">
					<input type = "search" placeholder = "Search" class = "input enquiries__search-input">
				</div>
				<div class = "enquiries__date">
					<h3>Filter by:</h3>
					<div class = "enquiries__date-wrapper">
						<div class = "enquiries__date-item">
							<span class = "enquiries__date-title">Enquiry date</span>
							<div class = "enquiries__date-main">
								<label class = "enquiries__date-field">
									from:
									<input type = "date" class = "enquiries__date-input input">
								</label>
								<label class = "enquiries__date-field">
									to:
									<input type = "date" class = "enquiries__date-input input">
								</label>
							</div>
						</div>
						<div class = "enquiries__date-item">
							<span class = "enquiries__date-title">Last contact date</span>
							<div class = "enquiries__date-main">
								<label class = "enquiries__date-field">
									from:
									<input type = "date" class = "enquiries__date-input input">
								</label>
								<label class = "enquiries__date-field">
									to:
									<input type = "date" class = "enquiries__date-input input">
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class = "enquiries__submit">
					<button class = "link link--button link--button-blue link--button-gradient" type = "submit">Search
					</button>
					<button class = "link link--button link--button-blue link--button-gradient" type = "reset">Reset
					</button>
				</div>
			</form>
		</div>
		<div class = "enquiries__main">
			<Table />
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
	.enquiries {
		margin : 30px 0 20px 0;
		
		&__filter {
			margin-bottom : 90px;
		}
		
		&__search {
			width         : 100%;
			margin-bottom : 25px;
			
			@include tablet-big {
				width : 50%;
			}
		}
		
		&__date {
			margin-bottom : 25px;
			
			&-wrapper {
				display        : flex;
				flex-wrap      : wrap;
				flex-direction : column;
				
				@include tablet-big {
					flex-direction : row;
				}
			}
			
			&-item {
				margin-bottom : 15px;
				
				&:first-child {
					@include tablet-big {
						margin-right : 20px;
					}
				}
			}
			
			&-main {
				display        : flex;
				flex-direction : column;
				align-items    : flex-start;
				
				@include phone-big {
					flex-direction : row;
				}
			}
			
			&-title {
				color         : $color-curious-blue;
				font-weight   : 600;
				margin-bottom : 15px;
			}
			
			&-field {
				display        : flex;
				margin-bottom  : 5px;
				flex-direction : column;
				
				&:first-child {
					@include phone-big {
						margin-right : 15px;
					}
				}
			}
			
			&-input {
				margin-top : 6px;
			}
		}
		
		&__submit {
			.link {
				margin-bottom : 20px;
				@include tablet {
					margin-bottom : 0;
				}
			}
		}
	}
	
	.table__header-item_status {
		position : relative;
		
		&:after {
			$size : 20px;
			top              : 0;
			right            : 16px;
			width            : $size;
			height           : $size;
			margin           : auto;
			bottom           : 0;
			content          : "";
			display          : block;
			position         : absolute;
			pointer-events   : none;
			background-image : url("~static/images/icons/arrow-down.svg");
		}
	}
</style>
