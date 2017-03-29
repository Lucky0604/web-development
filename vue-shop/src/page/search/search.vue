<template>
	<div class="paddingTop">
		<head-top head-title="Search" goBack="true"></head-top>
		<form class="search_form">
			<input class="search_input" type="search" name="search" placeholder="Please input shop and food's name" v-model="searchValue" @input="checkInput" />
			<input class="search_submit" type="submit" name="submit" @click.prevent="searchTarget('')" />
		</form>
		<section v-if="restaurantList.length">
			<h4 class="title_restaurant">Shop</h4>
			<ul class="list_container">
				<router-link :to="{path: '/shop', query: {id: item.id}}" tag="li" v-for="item in restaurantList" :key="item.id" class="list_li">
					<section class="item_left">
            <img :src="imgBaseUrl + item.image_path" alt="" class="restaurant_img">
					</section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
                <svg class="pay_icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14">
                  <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#ff6000;stroke-width:1" />
                  <line x1="1.5" y1="12" x2="20" y2="20" style="stroke:#ff6000;stroke-width:1.5" />

                </svg>
              </p>
            </div>
          </section>
				</router-link>
			</ul>
		</section>
	</div>
</template>
