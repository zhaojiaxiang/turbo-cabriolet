const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  // common
  systems: state => state.common.systems,
  projects: state => state.common.projects,
  group_users: state => state.common.group_users,
  all_group_users: state => state.common.all_group_users,
  // user
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  user_id: state => state.user.user_id,
  user_mail_days: state => state.user.user_mail_days,
  name: state => state.user.name,
  username: state => state.user.username,
  email: state => state.user.email,
  slims_name: state => state.user.slims_name,
  group: state => state.user.group,
  organization: state => state.user.organization,
  roles: state => state.user.roles,
  // check out list
  checkout_table: state => state.checkouts.checkout_table,
  checkout_current_page: state => state.checkouts.checkout_current_page,
  checkout_page_size: state => state.checkouts.checkout_page_size,
  checkout_page_count: state => state.checkouts.checkout_page_count,
  checkout_count: state => state.checkouts.checkout_count,
  // work bench
  task_bar: state => state.workbench.task_bar,
  project_items: state => state.workbench.project_items,
  slip_no_items: state => state.workbench.slip_no_items,
  slip_current_page: state => state.workbench.slip_current_page,
  slip_page_size: state => state.workbench.slip_page_size,
  slip_page_count: state => state.workbench.slip_page_count,
  slip_count: state => state.workbench.slip_count,
  slip_table: state => state.workbench.slip_table,
  // project
  project_mcl_list: state => state.projects.project_mcl_list,
  project_pcl_list: state => state.projects.project_pcl_list,
  slip_status_filters: state => state.projects.slip_status_filters,
  qa_status_filters: state => state.projects.qa_status_filters,
  slip_slip_filters: state => state.projects.slip_slip_filters,
  slip_assigned_to_filters: state => state.projects.slip_assigned_to_filters,
  span_list: state => state.projects.span_list,
  // qa
  qa_list: state => state.qa.qa_list
}
export default getters
