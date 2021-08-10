<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Change password" name="changepasswor">
                <change-password />
              </el-tab-pane>
              <el-tab-pane label="Man Power" name="manpower">
                <man-power :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import ChangePassword from './components/ChangePassword'
import ManPower from './components/ManPower'

export default {
  name: 'Profile',
  components: { UserCard, ChangePassword, ManPower },
  data() {
    return {
      user: {},
      activeTab: 'changepasswor'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'username',
      'email',
      'slims_name',
      'group',
      'organization'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        username: this.username,
        slims_name: this.slims_name,
        group: this.group,
        organization: this.organization,
        role: this.roles.join(' | '),
        email: this.email,
        avatar: this.avatar
      }
    }
  }
}
</script>
