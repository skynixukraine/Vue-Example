<template>
    <NuxtLink :to="'/'" class="link link--card">
        <div class="doctor-card">
            <header class="doctor-card__header">
                <img src="https://placeimg.com/352/480/people?t=1579768204582" alt="doctor image">
            </header>
            <div class="doctor-card__main">
                
                <h3 class="doctor-card__title">Doctor Name</h3>
                
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ullam labore dolor, laboriosam autem officiis ipsam incidunt voluptas, quidem reprehenderit vero consequatur, sint deleniti corporis sapiente deserunt provident adipisci reiciendis.</p>
            </div>
        </div>
    </NuxtLink>
</template>

<script>
export default {
    props: {
        doctor: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
.doctor-card {
    font-family: 'Sans';

    &__header{
        img{
            max-width: 352px;
        }
    }

}
</style>