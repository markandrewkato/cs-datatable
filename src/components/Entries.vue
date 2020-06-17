<template>
    <div>
        <span class="label">Show Entries:</span>
        <div>
            <select class="h-10 outline-none rounded bg-gray-200"
                    v-model="total"
                    @change.prevent="changeTotalEntries">
                <option v-for="i in [10, 20, 50, 100, 150, 200]" :value="i" :key="i" v-text="i"></option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                total: 10
            }
        },
        methods: {
            changeTotalEntries () {
                window.DatatableEventBus.$emit('change-entries', this.total);
            },
        }
    }
</script>

