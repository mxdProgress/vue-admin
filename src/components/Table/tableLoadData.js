import { ref, reactive, onMounted, onBeforeMount } from "@vue/composition-api"
import requestListUrl from "@/api/requestUrl"
import { loadTableData } from "@/api/common"
export function loadTableDataFun() {

    const userManageListData = reactive({
        item: [],
        total: 0
    });

    const getloadTableData = (params) => {
        let request = {
            url: requestListUrl[params.requestDatas.url],
            method: params.requestDatas.method,
            data: params.requestDatas.data
        }
        loadTableData(request).then(res => {
            let resData = res.data.data.data
            userManageListData.item = resData
            userManageListData.total = res.data.data.total
        }).catch(err => {

        })
    }

    return {
        userManageListData,
        getloadTableData
    }

}