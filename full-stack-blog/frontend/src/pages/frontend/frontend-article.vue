<template>
  <div class="main wrap clearfix">
    <div class="main-left">
      <template v-if="!article.isLoad">
        <div class="card card-answer">
          <div class="answer-content">Loading...</div>
        </div>
      </template>
      <template v-else-if="article.data._id">
        <div class="card card-question-head">
          <div class="question-content">
            <router-link :to="'/category/' + article.data.category" v-text="article.data.category_name" class="topic-link-item"></router-link>
            <h2 class="question-title"><router-link :to="'/article/' + article.data._id" v-text="article.data.title" class="question-title-link"></router-link> </h2>
          </div>
        </div>
        <div class="card card-answer">
          <div class="answer-content">
            <div class="article-content markdown-body" v-html="addTarget(article.data.html)"></div>
          </div>
          <actions :item="article.data"></actions>
        </div>
        <comment :comments="comments"></comment>
      </template>
      <template v-else>
        <div class="card card-answer">
          <div class="answer-content">Article isn't exsit, or has been deleted!</div>
        </div>
      </template>
    </div>
    <div class="main-right">
      <category :category="category"></category>
      <trending :trending="trending"></trending>
    </div>
  </div>
</template>

