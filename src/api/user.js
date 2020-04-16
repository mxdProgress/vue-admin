import sevice from "@/utils/request";

export function getUserRole(data = {}) {
    return sevice.request({
        method: "post",
        url: "/role/ ",
        data: data
    });
}
export function addUser(data = {}) {
    return sevice.request({
        method: "post",
        url: "/user/add/",
        data: data
    });
}