import Vue from 'vue'
import Pagination from "../components/Datatable/common/Pagination"
import Entries from "../components/Datatable/common/Entries"
import Search from "../components/Datatable/common/Search"

export default Vue.extend({
    components: {Pagination, Entries, Search},
    props: {
        config: {
            type: Object,
            default: function () {
                return {};
            }
        },
        url: {
            type: String,
            required: true
        },
        reloadListener: {
            type: String
        }
    },
    data () {
        return {
            pagination: null,
            items: [],
            options: {
                total: 10,
                showEntries: true,
                showSearch: true
            },
            query: '',
            dataUrl: this.url
        }
    },
    mounted () {
        if (this.reloadListener) {
            EventBus.$on(this.reloadListener, () => {
                this.reload();
            });
        }

        this.options = {...this.options, ...this.config};
        this.fetch(this.dataUrl);
    },
    methods: {
        reload () {
            this.fetch(this.dataUrl);
        },
        setPage (page) {
            this.options['page'] = page;
            this.reload();
        },
        changeTotalEntries (total) {
            this.options['total'] = total;
            this.reload();
        },
        search (query) {
            if (query) {
                this.options['search'] = query;
            } else {
                delete this.options.search;
            }
            this.reload();
        },
        fetch (url) {
            let page = this.getParameterByName('page', url);

            if (page) {
                this.options['page'] = page;
            }

            showBlocker(true);

            axios.request({
                method: 'get',
                url: url,
                params: this.options
            }).then(response => {
                let result = response.data;
                this.items = result.data;
                delete result.data;
                this.pagination = result;
                showBlocker(false);
            }).catch(() => {
                showBlocker(false);
            })
        },
        getParameterByName (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
    }
});
