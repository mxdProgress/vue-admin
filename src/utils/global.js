import { MessageBox, Message } from "element-ui";

export default {
    install(Vue, options) {
        Vue.prototype.config = (param) => {
            MessageBox.confirm(param.content, param.tip || '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: param.tip || 'warning',
                center: true
            }).then(() => {
                param.fn && param.fn()
                Message({
                    type: 'success',
                    message: '删除成功!',
                });
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}