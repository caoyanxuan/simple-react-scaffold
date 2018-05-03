/**
 * @author caoyx
 * @desc 这里对axios进行了基础封装，可根据业务需求修改（注：contentType：默认--application/json）；
 *       暂未提供mock服务，若需，可自己加上；或自启一个node服务器（推荐）
 *       弹出提示暂为alert，若引入UI组件库（如：antd），则修改为组件库提供的弹出提示（message组件）；或自己DIY弹出提示组件；
 */
import axios from 'axios';
import { isEmpty, isString } from './util';
import ERRTEXT from '../constants/errText';

const httpConfig = {
    timeout: 10000, // 10s
    methods: ['get', 'post'],
    // 响应拦截器
    interceptor: (res = {}, resolve, reject) => {
        const { code, data } = res;
        const resCode = parseInt(code, 10);
        // 成功：1， 未登录：403 ， 其他异常: ...
        if (resCode === 1) {
            resolve(data);
        } else if (resCode === 403) {
            reject(data);
        } else {
            if (res.msg && isString(res.msg) && res.mag.length > 0) {
                const errMessage = ERRTEXT[resCode] || res.msg;
                /* eslint-disable */
                alert(errMessage);
                console.log('errMessage', errMessage);
                /* eslint-enable */
            }
            reject(data);
        }
    }
};

export default function axiosHttp({ path, method, data = {} }) {
    // 路径为空或者非methods里面的请求方式，return
    if (isEmpty(path) || !httpConfig.methods.includes(method)) {
        return Promise.resolve();
    }
    const isGet = method.toLowerCase() === 'get';
    const url = /^\//.test(path) ? path : '/' + path;
    const isDev = process.env.NODE_ENV === 'development'; // webpack4.x新特性 --mode设置（见package.json中script）
    const reqData = Object.assign(data, {
        t: new Date().getTime()
    });

    return new Promise((resolve, reject) => {
        axios({
            url,
            method: method.toLowerCase(),
            params: isGet ? reqData : {},
            data: isGet ? {} : reqData,
            baseURL: _ROOTPATH_, // 路径前缀(webpack.config中设置)
            withCredentials: isDev, // 开发环境跨域请求携带cookie
            timeout: httpConfig.timeout,
            transformResponse: [
                // 在传递给 then/catch 前，先处理响应数据
                res => {
                    if (isString(res)) {
                        try {
                            res = JSON.parse(res);
                        } catch (e) {
                            try {
                                /* eslint-disable no-eval */
                                res = eval('(' + res + ')');
                                /* eslint-enable no-eval */
                            } catch (e) {
                                reject(e);
                                return;
                            }
                        }
                    }
                    return res;
                }
            ]
        })
            .then(res => {
                httpConfig.interceptor.call(reqData, res.data, resolve, reject);
            })
            .catch(err => {
                /* eslint-disable */
                alert(err);
                console.log('err', err);
                /* eslint-enable */
                reject(err);
            });
    });
}
