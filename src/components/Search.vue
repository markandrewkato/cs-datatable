<template>
    <div>
        <input type="text"
               v-model="query">

        <button type="button"
                @click="search">Search
        </button>
    </div>
</template>

<script>
    export default {
        props: ['sendListener'],
        data () {
            return {
                query: ''
            }
        },
        methods: {
            search () {
                if (this.sendListener)
                    window.DatatableEventBus.$emit('search-' + this.sendListener, this.query);
            }
        }
    }
</script>

<style scoped>

</style>
