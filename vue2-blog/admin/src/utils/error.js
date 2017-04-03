/**
 * Created by lucky on 4/3/17.
 */
export default getDesc = (desc) => {
  switch (desc) {
    case 'Token not found':
      return '请求失败，请确认您已登录'
    case 'Get token failed. Check the password':
      return '登录失败，请检查您的密码'
    case 'Get token failed, check the username':
      return '登录失败，请检查您的用户名'
    case 'Token verify failed':
      return 'Token验证失败，请重新登录'
    case 'Token invalid':
      return 'Token验证失败，请重新登录'
    default:
      return desc
  }
}
