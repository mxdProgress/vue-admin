import { getCityPicker } from '@/api/common'
import { reactive, toRefs, onBeforeMount } from '@vue/composition-api'
export function cityPickerFun() {
    const data = reactive({
        provinceData: [],
        cityData: [],
        areaData: [],
        streetData: [],
        provinceValue: '',
        cityValue: '',
        areaValue: '',
        streetValue: ''
    });

    const resuleData = reactive({
        provinceValue: '',
        cityValue: '',
        areaValue: '',
        streetValue: ''
    })

    /**
     * 获取省份
     */
    const getProvince = () => {
        getCityPicker({ type: "province" }).then(res => {
            data.provinceData = res.data.data.data
        }).catch(err => {})
    };

    /**
     * 点击省份 获取城市
     */
    const handleProvince = (value) => {
        resetVal({ type: "city" })
        getCityPicker({ type: "city", province_code: value }).then(res => {
            data.cityData = res.data.data.data
        }).catch(err => {})
    };

    /**
     * 点击市区 获取地区
     */
    const handleCity = (value) => {
        resetVal({ type: "area" })
        getCityPicker({ type: "area", city_code: value }).then(res => {
            data.areaData = res.data.data.data
        }).catch(err => {})
    };

    /**
     * 点击地区 获取街道
     */
    const handleArea = (value) => {
        resetVal({ type: "street" })
        getCityPicker({ type: "street", area_code: value }).then(res => {
            data.streetData = res.data.data.data
        }).catch(err => {})
    }

    /**
     * 点击街道
     */
    const handleStreet = (value) => {
        resetVal({ type: "" })
    }


    /**
     * 重置选项
     */
    const resetVal = (param) => {
        const valueJson = {
            city: ["cityValue", "areaValue", "streetValue"],
            area: ["areaValue", "streetValue"],
            street: ["streetValue"]
        }

        const arrObj = valueJson[param.type];
        if (arrObj) { arrObj.forEach(item => data[item] = '') }
        resule()
    }

    /**
     * 返回数据集合
     */
    const resule = () => {
        for (let key in resuleData) {
            resuleData[key] = data[key]
        }
    }




    return {
        data,
        resuleData,
        getProvince,
        handleProvince,
        handleCity,
        handleArea,
        handleStreet
    }

}