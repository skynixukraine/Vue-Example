<template>
    <div class="diseases-info">
        <h3 class="diseases-info__title">Bei welchen Hauterkrankungen kann Online Hautarzt vor Ort genutzt werden?</h3>
        <p class="diseases-info__text">Unsere Fachärzte für Haut- & Geschlechtskrankheiten behandeln Hautprobleme jeder Art und in jeder Region des Körpers. Zur allgemeinen Orientierung sind hier die häufigsten Erkrankungsbilder mit teilweise weiterführenden Informationen zu Ursachen, Symptomen und Therapie aufgeführt:</p>
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
                title: 'Hautausschlag'
            },{
                title: 'Akne'
            },{
                title: 'Balanitis (Eichelentzündung)'
            },{
                title: 'Hautkrebs'
            },{
                title: 'Feigwarzen'
            },{
                title: 'Schuppenflechte'
            },{
                title: 'Bakterielle Infektionen'
            },{
                title: 'Hämatome'
            },{
                title: 'Rosazea'
            },{
                title: 'Blutschwämmchen'
            },{
                title: 'Kleienpilzflechte'
            },{
                title: 'Pigmentstörungen'
            },{
                title: 'Herpes Infektionen'
            },{
                title: 'Follikulitis'
            },{
                title: 'Hautwolf'
            },{
                title: 'Insektenstiche'
            },{
                title: 'Nesselsucht'
            },{
                title: 'Zysten'
            },{
                title: 'Warzen'
            },{
                title: 'Pilzinfektionen'
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