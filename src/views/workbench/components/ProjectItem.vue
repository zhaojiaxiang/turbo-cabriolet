<template>
  <div>
    <el-row :gutter="40">
      <el-col
        v-for="item in project_items"
        :key="item.order_no"
        :xs="24"
        :sm="24"
        :lg="8"
        class="card-panel-col"
      >
        <el-card shadow="hover" class="card-shadow mouse_style_link" style="padding:0px">
          <div @click="openProjectOverView(item.order_no)">
            <el-row>
              <el-col
                :span="24"
              ><div class="card-panel-description">
                <div class="card-panel-text clear-margin-padding hidden-text">
                  {{ item.project }} - [ {{ item.order_no }} ]
                </div>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col
                :span="24"
              ><div class="card-panel-description">
                <div class="card-panel-text2 clear-margin-padding hidden-text">
                  {{ item.order_note }}
                </div>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col
                :span="24"
              ><div>
                <el-steps :active="item.order_status" finish-status="success">
                  <el-step title="未开始" class="step-style" />
                  <el-step title="已开始" />
                  <el-step title="已结束" />
                  <el-step title="已发布" />
                </el-steps></div></el-col>
            </el-row>
            <el-row class="icon-style">
              <el-col
                :span="4"
              ><div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="参与人"
                  placement="bottom"
                ><i class="el-icon-user" /></el-tooltip>
                {{ item.order_partner }}
              </div></el-col>
              <el-col
                :span="4"
              ><div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="联络票"
                  placement="bottom"
                ><i class="el-icon-tickets" /></el-tooltip>
                {{ item.order_slipno_all }}
              </div></el-col>
              <el-col :span="4">
                <div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="已完成"
                    placement="bottom"
                  ><i class="el-icon-finished" /></el-tooltip>
                  {{ item.order_slipno_close }}
                </div></el-col>
              <el-col
                :span="4"
              ><div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="未完成"
                  placement="bottom"
                ><i class="el-icon-s-flag" /></el-tooltip>
                {{ item.order_slipno_working }}
              </div></el-col>
              <el-col
                :span="4"
              ><div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="测试对象"
                  placement="bottom"
                ><i class="el-icon-lollipop" /></el-tooltip>
                {{ item.test_object }}
              </div></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  data: function() {
    return {
    };
  },
  computed: {
    ...mapGetters(['project_items'])
  },
  mounted: async function() {
    await store.dispatch('workbench/refreshProjectItems')
  },
  methods: {
    openProjectOverView(order) {
      this.$router.push({
        name: 'ProjectOverview',
        query: { order_no: order }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-panel-col {
    margin-bottom: 32px;
  }
.card-panel-description {
  font-weight: bold;
  margin-left: 0px;
  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    margin-bottom: 12px;
  }
  .card-panel-text2 {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }
}
.card-shadow {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}

.hidden-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.icon-style {
  color: #8c92a4;
  font-size: 14px;
  margin-top: 10px;
}

.mouse_style_link {
  cursor: pointer;
}
</style>
