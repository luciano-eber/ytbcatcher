<template>
    <div>
        <!-- search -->
        <div class="row mt-3 mb-3">
            <div class="col-12">
                <search-redirect></search-redirect>
            </div>
        </div>
        <!-- back search -->
        <div class="row">
            <div class="col-12">
                <b-button variant="outline-primary" @click="$router.go(-1)">Voltar para pesquisa "{{search}}"</b-button>
            </div>
        </div>
        <!-- player ytb -->
        <div class="row mt-3">
            <div class="col-12 col-iframe">
                <iframe id="ytplayer" type="text/html" height="100%" width="100%" :src="url" frameborder="0"/>
            </div>
            <div class="col-12 mt-3">
                <h5>{{video.snippet.title}}</h5>
            </div>
        </div>
    </div>
</template>
<script>
import SearchRedirect from './../components/SearchRedirect'
export default {
    name: "Player",
    components:{ SearchRedirect },
    created() {
        this.video = this.$route.params.video
        this.videoId = this.$route.params.id
        // this.search = this.$route.params.search
        this.url = `https://www.youtube.com/embed/${this.videoId}`
        this.search = this.$route.params.search
    },
    data() {
        return {
            video: null,
            videoId: '',
            url: '',
            search: ''
        }
    }
}
</script>
<style lang="sass">
.col-iframe
    height: 20rem
    @media(min-width: 768px)
        height: 27rem
    @media(min-width: 992px)
        height: 35rem
    @media(min-width: 1200px)
        height: 40rem


    

</style>