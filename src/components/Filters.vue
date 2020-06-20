<template>
    <div>
        <slot v-bind:filter="onFilter"></slot>
    </div>
</template>

<script>
    export default {
        props: ['sendListener']
        methods: {
            onFilter (filters) {
                if (this.sendListener)
                    window.DatatableEventBus.$emit('filter-listener-' + this.sendListener, filters)
            }
        }
    }
</script>

<style scoped>

</style>
