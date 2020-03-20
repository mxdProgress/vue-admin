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