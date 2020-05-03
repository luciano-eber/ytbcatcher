<template>
    <div>
        <!-- search (NO REDIRECT) -->
        <div class="row mt-3 mb-3 align-items-center">
            <div class="col-2">
                <img src="./../assets/youtube-svg-catcher.svg" style="max-width: 100%; cursor:pointer;" @click="$router.push('/')">
            </div>
            <div class="col-10">
                <b-form class="search-bar" @submit.prevent="searchInput">
                    <b-form-group id="input-group-1" class="m-0">
                        <b-form-input id="input-1" type="text" placeholder="Pesquisar Vídeos" v-model="search"></b-form-input>
                        <b-button variant="primary" class="ml-2" type="submit"><b-icon icon="search"></b-icon></b-button>
                    </b-form-group>
                </b-form>
            </div>
        </div>

        <!-- alerts -->
        <div class="row" style="margin-top: 5rem" v-if="error == true">
            <div class="col-md-4">
                <img src="./../assets/sad.svg" style="max-width: 100%;">
            </div>
            <div class="col-md-8 d-flex align-items-center justify-content-center align-items-md-start flex-column">
                <h1>Vish, algo deu errado...</h1><br>
                <h3 style="font-weight: 300">Tente novamente, se o erro persistir significa que a cota do ytb acabou. Logo volta...</h3>
            </div>
        </div>
        <div class="row" v-if="emptySearch == true">
            <div class="col-12">
                <b-alert show variant="warning">
                    Digite algo para buscar...
                </b-alert>
            </div>
        </div>

        <div v-bind:class="hasVideos()">
            <!-- top pagination -->
            <search-paginate :pagination="pagination"></search-paginate>

            <!-- videos result -->
            <div class="row align-items-strech">
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

            <!-- bottom pagination -->
            <search-paginate :pagination="pagination"></search-paginate>
        </div>
    </div>
</template>
<script>
import EventBus from './../helpers/eventBus';
import SearchPaginate from './../components/SearchPaginate'

export default {
    name: "List",
    components: { SearchPaginate },
    data() {
        return {
            searchDisplay: '',
            search: '',
            videos:[],
            error: false,
            errorMessage: '',
            emptySearch: false,
            pagination:{
                prev: false,
                next: false,
                prevToken: '',
                nextToken: ''
            }
        }
    },
    created() {
        this.search = this.$route.params.search
        if(this.search != undefined)
            this.getVideos()
        else 
            this.$router.push({name: 'Home'})

        EventBus.$on('nextClickPagination', (res) => this.getVideos({pageToken: res, search: this.searchDisplay}))
        EventBus.$on('prevClickPagination', (res) => this.getVideos({pageToken: res, search: this.searchDisplay}))

    },
    methods: {
        hasVideos() {
            return (this.videos.length) ? 'has-videos' : 'no-has-videos'
        },
        searchInput() {
            if(this.search.length) {
                this.emptySearch = false
                this.getVideos()
            } else {
                this.emptySearch = true
                setTimeout(() => this.emptySearch = false, 4000)
            }
            
        },
        getVideos(settings) {  
            if(this.search == '')
                this.search = this.$route.params.search
            this.videos = []
            let params = {
                key: `${process.env.VUE_APP_G_KEY}`,
                part: 'snippet',
                q: this.search,
                maxResults: 12,
                type: 'video',
            }

            if(settings != undefined) {
                if('pageToken' in settings) params.pageToken = settings.pageToken
                if('search' in settings) params.q = settings.search
            }
            
            this.$http.get('https://www.googleapis.com/youtube/v3/search',{
                params: params
            }).then(res => {
                this.searchDisplay = this.search
                if(settings != undefined) 
                    if ('pageToken' in settings) this.search = this.searchDisplay
                else 
                    this.searchDisplay = this.search

                this.videos = res.data.items
                this.error = false

                if('prevPageToken' in res.data) {
                    this.pagination.prev = true
                    this.pagination.prevToken = res.data.prevPageToken
                } else {
                    this.pagination.prev = false
                    this.pagination.prevToken = ''
                }
                if('nextPageToken' in res.data) {
                    this.pagination.next = true
                    this.pagination.nextToken = res.data.nextPageToken
                } else {
                    this.pagination.next = false
                    this.pagination.nextToken = ''
                }

            }).catch(error => {
                console.log(error)
                this.error = true
            })
        }
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