<template>
    <div class="diseases-info">
        <h3 class="diseases-info__title">Bei welchen Hauterkrankungen kann OnlineDoctor genutzt werden?</h3>
        <p class="diseases-info__text">Bei OnlineDoctor erhalten Sie professionelle Ersthilfe bei Hautproblemen jeder Art. Hier nur einige Beispiele:</p>
        <ul class="diseases-info__list">
            <li class="diseases-info__list-item" v-for="(problem, index) in problems" :key="index"><span>{{ problem.title }}</span></li>
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

    &__title {
        max-width: 640px;
    }

    &__text {
        max-width: 640px;
        margin-bottom: 24px;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 0 0 25px;
        margin: 0;
    }

    &__list-item {
        flex: 0 0 33.33%;
        margin: 0;
        font-size: 30px;
        color: $color-curious-blue;

        span {
            font-size: 18px;
            line-height: 28px;
            color: $color-rolling-stone;
        }
    }
}
</style>