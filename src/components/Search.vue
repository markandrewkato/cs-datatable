<template>
    <div class="search">
        <input type="text"
               v-model="query">

        <button type="button"
                @click="search">Search
        </button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                query: ''
            }
        },
        methods: {
            search () {
                window.DatatableEventBus.$emit('search', this.query);
            }
        }
    }
</script>

<style scoped>

</style>
