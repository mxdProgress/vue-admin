import { reactive } from "@vue/composition-api"
export function paginationHook() {

    const pagiNationData = reactive({
        currentpage: 1,
        pagesizes: [10, 20, 30, 40],
        pagesize: 10,
        total: 50
    })

    const pagiNationFun = (value) => {
        pagiNationData.total = value
    }

    const handleSizeChange = (val) => {
        console.log(`每页 ${val} 条`);
        pagiNationData.pagesize = val
    }
    const handleCurrentChange = (val) => {
        console.log(`当前页: ${val}`);
        pagiNationData.currentpage = val
    }

    return {
        pagiNationData,
        pagiNationFun,
        handleSizeChange,
        handleCurrentChange
    }
}