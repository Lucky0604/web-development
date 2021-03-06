/**
 * Created by lucky on 17-3-12.
 *
 * store方法
 */
import {GET_USERINFO,
  RECORD_USERINFO,
  RECORD_ADDRESS,
  SAVE_GEOHASH,
  RECORD_SHOPDETAIL,
  ADD_CART,
  INIT_BUYCART,
  REDUCE_CART,
  CLEAR_CART,
  SAVE_ORDER,
  SAVE_AVATAR,
  OUT_LOGIN,
  RESET_NAME,
  SAVE_ADDRESS,
  ADD_ADDRESS,
  SAVE_ADDDETAIL,
  ORDER_SUCCESS,
  BUY_CART} from './mutation-types'

import {getStore, setStore} from '../config/mUtils'

export default {
  // 获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    };
    if (!state.login) {
      return;
    }

    if (!info.message) {
      state.userInfo = {...info};
      let validity = 30;
      let now = new Date();
      now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
      document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
      document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
    } else {
      state.userInfo = null;
    }
  },
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    let validity = 30;
    let now = new Date();
    now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
    document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
    document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
  },
  // 记录当前经度纬度
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },

  // 保存geohash
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
    if (true) {}
  },

  // record the shop's detail
  [RECORD_SHOPDETAIL](state, detail) {
    state.shopDetail = detail;
  },

  // add cart
  [ADD_CART](state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
    packing_fee,
    sku_id,
    stock
  }) {
    let cart = state.cartList;
    if (cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id] && cart[shopid][category_id][item_id][food_id]) {
      cart[shopid][category_id][item_id][food_id]['num'] ++;
    } else if (cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id]) {
      cart[shopid][category_id][item_id][food_id] = {};
      cart[shopid][category_id][item_id][food_id]['num'] = 1;
      cart[shopid][category_id][item_id][food_id]['id'] = food_id;
      cart[shopid][category_id][item_id][food_id]['name'] = name;
      cart[shopid][category_id][item_id][food_id]['price'] = price;
      cart[shopid][category_id][item_id][food_id]['specs'] = specs;
      cart[shopid][category_id][item_id][food_id]['packing_fee'] = packing_fee;
      cart[shopid][category_id][item_id][food_id]['sku_id'] = sku_id;
      cart[shopid][category_id][item_id][food_id]['stock'] = stock;
    } else if (cart[shopid] && cart[shopid][category_id]) {
      cart[shopid][category_id][item_id] = {};
      cart[shopid][category_id][item_id][food_id] = {};
      cart[shopid][category_id][item_id][food_id]['num'] = 1;
      cart[shopid][category_id][item_id][food_id]['id'] = food_id;
      cart[shopid][category_id][item_id][food_id]['name'] = name;
      cart[shopid][category_id][item_id][food_id]['price'] = price;
      cart[shopid][category_id][item_id][food_id]['specs'] = specs;
      cart[shopid][category_id][item_id][food_id]['packing_fee'] = packing_fee;
      cart[shopid][category_id][item_id][food_id]['sku_id'] = sku_id;
      cart[shopid][category_id][item_id][food_id]['stock'] = stock;
    } else if (cart[shopid]) {
      cart[shopid][category_id] = {};
      cart[shopid][category_id][item_id] = {};
      cart[shopid][category_id][item_id][food_id] = {};
      cart[shopid][category_id][item_id][food_id]['num'] = 1;
      cart[shopid][category_id][item_id][food_id]['id'] = food_id;
      cart[shopid][category_id][item_id][food_id]['name'] = name;
      cart[shopid][category_id][item_id][food_id]['price'] = price;
      cart[shopid][category_id][item_id][food_id]['specs'] = specs;
      cart[shopid][category_id][item_id][food_id]['packing_fee'] = packing_fee;
      cart[shopid][category_id][item_id][food_id]['sku_id'] = sku_id;
      cart[shopid][category_id][item_id][food_id]['stock'] = stock;
    } else {
      cart[shopid] = {};
      cart[shopid][category_id] = {};
      cart[shopid][category_id][item_id] = {};
      cart[shopid][category_id][item_id][food_id] = {};
      cart[shopid][category_id][item_id][food_id]['num'] = 1;
      cart[shopid][category_id][item_id][food_id]['id'] = food_id;
      cart[shopid][category_id][item_id][food_id]['name'] = name;
      cart[shopid][category_id][item_id][food_id]['price'] = price;
      cart[shopid][category_id][item_id][food_id]['specs'] = specs;
      cart[shopid][category_id][item_id][food_id]['packing_fee'] = packing_fee;
      cart[shopid][category_id][item_id][food_id]['sku_id'] = sku_id;
      cart[shopid][category_id][item_id][food_id]['stock'] = stock;
    }
    state.cartList = {...cart};
    // store in localStorage
    setStore('buyCart', state.cartList);
  },

  // remove from cart
  [REDUCE_CART](state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs
  }) {
    let cart = state.cartList;
    if (cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id] && cart[shopid][category_id][item_id][food_id]) {
      if (cart[shopid][category_id][item_id][food_id]['num'] > 0) {
        cart[shopid][category_id][item_id][food_id]['num'] --;
        state.cartList = {...cart};
        // store in localStorage
        setStore('buyCart', state.cartList);
      } else {
        // if item's num is 0, clear the current item's info
        cart[shopid][category_id][item_id][food_id] = null;
      }
    }
  },

  // when the page is initialized, get the cart info from the local storage
  [INIT_BUYCART](state) {
    let initCart = getStore('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },

  // clear the current item's info
  [CLEAR_CART](state, shopid) {
    state.cartList[shopid] = null;
    state.cartList = {...state.cartList};
    setStore('buyCart', state.cartList);
  },

  // 进入订单详情页前保存该订单信息
  [SAVE_ORDER](state, orderDetail) {
    state.orderDetail = orderDetail;
  },

  // 个人中心，头像
  [SAVE_AVATAR](state, imgPath) {
    state.imgPath = imgPath;
  },

  // 退出登陆
  [OUT_LOGIN](state) {
    state.userInfo = null;
    state.login = false;
  },

  // 修改用户名
  [RESET_NAME](state, username) {
    state.userInfo = Object.assign({}, state.userInfo, {username});
  },

  // 删除地址列表
  [SAVE_ADDRESS](state, newAddress) {
    state.removeAddress = newAddress;
  },

  // 增加地址
  [ADD_ADDRESS](state, obj) {
    state.removeAddress = [obj, ...state.removeAddress];
  },

  // 添加地址详情
  [SAVE_ADDDETAIL](state, addAddress) {
    state.addAddress = addAddress;
  },

  // 下单成功，保存订单返回信息
  [ORDER_SUCCESS](state, order) {
    state.cartPrice = null;
    state.orderMessage = order;
  },

  // 会员卡价格记录
  [BUY_CART](state, price) {
    state.cartPrice = price;
  }
}
