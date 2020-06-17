<template>
    <div v-if="pagination">
        <div class="entries">
            <p>Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} Entries</p>
        </div>
        <div class="pagination">
            <a class="mx-2" href="#" v-if="!isFirstPage" @click.prevent="move('first')">First</a>
            <a class="mx-2" href="#" v-if="!isFirstPage" @click.prevent="move('prev')">Prev</a>
            <a class="mx-2" href="#"
               @click.prevent="page(i)"
               v-for="i in generateBeforeCurrentPageNumbers()"
               :key="i"
               v-text="i"></a>
            <span class="mx-2 text-gray-800" v-text="pagination.current_page"></span>
            <a class="mx-2" href="#"
               @click.prevent="page(i)"
               v-for="i in generateAfterCurrentPageNumbers()"
               :key="i"
               v-text="i"></a>
            <a class="mx-2" href="#" v-if="!isLastPage" @click.prevent="move('next')">Next</a>
            <a class="mx-2" href="#" v-if="!isLastPage" @click.prevent="move('last')">Last</a>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                pagination: null
            }
        },
        mounted () {
            window.DatatableEventBus.$on('pagination', data => this.pagination = data)
        },
        computed: {
            isFirstPage () {
                return this.pagination.current_page === 1;
            },
            isLastPage () {
                return this.pagination.current_page === this.pagination.last_page;
            }
        },
        methods: {
            move (point) {
                window.DatatableEventBus.$emit('move-to', this.pagination[point + '_page_url']);
            },
            page (number) {
                window.DatatableEventBus.$emit('set-page', number);
            },
            generateBeforeCurrentPageNumbers (total = 2) {
                let pages = [];
                if (this.pagination && Object.prototype.hasOwnProperty.call(this.pagination, 'current_page') && Object.prototype.hasOwnProperty.call(this.pagination, 'last_page')) {
                    let current = this.pagination.current_page;

                    for (let i = current - total; i < current; i++) {
                        if (i > 0 && i <= this.pagination.last_page)
                            pages.push(i);
                    }
                }
                return pages;
            },
            generateAfterCurrentPageNumbers (total = 2) {
                let pages = [];
                if (this.pagination && Object.prototype.hasOwnProperty.call(this.pagination, 'current_page') && Object.prototype.hasOwnProperty.call(this.pagination, 'last_page')) {
                    let current = this.pagination.current_page;

                    for (let i = current + 1; i <= current + total; i++) {
                        if (i > 0 && i <= this.pagination.last_page)
                            pages.push(i);
                    }
                }
                return pages;
            }
        }
    }
</script>
