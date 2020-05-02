<template>
    <div>
        <b-form class="search-bar" @submit="goSearch">
            <b-form-group id="input-group-1" class="m-0">
                <b-form-input id="input-1" type="text" placeholder="Pesquisar Vídeos" v-model="search"></b-form-input>
                <b-button variant="primary" class="ml-2" type="submit"><b-icon icon="search"></b-icon></b-button>
            </b-form-group>
        </b-form>
    </div>
</template>
<script>
export default {
    name: "SearchRedirect",
    data() {
        return {
            search: ""
        }
    },
    methods: {
        goSearch(e) {
            e.preventDefault()
            this.$router.push({name: "Search", params: {search: this.search}})
        }
    }
}
</script>