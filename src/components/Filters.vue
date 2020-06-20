<template>
    <div>
        <slot v-bind:filter="onFilter"></slot>
    </div>
</template>

<script>
    export default {
        methods: {
            onFilter (filters) {
                window.DatatableEventBus.$emit('filter-listener', filters)
            }
        }
    }
</script>

<style scoped>

</style>