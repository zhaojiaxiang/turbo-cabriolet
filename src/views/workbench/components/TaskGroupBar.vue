<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="openTaskTest()">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="ceshishenqing" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            测试
          </div>
          <count-to :start-val="0" :end-val="task_bar[0].mcl + task_bar[0].pcl" :duration="1" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="openTaskApproval()">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="tianshenpi" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            审核
          </div>
          <count-to :start-val="0" :end-val="task_bar[0].approval" :duration="1" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="openTaskConfirm()">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="gongdan" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            确认
          </div>
          <count-to :start-val="0" :end-val="task_bar[0].confirm" :duration="1" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="openTaskRelease()">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="icon_renwujincheng" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            发布
          </div>
          <count-to :start-val="0" :end-val="task_bar[0].release" :duration="1" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  components: {
    CountTo
  },
  computed: {
    ...mapGetters(['task_bar'])
  },
  created: async function() {
    await store.dispatch('workbench/getMyTaskBar')
  },
  methods: {
    openTaskTest() {
      this.$router.push({ name: 'TaskTest' });
    },
    openTaskApproval() {
      this.$router.push({ name: 'TaskApproval' });
    },
    openTaskConfirm() {
      this.$router.push({ name: 'TaskConfirm' });
    },
    openTaskRelease() {
      this.$router.push({ name: 'TaskRelease' });
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 8px;

  .card-panel-col {
    margin-bottom: 16px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
