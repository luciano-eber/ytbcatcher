<template>
    <div>
        
    </div>
</template>
<script>
export default {
    name: "Player",
    created() {
        console.log(this.$route.params.id)
        console.log(this.$route.params.video)
    }
}
</script>