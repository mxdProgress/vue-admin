import Vue from "vue";
import svgIcon from "./svgIcon";
Vue.component('svg-icon', svgIcon);

/** 
 * require.context:读取指定目录得所有文件
 * 第一个参数:目录；
 * 第二个参数：是否遍历子级目录；
 * 第三个参数：定义文件遍历规则
 * 
 * */

const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => {
    console.log(requireContext.keys());
    return requireContext.keys().map(requireContext);
}
requireAll(req);