<template>
    <div>
        <!-- search (NO REDIRECT) -->
        <div class="row mt-3 mb-3">
            <div class="col-12">
                <b-form class="search-bar" @submit.prevent="getVideos">
                    <b-form-group id="input-group-1">
                        <b-form-input id="input-1" type="text" placeholder="Pesquisar Vídeos" v-model="search"></b-form-input>
                        <b-button variant="primary" class="ml-2" type="submit"><b-icon icon="search"></b-icon></b-button>
                    </b-form-group>
                </b-form>
            </div>
        </div>

        <!-- alerts -->
        <div class="row" v-if="error == true">
            <div class="col-12">
                <b-alert show variant="danger">
                    Ops, aconteceu algo errado a busca não pode ser concluída
                </b-alert>
            </div>
        </div>
        <div class="row" v-if="emptySearch == true">
            <div class="col-12">
                <b-alert show variant="warning">
                    Digite algo para buscar...
                </b-alert>
            </div>
        </div>

        <!-- videos result -->
        <div class="row align-items-strech" v-bind:class="hasVideos()">
            <div class="col-12">
                <h5 style="font-weight: 400">Resultados para: <strong>{{this.searchDisplay}}</strong></h5>
            </div>
            <div class="col-md-2 col-lg-3 mb-3 mt-3" v-for="(video,v) in videos" :key="v">
                <b-card :img-src="video.snippet.thumbnails.medium.url" :img-alt="video.snippet.title" img-top class="h-100 card-video">
                    <b-card-text>
                        {{video.snippet.title.substring(0,50)}} {{(video.snippet.title.length >= 50) ? '...' : ''}}
                    </b-card-text>
                    <router-link :to="{name: 'Player', params: {id: video.id.videoId , video: video, search: search}}"  class="btn btn-outline-primary btn-block">Visualizar</router-link>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "List",
    data() {
        return {
            searchDisplay: '',
            search: '',
            videos:[],
            error: false,
            emptySearch: false
        }
    },
    created() {
        this.search = this.$route.params.search
        if(this.search != undefined)
            this.getVideos()
        else 
            this.$router.push({name: 'Home'})

    },
    methods: {
        hasVideos() {
            return (this.videos.length) ? 'has-videos' : 'no-has-videos'
        },
        getVideos() {     
            this.videos = [] 
            if(this.search.length) {
                this.emptySearch = false
                this.$http.get('https://www.googleapis.com/youtube/v3/search',{
                    params:{
                        key: `${process.env.VUE_APP_G_KEY}`,
                        part: 'snippet',
                        q: this.search,
                        maxResults: 12,
                        type: 'video'
                    }
                }).then(res => {
                    this.searchDisplay = this.search
                    this.videos = res.data.items
                    console.log(res)
                    this.error = false
                }).catch(error => {
                    console.log(error)
                    this.error = true
                    setTimeout(()=> this.error = false, 5000)
                })
            } else {
                this.emptySearch = true
            }
        },
    }
}
</script>
<style lang="sass">
    .has-videos
        opacity: 1
        transition: opacity .3s ease
    .no-has-videos
        opacity: 0
        transition: opacity .3s ease
    
</style>