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
        justify-content: space-between;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    &__list-item {
        width: 100%;
        margin-bottom: 16px;

        &::before {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-curious-blue;
            margin-right: 10px;
        }
    }


    @include phone-big {
        
        &__list-item {
            width: 50%;
        }
    }

    @include tablet {
        
        &__list-item {
            width: 33.33%;
        }
    }
}
</style>