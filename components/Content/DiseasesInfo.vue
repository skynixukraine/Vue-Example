<template>
    <div class="diseases-info">
        <h2 class="diseases-info__title">Bei welchen Hauterkrankungen kann OnlineDoctor genutzt werden?</h2>
        <p class="diseases-info__text">Bei OnlineDoctor erhalten Sie professionelle Ersthilfe bei Hautproblemen jeder Art. Hier nur einige Beispiele:</p>
        <ul class="diseases-info__list">
            <li class="diseases-info__list-item" v-for="(problem, index) in problems" :key="index">{{ problem.title }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            problems: [{
                title: 'Ausschlag'
            },{
                title: 'Allergische Reaktionen'
            },{
                title: 'Pilzinfektionen'
            },{
                title: 'Abszesse'
            },{
                title: 'Warzen'
            },{
                title: 'Hagelkörner'
            },{
                title: 'Ekzeme'
            },{
                title: 'Altersflecken'
            },{
                title: 'Gürtelrose'
            },{
                title: 'Muttermale'
            },{
                title: 'Ausschlag'
            },{
                title: 'Insektenstiche'
            },{
                title: 'Akne'
            },{
                title: 'Hautkrebs'
            },{
                title: 'uvm.'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.diseases-info {
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    &__list {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
    }

    &__list-item {
        flex: 0 0 33.33%;
        margin: 0 0 16px;
    }
}
</style>