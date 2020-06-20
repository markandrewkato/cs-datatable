<template>
    <table>
        <thead>
        <tr>
            <slot name="header"></slot>
        </tr>
        </thead>
        <tbody>
        <slot v-bind:items="items"></slot>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['url'],
        data () {
            return {
                items: [],
                page: 1,
                search: '',
                total: 10,
                filters: null
            }
        },
        created () {
            window.DatatableEventBus.$on('filter-listener', data => {
                this.filters = data;
                this.page = null;
                this.search = null;
                this.fetch(this.url);
            });

            window.DatatableEventBus.$on('change-entries', data => {
                this.page = null;
                this.total = data;
                this.fetch(this.url);
            });

            window.DatatableEventBus.$on('search', data => {
                this.page = null;
                this.search = data;
                this.filters = null;
                this.fetch(this.url);
            });

            window.DatatableEventBus.$on('move-to', data => {
                this.page = null;
                this.fetch(data);
            });

            window.DatatableEventBus.$on('set-page', data => {
                this.page = data;
                this.fetch(this.url)
            });
        },
        mounted () {
            this.fetch(this.url)
        },
        methods: {
            fetch (url) {
                window.axios({
                    method: 'GET',
                    url: url,
                    params: {
                        page: this.page,
                        search: this.search,
                        total: this.total,
                        filters: this.filters
                    }
                }).then(res => {
                    let response = res.data;
                    this.items = response.data;
                    this.page = response.current_page;

                    delete response.data;
                    window.DatatableEventBus.$emit('pagination', response)
                })
            }
        }
    }
</script>

