<template>
  <div class="checkouts-container">
    <el-row>
      <el-col :xs="24" :lg="24" :xl="24">
        <div>
          <CheckoutList ref="CheckoutList" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from '@/store';
import CheckoutList from './components/CheckoutList';
export default {
  components: {
    CheckoutList
  },
  mounted: async function() {
    await store.dispatch('common/getGroupUsers');
    await store.dispatch('common/getAllGroupUsers');
  }
};
</script>

<style scoped>
.checkouts-container {
  padding: 16px 32px 16px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
