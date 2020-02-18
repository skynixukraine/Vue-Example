<template>
	<div class = "table">
		<div class = "table__info">
			<div class = "table__info-count">
				1-50 from 120
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
					<div class = "table__main-item" data-title="Question">Question 1</div>
					<div class = "table__main-item enquiries-id__answer" data-title="Answer">Answer 1</div>
				</div>
				<div class = "table__main-items">
					<div class = "table__main-item" data-title="Question">Question 2</div>
					<div class = "table__main-item enquiries-id__answer" data-title="Answer" >Answer 2</div>
				</div>
			</div>
		</div>
	</div>
</template>