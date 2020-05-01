<template>
    <div>
        <!-- Search -->
        <b-form class="home-search" @submit="goSearch">
            <b-form-group id="input-group-1">
                <b-form-input id="input-1" type="text" placeholder="Digite algo para buscar" v-model="search"></b-form-input>
                <b-button variant="primary" class="ml-2" type="submit">Pesquisar</b-button>
            </b-form-group>
        </b-form>

        <!-- Results -->
        <div class="row mt-5 align-items-stretch" v-if="videos.length">
            <div class="col-12">
                <h5>Resultados para {{this.searchDisplay}}</h5>
            </div>
            <div class="col-md-2 col-lg-3 mb-3 mt-3" v-for="(video,v) in videos" :key="v">
                <b-card :img-src="video.snippet.thumbnails.medium.url" :img-alt="video.snippet.title" img-top class="h-100 card-video">
                    <b-card-text>
                        {{video.snippet.title.substring(0,50)}} {{(video.snippet.title.length >= 50) ? '...' : ''}}
                    </b-card-text>
                    <router-link :to="{name: 'Player', params: {id: video.id.videoId , video: video}}"  class="btn btn-outline-primary btn-block">Visualizar</router-link>
                </b-card>
            </div>
        </div>

    </div>
</template>
<script>

export default {
    name: "Home",
    data() {
        return {
            search: '',
            searchDisplay: '',
            videos:[],
        }
    },
    methods: {
        goSearch(e) {
            e.preventDefault()
            if(this.search.length > 0) {
                this.$http.get('https://www.googleapis.com/youtube/v3/search',{
                    params:{
                        key: "AIzaSyCQo7L8BhU-vPztFeev-QqTGRKuLwVshY0",
                        part: 'snippet',
                        q: this.search,
                        maxResults: 6,
                        type: 'video'
                    }
                }).then(res => {
                    this.searchDisplay = this.search
                    this.videos = res.data.items
                }).catch(error => console.log(error))
            }
        },
    }
}
</script>
<style lang="sass">

.home-search
    padding: 2rem 0 0 0
    .form-group
        .bv-no-focus-ring
            display: flex
            flex-flow: row nowrap
            align-items: center
            justify-content: center
            width: 100%
.card-video
    .card-body
        display: flex
        flex-flow: column nowrap
        justify-content: space-between
    
</style>