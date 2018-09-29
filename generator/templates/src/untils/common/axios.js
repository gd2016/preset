/**
 * 该处实现供开发者参考
 */
import axios from 'axios';
// import utility from 'ct-utility';
import CodeMsg from 'common/code-msg';

// 设置不缓存请求
const axiosObj = axios.create({
    headers: {
        'If-Modified-Since': 0
    }
});

// 要求接口必须有code, code为0时为成功，code为非0时失败
axiosObj.interceptors.response.use(function(response) {
    try {
        // const transfered = utility.objTransfer.lowerKey(response.data);
        const transfered = response.data;

        if (transfered.Code === 0){
            return transfered;
        }
        if (typeof transfered.Code !== 'undefined'){
            return Promise.reject({
                code: '$API-LOGIC-ERROR',
                message: CodeMsg.resolveDataError(transfered.Code, transfered.Message),
                response: response
            });
        } 
        throw new Error('code不是数字');
    } catch (e){
        return Promise.reject({
            code: '$API-DATA-ERROR',
            message: '接口数据非预期[$API-DATA-ERROR]',
            error: e
        });
    }
}, function(error) {
    let reason = {};

    if (error.response){
        reason = {
            code: '$RESPONCE-ERROR',
            message: CodeMsg.resolveResponseError(error.response),
            error
        };
    } else if (error.request){
        reason = {
            code: '$REQUEST-ERROR',
            message: `${CodeMsg.resolveRequestError()}[$REQUEST-ERROR]`,
            error
        };
    } else {
        reason = {
            code: '$HTTP-ERROR',
            message: '接口错误[$HTTP-ERROR]',
            error
        };
    }
    return Promise.reject(reason);
});

export default axiosObj;
