<template>
    <div class="mt-3 mb-3 row justify-content-between d-flex flex-wrap align-items-center">
        <div class="col-6">
            <b-button variant="primary" v-if="pagination.prev" @click="prevClick()">Anterior</b-button>
        </div>
        <div class="col-6 d-flex justify-content-end">
            <b-button variant="primary" v-if="pagination.next" @click="nextClick()">Próxima</b-button>
        </div>
    </div>
</template>
<script>
import EventBus from './../helpers/eventBus';

export default {
    name: "SearchPaginate",
    props: ['pagination'],
    methods: {
        nextClick() {
            this.pageToken = this.pagination.nextToken
            EventBus.$emit('nextClickPagination', this.pagination.nextToken)
        },
        prevClick() {
            this.pageToken = this.pagination.prevToken
            EventBus.$emit('prevClickPagination', this.pagination.prevToken)
        }

    }
}
</script>