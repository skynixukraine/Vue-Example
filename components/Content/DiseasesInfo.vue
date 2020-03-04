<template>
    <div class="diseases-info">
        <h3 class="diseases-info__title">Bei welchen Hauterkrankungen kann Online Hautarzt vor Ort genutzt werden?</h3>
        <p class="diseases-info__text">Unsere Fachärzte für Haut- & Geschlechtskrankheiten behandeln Hautprobleme jeder Art und in jeder Region des Körpers. Zur allgemeinen Orientierung sind hier die häufigsten Erkrankungsbilder mit teilweise weiterführenden Informationen zu Ursachen, Symptomen und Therapie aufgeführt:</p>
        <ul class="diseases-info__list diseases-info__list--col1">
            <li class="diseases-info__list-item" v-for="(problem, index) in problems.col1" :key="index"><span>{{ problem.title }}</span></li>
        </ul>
        <ul class="diseases-info__list diseases-info__list--col2">
            <li class="diseases-info__list-item" v-for="(problem, index) in problems.col2" :key="index"><span>{{ problem.title }}</span></li>
        </ul>
        <ul class="diseases-info__list diseases-info__list--col3">
            <li class="diseases-info__list-item" v-for="(problem, index) in problems.col3" :key="index"><span>{{ problem.title }}</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {

        const problems = [{
            title: 'Akne'
        },{
            title: 'Bakterielle Infektionen'
        },{
            title: 'Balanitis (Eichelentzündung)'
        },{
            title: 'Blutschwämmchen'
        },{
            title: 'Feigwarzen'
        },{
            title: 'Follikulitis'
        },{
            title: 'Hämatome'
        },{
            title: 'Hautausschlag'
        },{
            title: 'Hautkrebs'
        },{
            title: 'Hautwolf'
        },{
            title: 'Herpes Infektionen'
        },{
            title: 'Insektenstiche'
        },{
            title: 'Kleienpilzflechte'
        },{
            title: 'Nesselsucht'
        },{
            title: 'Pigmentstörungen'
        },{
            title: 'Pilzinfektionen'
        },{
            title: 'Rosazea'
        },{
            title: 'Schuppenflechte'
        },{
            title: 'Warzen'
        },{
            title: 'Zysten'
        }];
        const indexCol2 = [0, 10, 1, 11, 2, 12, 3, 13, 4, 14, 5, 15, 6, 16, 7, 17, 8, 18, 9, 19];
        const indexCol3 = [0, 7, 13, 1, 8, 14, 2, 9, 15, 3, 10, 16, 4, 11, 17, 5, 12, 18, 6, 19];
        const col2 = [];
        const col3 = [];

        for(let i=0; i<problems.length; i++){
            col2.push(problems[indexCol2[i]]);
            col3.push(problems[indexCol3[i]]);
        }
        return {
            problems: {
                col1: problems,
                col2: col2,
                col3: col3
            }
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

        &--col2,
        &--col3{
            display: none;
        }
        &--col1{
            display: flex;
        }
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
        &__list {
            &--col1,
            &--col3{
                display: none;
            }
            &--col2{
                display: flex;
            }
        }
    }

    @include tablet {
        
        &__list-item {
            width: 33.33%;
        }
        &__list {
            &--col1,
            &--col2{
                display: none;
            }
            &--col3{
                display: flex;
            }
        }
    }
}
</style>