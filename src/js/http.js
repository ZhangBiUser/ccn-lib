import axios from 'axios'
import config from '../config'
import { Cookie } from '../js/util'
const debounce = require('lodash/debounce');
const throttle = require('lodash/throttle');

let loadingCount = 0;
axios.defaults.headers.common['Authorization'] = Cookie.getCookie('UACToken')+'|||'+Cookie.getCookie('FactoryId');
$.ajaxSetup({
    headers: { // 默认添加请求头  
        "Authorization": Cookie.getCookie('UACToken')+'|||'+Cookie.getCookie('FactoryId')
    }
});
 
const _loading = {
    start() {
        const throttled = throttle(function () {
            if (config.isShowLoading){
                vue.$store.commit("switch_Loading", true);
            }
          
        }, 1000);
        throttled();
        loadingCount++;
    },
    stop() {
        loadingCount--;
        const debounced = debounce(function () {
            if (loadingCount === 0) {
                config.isShowLoading = true;
                vue.$store.commit("switch_Loading", false);
            }
        }, 250);
        debounced();
    }
};

function createInstance(config = { timeout: 30000 }) {
    const instance = axios.create(config);
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
        _loading.start();
        return config;
    }, error => {
        _loading.stop();
        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(response => {
        _loading.stop();
        if(!response.data.success) {
            layer.alert(response.data.error.message);
            return;
        }
        return response;
    }, error => {
        _loading.stop();
        error.response.data && layer.alert(error.response.data.error.message);
        return Promise.reject(error);
    });

    return instance;
}

const http = createInstance();

http.create = function create(config = {}) {
    return createInstance(config);
};

export default http