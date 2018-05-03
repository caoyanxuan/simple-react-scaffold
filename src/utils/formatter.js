/**
 * @desc 用于格式化各种数据, 如从后台拿到timestamp, 需要转换成年月日等...
 */
import moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../constants/common';
import { PROVINCES } from '../constants/common';

/*
 *  @desc 格式化开始日期
 *  @param time 需要格式化日期
 *  @param type start OR end
 * */
export function startEndDateFormat(time, type = 'start') {
    let suffix = type === 'start' ? ' 00:00:00' : ' 23:59:59';
    return time ? dateFormat(time) + suffix : '';
}

// 日期
export function dateFormat(time) {
    return time ? moment(time).format(DATE_FORMAT) : '--';
}

// 日期+时间
export function dateTimeFormat(time) {
    return time && moment(time).format('x') > 1000 ? moment(time).format(DATE_TIME_FORMAT) : '--';
}

// 时间差 天
export function dateDiffByDay(beginTime, endTime, type) {
    return moment(endTime).diff(moment(beginTime), type);
}

/**
 * 千分位
 * @param  {[type]} num [description]
 * @return {string}     [description]
 */
export function formatNumber(num) {
    if (isNaN(parseFloat(num))) {
        return '0';
    }
    return ('' + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
}

/**
 * 如果标题字数超出指定长度，则多余部分显示...
 * @param {number} num
 * @param {string} str
 */
export function overtopOmit(num, str) {
    if (str && str.length > num) {
        return str.substring(0, num) + '...';
    }
    return str;
}

// 判断字段是否异常，如果异常则返回‘--’
export function fieldAnomaly(value) {
    if ((typeof (value) === 'number' && !isNaN(value))
        || (typeof (value) === 'string' && value.trim().length > 0)) {
        return value;
    }

    if (!value) {
        return '--';
    }
    return value;
}

// 小数转换
export function numberFixed(num, anomaly, fixed = 2) {
    if (isNaN(parseFloat(num))) {
        if (anomaly !== undefined) {
            return anomaly;
        }
        num = 0;
    }
    return num.toFixed(fixed);
}

// 转换简化省名字
export function provinceNameFormat(name) {
    for(let i = 0, l = PROVINCES.length; i < l; i++) {
        if(name.match(PROVINCES[i])) {
            return PROVINCES[i];
        }
    }
    return name;
}
