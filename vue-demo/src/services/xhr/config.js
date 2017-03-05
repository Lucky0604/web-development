/**
 * 此处配置后端API根路径以及全局错误处理
 */

// 后端API根路径
export const rootPath = '/api';

// XHR错误处理
export const errHandler = (e) => {
  $.toast({
    heading: '请求API失败',
    icon: 'error',
    stack: false
  });
  console.warn(e);
}
