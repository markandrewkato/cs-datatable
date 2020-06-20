<template>
    <select v-model="amount"
            @change.prevent="changeTotalEntries">
    <option v-for="i in options" :value="i" :key="i" v-text="i"></option>
</select>
</template>

<script>
    export default {
        props: {
            sendListener: String,
            total: {
                type: Number,
                default: 10
            },
            options: {
                type: Array,
                default: function () {
                    return [10, 20, 50, 100, 150, 200]
                }
            }
        },
        data () {
            return {
                amount: this.total
            }
        },
        methods: {
            changeTotalEntries () {
                if (this.sendListener)
                    window.DatatableEventBus.$emit('change-entries-' + this.sendListener, this.amount);
            },
        }
    }
</script>

