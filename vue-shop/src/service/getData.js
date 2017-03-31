/**
 * Created by lucky on 17-3-12.
 *
 * 获取数据相关方法
 */
import fetch from '../config/fetch'
import * as home from './tempData/home'
import * as city from './tempData/city'
import * as msite from './tempData/msite'
import * as search from './tempData/search'
import * as food from './tempData/food'
import * as shop from './tempData/shop'
import * as login from './tempData/login'
import * as confirm from './tempData/confirm'
import * as order from './tempData/order'
import * as service from './tempData/service'
import * as addDetail from './tempData/addDetail'
import * as addresspart from './tempData/address'
import * as vip from './tempData/vip'
import * as honghao from './tempData/hongbao'


/**
 * 创建临时数据
 */
const setPromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

/**
 * 编译环境使用真实数据
 */
if (process.env.NODE_ENV === 'development') {

  /**
   * 获取首页默认地址
   */
  var cityGuess = () => fetch('GET', '/v1/cities', {
    type: 'guess'
  });

  /**
   * 获取首页热门城市
   */
  var hotCity = () => fetch('GET', '/v1/cities', {
    type: 'hot'
  });

  /**
   * 获取首页所有城市
   */
  var groupCity = () => fetch('GET', '/v1/cities', {
    type: 'group'
  });

  /**
   * 获取当前所在城市
   */
  var currentCity = number => fetch('GET', '/v1/cities/' + number, {});

  /**
   * 获取搜索地址
   */
  var searchPlace = (cityid, value) => fetch('GET', '/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
  });

  /**
   * 获取msite页面地址信息
   */
  var msiteAddress = geohash => fetch('GET', '/v2/pois/' + geohash, {});

  /**
   * 获取msite页面食品分类列表
   */
  var msiteFoodTypes = geohash => fetch('GET', '/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
  })

  /**
   * 获取msite商铺列表
   */
  var shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
    let supportStr = '';
    support_ids.forEach(item => {
      if (item.status) {
        supportStr += '&support_ids[]=' + item.id;
      }
    });

    let data = {
      latitude,
      longitude,
      offset,
      limit: '20',
      'extras[]': 'activities',
      keyword: '',
      restaurant_category_id,
      'restaurant_category_ids[]': restaurant_category_ids,
      order_by,
      'delivery_mode[]': delivery_mode + supportStr
    };

    return fetch('GET', '/shopping/restaurants', data);
  }

  /**
   * 获取search页面搜索结果
   */
  var searchRestaurant = (geohash, keyword) => fetch('GET', '/v4/restaurants', {
    'extras[]': 'restaurant_activity',
    geohash,
    keyword,
    type: 'search'
  });

  /**
   * 获取food页面的category种类列表
   */
  var foodCategory = (latitude, longitude) => fetch('GET', '/shopping/v2/restaurant/category', {
    latitude,
    longitude
  });

  /**
   * 获取food页面的配送方式
   */
  var foodDelivery = (latitude, longitude) => fetch('GET', '/shopping/v1/restaurants/delivery_modes', {
    latitude,
    longitude,
    kw: ''
  });

  /**
   * 获取food页面的商家属性活动列表
   */
  var foodActivity = (latitude, longitude) => fetch('GET', '/shopping/v1/restaurants/activity_attributes', {
    latitude,
    longitude,
    kw: ''
  })

  /**
   * 获取用户信息
   */
  var getUser = () => fetch('GET', '/v1/user', {});

  /**
   * 获取短信验证码
   */
  var mobileCode = phone => fetch('POST', '/v4/mobile/verify_code/send', {
    mobile: phone,
    scene: 'login',
    type: 'sms'
  })

  /**
   * 检测帐号是否存在
   */
  var checkExists = (checkNumber, type) => fetch('GET', '/v1/users/exists', {
    [type]: checkNumber,
    type
  })

  /**
   * 手机号登录
   */
  /*
  var sendLogin = (code, mobile, validate_token) => fetch('POST', '/v1/login/app_mobile', {
    code,
    mobile,
    validate_token
  })
  */

  /**
   * 获取captcha
   */
  var getCaptchas = () => fetch('POST', '/v1/captchas', {})

  /**
   * 帐号密码登录
   */
  var accountLogin = (username, password, captcha_code) => fetch('POST', '/v2/login', {username, password, captcha_code})

  /**
   * 获取shop页面商铺详情
   */
  var shopDetails = (shopid, latitude, longitude) => fetch('GET', '/shopping/restaurant/' + shopid, {
    latitude,
    longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
  })

  /**
   * 获取food页面的商家属性活动列表
   */
  var foodMenu = restaurant_id => fetch('GET', '/shopping/v2/menu', {
    restaurant_id
  })

  /**
   * 获取商铺评价列表
   */
  var getRatingList = (offset, tag_name = '') => fetch('GET', '/ugc/v2/restaurants/834828/ratings', {
    has_content: true,
    offset,
    limit: 10,
    tag_name
  })

  /**
   * 获取商铺评价分数
   */
  var ratingScores = shopid => fetch('GET', '/ugc/v2/restaurants/' + shopid + '/ratings/scores', {})

  /**
   * 获取商铺评价分类
   */
  var ratingTags = shopid => fetch('GET', '/ugc/v2/restaurants/' + shopid + '/ratings/tags', {})

  /**
   * 获取订单列表
   */
  var getOrderList = (user_id, offset) => fetch('GET', '/bos/v2/users/' + user_id + '/orders', {
    limit: 10,
    offset
  })

  /**
   * 获取订单详情
   */
  var getOrderDetail = (user_id, orderid) => fetch('GET', '/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot', {});

  /**
   * 获取search页面搜索结果
   */
  var searchRestaurant = (geohash, keyword) => fetch('GET', '/v4/restaurants', {
    'extras[]': 'restaurant_activity',
    geohash,
    keyword,
    type: 'search'
  });

  /**
   * 个人中心编辑地址
   */
  var getAddressList = (user_id) => fetch('GET', '/v1/users/' + user_id + '/addresses');

  /**
   * 删除地址
   */
  var deleteAddress = (userid, addressid) => fetch('DELETE', '/v1/users/' + userid + '/addresses/' + addressid);

  /**
   * 新增地址
   */
  var postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('POST', '/v1/users/' + userId + '/addresses', {
    address,
    address_detail,
    geohash,
    name,
    phone,
    phone_bk,
    poi_type,
    sex,
    tag,
    tag_type
  });

  /**
   * 个人中心里搜索地址
   */
  var getSearchAddress = (keyword) =>  fetch('GET', 'v1/pois', {
    keyword: keyword,
    type: 'nearby'
  })


} else {
  var cityGuess = () => setPromise(home.guesscity);
  var hotCity = () => setPromise(home.hotcity);
  var groupCity = () => setPromise(home.groupcity);
  var getUser = () => setPromise(login.userInfo);
  // var currentCity = number => setPromise(city.currentcity);
  // var searchPlace = (cityid, value) => setPromise(city.searchdata);
}

// 发送短信验证不需要反向代理
var sendLogin = (code, mobile, validate_token) => setPromise(login.userInfo)

export {cityGuess, hotCity, groupCity, getUser, currentCity, searchPlace, mobileCode, checkExists, getCaptchas, accountLogin, sendLogin, msiteAddress,
  msiteFoodTypes, shopList, foodCategory, foodActivity, foodDelivery,
shopDetails, foodMenu, getRatingList, ratingScores, ratingTags,
getOrderList, getOrderDetail, searchRestaurant, getAddressList, deleteAddress, postAddAddress, getSearchAddress}


