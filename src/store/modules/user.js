import { login, getInfo, updateEmailDays, updateUserPassword } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, setUserId } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  username: '',
  slims_name: '',
  group: '',
  organization: '',
  avatar: '',
  email: '',
  roles: [],
  user_id: getUserId(),
  user_mail_days: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
    setUserId(user_id)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_SLIMS_NAME: (state, slims_name) => {
    state.slims_name = slims_name
  },
  SET_GROUP: (state, group) => {
    state.group = group
  },
  SET_ORGANIZATION: (state, organization) => {
    state.organization = organization
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_MAIL_DAYS: (state, user_mail_days) => {
    state.user_mail_days = user_mail_days
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data, token } = response
        commit('SET_TOKEN', token)
        commit('SET_USER_ID', data.id)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.user_id).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        var roles_array = []

        data.roles.forEach((element) => {
          roles_array.push(element.name)
        })
        data.roles = roles_array

        const { username, email, slmsname, roles, group, organization, name, avatar, fmaildays } = data
        // roles must be a non-empty array
        if (!data.roles || data.roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_NAME', name)
        commit('SET_USERNAME', username)
        commit('SET_EMAIL', email)
        commit('SET_SLIMS_NAME', slmsname)
        commit('SET_GROUP', group.name)
        commit('SET_ORGANIZATION', organization.name)
        commit('SET_ROLES', roles)
        commit('SET_AVATAR', avatar)
        commit('SET_USER_MAIL_DAYS', fmaildays)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateManPower({ commit }, manPowerStr) {
    return new Promise((resolve, reject) => {
      updateEmailDays(manPowerStr).then(response => {
        const { data } = response
        commit('SET_USER_MAIL_DAYS', data.fmaildays)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateUserPassword({ commit }, password_info) {
    return new Promise((resolve, reject) => {
      updateUserPassword(password_info).then(response => {
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
