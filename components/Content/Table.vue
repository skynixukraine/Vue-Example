
<template>
	<div class = "table">
		<div class = "table__info">
			<div class = "table__info-count">
				1 - 50 from 120
			</div>
			<div class = "table__info-nav">
				<NuxtLink class = "table__info-link table__info-prev" to = "/"></NuxtLink>
				<NuxtLink class = "table__info-link table__info-next" to = "/"></NuxtLink>
			</div>
		</div>
		
		<div class = "table__content">
			<div class = "table__header">
				<div class = "table__header-item">Question</div>
				<div class = "table__header-item enquiries-id__answer">Answer</div>
			</div>
			<div class = "table__main">
				<div class = "table__main-items">
					<div class = "table__main-item">Question 1</div>
					<div class = "table__main-item enquiries-id__answer">Answer 1</div>
				</div>
				<div class = "table__main-items">
					<div class = "table__main-item">Question 2</div>
					<div class = "table__main-item enquiries-id__answer">Answer 2</div>
				</div>
			</div>
		
		</div>
	</div>
</template>

<style lang = "scss">
	.table {
		position      : relative;
		margin-bottom : 50px;
		
		&__info {
			top         : -30px;
			right       : 0;
			display     : flex;
			position    : absolute;
			align-items : center;
			
			&-nav {
				display     : flex;
				align-items : center;
				margin-left : 50px;
			}
			
			&-link {
				&:after {
					$size : 20px;
					width   : $size;
					height  : $size;
					display : block;
					content : ' ';
				}
			}
			
			&-prev {
				&:after {
					transform        : rotate(90deg);
					background-image : url("~static/images/icons/arrow-down.svg");
					
				}
			}
			
			&-next {
				margin-left : 20px;
				
				&:after {
					transform        : rotate(-90deg);
					background-image : url("~static/images/icons/arrow-down.svg");
				}
			}
		}
		
		&__header {
			display        : flex;
			position       : relative;
			padding-bottom : 10px;
			
			&:after {
				right            : 0;
				width            : calc(100% - 25px);
				height           : 9px;
				bottom           : 0;
				content          : ' ';
				position         : absolute;
				background-color : $color-table-border;
			}
			
			&-item {
				color      : $color-curious-blue;
				padding    : 0px 0px 5px 25px;
				flex-basis : 20%;
			}
		}
		
		&__main {
			&-items {
				display       : flex;
				position      : relative;
				min-height    : 57px;
				padding-top   : 10px;
				border-radius : 4px;
				
				&:after {
					right            : 0;
					width            : calc(100% - 25px);
					height           : 1px;
					bottom           : 0;
					content          : ' ';
					position         : absolute;
					background-color : $color-table-border;
				}
				
				&:hover {
					color            : $color-river-bed;
					cursor           : pointer;
					background-color : $color-white;
				}
			}
			
			&-item {
				flex-basis   : 20%;
				padding-left : 25px;
			}
		}
		
	}
	</style>