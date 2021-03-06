<template>
    <div class="why-info">
        <div class="why-info__item">
            <h2 class="why-info__title">Die Gründung und die Ziele von Online Hautarzt vor Ort</h2>
            <img class="why-info__image" :src="require('~/static/images/images/iphonehand.jpg')" alt="iphone and hand"
            v-show="windowWidth >= 720"
            >
        </div>
        <div class="why-info__item">
            <p>Der Online Hautarzt ist ein von der Landesärztekammer bereits im Oktober 2018 genehmigtes und <a href="https://www.nct-heidelberg.de/das-nct/newsroom/pressemitteilungen/details/fachaerztliche-diagnostik-ohne-ansteckungsgefahr-online-hautarzt-vor-ort.html" class="link link--small-blue">mehrfach ausgezeichnetes Modellprojekt</a>, das in kooperativer Zusammenarbeit von Heidelberger Hautärzten und Wissenschaftlern des Nationalen Centrums für Tumorerkrankungen entwickelt wurde. Bis vor wenigen Monaten war das Angebot ausschließlich für Hautärzte in Baden-Württemberg zugelassen. Erst im Dezember 2019 erhielt das Projekt die Genehmigung der Landesärztekammer, auch Hautärzte außerhalb Baden-Württembergs aufnehmen zu dürfen. So wurde der bereits lange geplante „Online Hautarzt vor Ort“ möglich. Patienten können nun langfristig auch Hautärzte aus ihrer näheren Umgebung, die sie idealerweise bereits persönlich kennen, für die individuelle Fernbehandlung auswählen.</p>
            <p v-show="isTextShow || windowWidth >= 720">Nicht geändert hat sich unser hoher Anspruch an die Beratungsqualität: Nur Hautärzte aus Deutschland mit bestandener Facharztprüfung und vielen Jahren klinischer Erfahrung dürfen Ihre Anfragen beantworten. Der Dienst wird zudem intern sowie extern an der Universitäts-Hautklinik Essen wissenschaftlich evaluiert und stetig verbessert.</p>
            <p v-show="isTextShow || windowWidth >= 720">Wir möchten weiterhin Barrieren senken, auch für Geringverdiener: Da wir die niedrigsten Betriebskosten haben, sind wir der günstigste Anbieter, der fachärztliche Beratungsqualität anbietet. Darüber hinaus sind wir der einzige zugelassene Online-Hautarzt-Dienst aus Deutschland.</p>
            <p v-show="isTextShow || windowWidth >= 720">Zuletzt arbeiten wir nicht – wie die meisten Anbieter – mit internationalen Versandapotheken zusammen, sondern unterstützen die Apotheken vor Ort, die den größten Teil der Therapeutika in der Dermatologie zum kleinen Betrag frei verkäuflich anbieten, falls diese überhaupt notwendig sein sollten.</p>
            <p v-show="isTextShow || windowWidth >= 720" style="color:#0F44B2;">Das Modellprojekt Online Hautarzt bleibt somit nachhaltig gut für alle: Für Patienten, für Hautärzte und für die lokalen Apotheken vor Ort.</p>
            <button class="button-more-less" @click="onToggleText" v-if="windowWidth < 720">Weiterlesen</button>
            
            <img class="why-info__image" :src="require('~/static/images/images/iphonehand.jpg')" alt="iphone and hand"
            v-show="windowWidth < 720"
            >
        </div>
    </div>
</template>

<script>
// mixins
import window from '~/mixins/window'

export default {
    mixins: [window],
    data() {
        return {
            isTextShow: false,
        }
    },
    watch: {
        windowWidth(width) {
            if (width >= 720) {
                this.isTextShow = false
            }
        }
    },
    methods: {
        onToggleText() {
            this.isTextShow = !this.isTextShow
        }
    }
}
</script>

<style lang="scss" scoped>
.why-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__item {
        width: 100%;

        &:first-child {
            margin-bottom: 32px;
        }

        p {
            margin-bottom: 30px;
            line-height: 1.56;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &__image {
        max-width: 100%;
        display: block;
        position: relative;
        z-index: 1;
        margin-top:  40px;
    }

    @include tablet {
        &__item {
        
            &:first-child {
                width: 42.857%;
                margin-bottom: 0;
            }

            &:last-child {
                width: 51.428%;
            }
        }

        &__image {
            margin-top:  0;
        }
    }
}
</style>
