import { reactive } from "@vue/composition-api";
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