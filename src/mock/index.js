import Mock from 'mockjs'

import demo from "../views/DemoModule/Mock/demo.js"
Mock.setup({
    timeout: '500-600'
});
export default {
    ...demo
}