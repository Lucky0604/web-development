<template>
  <div class="food_container">
    <head-top :head-title="headTitle" goBack="true"></head-top>
    <section class="sort_container">
      <div class="sort_item" :class="{choose_type:sortBy=='food'}">
        <div class="sort_item_container" @click="chooseType('food')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
            <svg class="sort_icon" width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <polygon points="0,3 10,3 5,8"></polygon>
            </svg>
          </div>
        </div>
        <transition name="showlist" v-show="category">
          <section class="category_container sort_detail_type" v-show="sortBy == 'food'">
            <section class="category_left">
              <ul>
                <li class="category_left_li" v-for="(item, index) in category" :key="index" :class="{category_active:restaurant_category_id == item.id}" @click="selectCategoryName(item.id, index)">
                  <section>
                    <img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">
                    <span>{{item.name}}</span>
                  </section>
                  <section>
                    <span class="category_count">{{item.count}}</span>
                    <svg class="category_arrow" v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1">
                      <path d="M0 0 L6 4 L0 8" stroke="#bbb" stroke-width="1" fill="none" />
                    </svg>
                  </section>
                </li>
              </ul>
            </section>
            <section class="category_right">
              <ul>
                <li class="category_right_li" v-for="(item, index) in categoryDetail" :key="item.id" @click="getCategoryIds(item.id, item.name)" :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids) && index == 0}">
                  <span>{{item.name}}</span>
                  <span>{{item.count}}</span>
                </li>
              </ul>
            </section>
          </section>
        </transition>
      </div>
      <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
        <div class="sort_item_container" @click="chooseType('sort')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'sort'}">排序</span>
            <svg class="sort_icon" width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section class="sort_detail_type" v-show="sortBy == 'sort'">
            <ul class="sort_list_container" @click="sortList($event)">
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                </svg>
                <p data="0" :class="{sort_select: sortByType == 0}">
                  <span>智能排序</span>
                  <svg v-if="sortByType == 0">
                    
                  </svg>
                </p>
              </li>
            </ul>
          </section>
        </transition>
      </div>
    </section>
  </div>
</template>
