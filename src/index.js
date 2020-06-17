import Datatable from "./Datatable";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import Entries from "./components/Entries";

export default {
    install (vue) {
        window.DatatableEventBus = new vue;

        vue.component('cs-datatable', Datatable)
        vue.component('cs-pagination', Pagination)
        vue.component('cs-search', Search)
        vue.component('cs-entries', Entries)
    }
}