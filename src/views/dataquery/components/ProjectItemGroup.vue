<template>
  <div>
    <el-row :gutter="12" class="row-top">
      <el-col
        v-for="(item, index) in query_project_list"
        :key="item.orderno"
        :xs="24"
        :sm="24"
        :lg="12"
        class="card-style"
      >
        <el-card shadow="hover" class="card-shadow" :class="gapClass(index)">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col
                :span="23"
              ><div>
                <h4 class="clear-margin-padding hidden-text">
                  {{ item.organization }} - {{ item.project }} - [{{
                    item.orderno
                  }}
                  ]
                </h4>
              </div></el-col>
              <el-col :span="1">
                <p :class="statusClass(item)" />
              </el-col>
            </el-row>
          </div>
          <div
            class="mouse_style_link"
            @click="openProjectOverView(item.orderno)"
          >
            <el-row>
              <el-col
                :span="24"
              ><div>
                <h4 class="clear-margin-padding hidden-text">
                  {{ item.note }}
                </h4>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div style="height:40px" /></el-col>
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
                {{ item.partner }}
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
                {{ item.slipno_all }}
              </div></el-col>
              <el-col :span="4">
                <div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="已完成"
                    placement="bottom"
                  ><i class="el-icon-finished" /></el-tooltip>
                  {{ item.slipno_close }}
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
                {{ item.slipno_working }}
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
                {{ item.objectcount }}
              </div></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row-top">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-pagination
          background
          :current-page="query_project_current_page"
          :page-sizes="[6, 10, 15, 20, 30, 50, 100]"
          :page-size="query_project_page_size"
          :page-count="query_project_page_count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="query_project_count"
          @size-change="handleSizeChange"
          @current-change="handlePage"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store'
export default {
  computed: {
    ...mapGetters(['query_project_list', 'query_project_current_page', 'query_project_page_size', 'query_project_page_count', 'query_project_count'])
  },
  created: function() {
    this.refreshQueryProjectItemGroup()
  },
  methods: {
    beforeHandleOrder(type, order_no) {
      return {
        type: type,
        order_no: order_no
      };
    },

    gapClass(index) {
      if (index === 4 || index === 5) {
        return 'gap-style-bottom my-font-color';
      } else {
        return 'gap-style my-font-color';
      }
    },

    statusClass(item) {
      if (item.status === 4) {
        return 'is-end';
      } else {
        return 'is-working';
      }
    },

    openProjectOverView(order) {
      this.$router.push({
        name: 'ProjectOverview',
        query: { order_no: order }
      });
    },

    handlePage(page) {
      store.commit('query/SET_QUERY_PROJECT_CURRENT_PAGE', page);
      this.refreshQueryProjectItemGroup();
    },

    handleSizeChange(size) {
      store.commit('query/SET_QUERY_PROJECT_PAGE_SIZE', size);
      this.refreshQueryProjectItemGroup();
    },

    // 按升序排列
    up(x, y) {
      return x.status - y.status;
    },

    async refreshQueryProjectItemGroup() {
      await store.dispatch('query/refreshQueryProjectItemGroup')
      this.query_project_list.sort(this.up)
    }
  }
};
</script>

<style scoped>

.my-font-color {
  color: #606266;
}

.row-top {
  margin-top: 10px;
}

.vertical {
  display: table-cell;
  color: #606266;
  height: 36px;
  vertical-align: middle;
}
.gap-style-bottom {
  margin-right: 40px;
}

.gap-style {
  margin-right: 40px;
  margin-bottom: 40px;
}

.is-working {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #03c4a1;
}

.is-end {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #00303f;
}

.hidden-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card-shadow {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}

.mouse_style_link {
  cursor: pointer;
}
</style>
