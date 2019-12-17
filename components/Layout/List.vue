<template>
    <ul class="list">
        <template v-if="!items.length">
            <li>Items not found.</li>
        </template>
        <template v-if="items.length">
            <li
                class="list__item"
                v-for="item in items"
                :key="item.id"
                :style="cssProperties"
            >
                <slot :item="item"></slot>
            </li>
        </template>
    </ul>
</template>

<script>
import _ from 'lodash'

const columnWidthDefault = 100

export default {
    props: {
        items: {
            type: Array,
            default: () => [],
            required: true
        },
        columns: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        columnWidth() {
            switch (this.$mq) {
                case 'phone':
                    return this.columns[0]
                    break;
                case 'phoneBig':
                    return this.columns[1]
                    break;
                case 'tablet':
                    return this.columns[2]
                    break;
                case 'tabletBig':
                    return this.columns[3]
                    break;
                case 'desktop':
                    return this.columns[4]
                    break;
                case 'desktopBig':
                    return this.columns[5]
                    break;
                default:
                    return columnWidthDefault
            }
        },
        cssProperties() {
            if ( _.isEmpty(this.columns) ) return {}
            return {
                'flex': `0 0 ${this.columnWidth}%`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>