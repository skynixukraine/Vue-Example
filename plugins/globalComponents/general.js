import Vue from "vue"

import Section from "~/components/Section/Section"
import SectionHeader from "~/components/Section/SectionHeader"
import SectionFooter from "~/components/Section/SectionFooter"
import Container from "~/components/Layout/Container"
import List from "~/components/Layout/List"
import Button from "~/components/UI/Button"


// Layout
Vue.component('Section', Section)
Vue.component('SectionHeader', SectionHeader)
Vue.component('SectionFooter', SectionFooter)
Vue.component('Container', Container)
Vue.component('List', List)

// UI
Vue.component('Button', Button)
