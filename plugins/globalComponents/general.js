import Vue from "vue"

import Container from "~/components/Layout/Container"

import Section from "~/components/Section/Section"
import SectionHeader from "~/components/Section/SectionHeader"
import SectionFooter from "~/components/Section/SectionFooter"

import Breadcrumbs from "~/components/Page/Breadcrumbs"

import Button from "~/components/UI/Button"


// Layout
Vue.component('Container', Container)

// Section
Vue.component('Section', Section)
Vue.component('SectionHeader', SectionHeader)
Vue.component('SectionFooter', SectionFooter)

// Page
Vue.component('Breadcrumbs', Breadcrumbs)

// UI
Vue.component('Button', Button)
