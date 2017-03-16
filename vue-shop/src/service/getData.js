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
  var msiteAddress = geohash => fetch('GET', '/v2/pois' + geohash, {});

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
   * 获取用户信息
   */
  var getUser = () => fetch('GET', '/v1/user', {});

} else {
  var cityGuess = () => setPromise(home.guesscity);
  var hotCity = () => setPromise(home.hotcity);
  var groupCity = () => setPromise(home.groupcity);
  var getUser = () => setPromise(login.userInfo);
  // var currentCity = number => setPromise(city.currentcity);
  // var searchPlace = (cityid, value) => setPromise(city.searchdata);
}

export {cityGuess, hotCity, groupCity, getUser, currentCity, searchPlace}


