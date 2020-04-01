import { reactive } from "@vue/composition-api";
import sevice from "@/utils/request";
import { getCategory } from "@/api/new";

export function common() {
    const categoryItem = reactive({
        item: []
    })
    const getInfoCategory = () => {
        getCategory({}).then(res => {
            categoryItem.item = res.data.data.data
        }).catch(err => {

        })
    }

    return {
        categoryItem,
        getInfoCategory
    }
}

export function loadTableData(params) {
    return sevice.request({
        method: params.method || "POST",
        url: params.url,
        data: params.data || {}
    });
}