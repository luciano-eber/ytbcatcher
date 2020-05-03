<template>
    <div class="home-search">
        <img src="./../assets/youtube-svg-catcher.svg" width="400px" style="margin-bottom: 20px;">
        <search-redirect></search-redirect>
    </div>
</template>
<script>
import SearchRedirect from './../components/SearchRedirect'
export default {
    name: "Home",
    components:{ SearchRedirect },
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