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
  CLEAR_CART} from './mutation-types'

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
  }
}
