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
				<div class = "table__header-item">Enquiry ID</div>
				<div class = "table__header-item">First Name</div>
				<div class = "table__header-item">Last Name</div>
				<div class = "table__header-item">Enquiry Date</div>
				<div class = "table__header-item">Last Contact</div>
				<div class = "table__header-item">Status</div>
			</div>
			<div class = "table__main">
				<NuxtLink :to="$routes" class = "table__main-items">
					<div class = "table__main-item">1</div>
					<div class = "table__main-item">Doe</div>
					<div class = "table__main-item">Jane</div>
					<div class = "table__main-item">dd/mm/yyyy hh:mm </div>
					<div class = "table__main-item">dd/mm/yyyy hh:mm </div>
					<div class = "table__main-item">awaiting patient's response</div>
				</NuxtLink>
				<NuxtLink :to="$routes" class = "table__main-items">
					<div class = "table__main-item">2</div>
					<div class = "table__main-item">Doe</div>
					<div class = "table__main-item">Jane</div>
					<div class = "table__main-item">dd/mm/yyyy hh:mm</div>
					<div class = "table__main-item">dd/mm/yyyy hh:mm</div>
					<div class = "table__main-item">awaiting patient's response</div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>