<template>
    <div class="home-search">
        <img src="./../assets/logo.png">
        <b-form class="search-bar" @submit="goSearch">
            <b-form-group id="input-group-1">
                <b-form-input id="input-1" type="text" placeholder="Pesquisar Vídeos" v-model="search"></b-form-input>
                <b-button variant="primary" class="ml-2" type="submit"><b-icon icon="search"></b-icon></b-button>
            </b-form-group>
        </b-form>
    </div>
</template>
<script>
export default {
    name: "Home",
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
<style lang="sass">
.home-search
    flex-flow: column nowrap
    justify-content: center
    height: 100vh

.home-search, .home-search div
    display: flex
    width: 100%
    align-items: center

    .search-bar input, button
        height: 70px


.card-video
    .card-body
        display: flex
        flex-flow: column nowrap
        justify-content: space-between
    
</style>