import axiosHttp from '../utils/axiosHttp';

export function testHttp(params) {
    return axiosHttp({
        path: '/user/login',
        method: 'get',
        data: params
    });
}
