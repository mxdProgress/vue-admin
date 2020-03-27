import sevice from "@/utils/request";

export function getCategory(data) {
    return sevice.request({
        method: "post",
        url: "/news/getCategory/ ",
        data: data
    });
}
export function setCategory(data) {
    return sevice.request({
        method: "post",
        url: "/news/addFirstCategory/ ",
        data: data
    });
}

export function addInfo(data) {
    return sevice.request({
        method: 'post',
        url: "/news/add/",
        data: data
    })
}
export function getList(data) {
    return sevice.request({
        method: 'post',
        url: '/news/getList/',
        data: data
    })
}

export function delateItem(data) {
    return sevice.request({
        method: 'post',
        url: '/news/deleteInfo/',
        data: data
    })
}