<template>
  <div class="main-right">
    <div class="card card-me">
      <router-link to="/backend/admin/list" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>Admin Users</router-link>
      <router-link to="/backend/user/list" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>User list</router-link>
    </div>
    <div class="card card-me">
      <router-link to="/backend/category/add" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>Add Categories</router-link>
      <router-link to="/backend/category/list" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>Manage Categories</router-link>
      <router-link to="/backend/article/add" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>Post Articles</router-link>
      <router-link to="/backend/article/list" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>Manage Articles</router-link>
    </div>
  </div>
</template>

<script lang="babel">
export default {
  name: 'backend-menu',
  serverCacheKey: () => {
    return `backend::menu`
  }
}
</script>
