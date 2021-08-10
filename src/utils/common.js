import store from '@/store';

export function handleAllUser(usersjson) {
  var handledUsers = [];
  var groupName1 = '业务一课';
  var groupName2 = '业务二课';
  var groupName3 = '业务三课';
  var groupName4 = '制品一课';
  var group1 = { label: groupName1, options: [] };
  var group2 = { label: groupName2, options: [] };
  var group3 = { label: groupName3, options: [] };
  var group4 = { label: groupName4, options: [] };
  for (var i in usersjson) {
    var option = {};
    if (usersjson[i]['group']) {
      if (usersjson[i]['group']['name'] === groupName1) {
        option = { value: usersjson[i]['name'], label: usersjson[i]['name'] };
        group1['options'].push(option);
      }

      if (usersjson[i]['group']['name'] === groupName2) {
        option = { value: usersjson[i]['name'], label: usersjson[i]['name'] };
        group2['options'].push(option);
      }

      if (usersjson[i]['group']['name'] === groupName3) {
        option = {
          value: usersjson[i]['name'],
          label: usersjson[i]['name']
        };
        group3['options'].push(option);
      }

      if (usersjson[i]['group']['name'] === groupName4) {
        option = {
          value: usersjson[i]['name'],
          label: usersjson[i]['name']
        };
        group4['options'].push(option);
      }
    }
  }

  if (store.getters.group === groupName1) {
    handledUsers.unshift(group1)
  } else {
    handledUsers.push(group1);
  }

  if (store.getters.group === groupName2) {
    handledUsers.unshift(group2)
  } else {
    handledUsers.push(group2);
  }

  if (store.getters.group === groupName3) {
    handledUsers.unshift(group3)
  } else {
    handledUsers.push(group3);
  }

  if (store.getters.group === groupName4) {
    handledUsers.unshift(group4)
  } else {
    handledUsers.push(group4);
  }

  return handledUsers;
}

export function formatDate(datestr) {
  datestr = datestr.replace(/-/g, '/');
  const date = new Date(datestr);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

export function compareJsonValueIsSame(new_json, old_json) {
  var keys = Object.keys(old_json);
  keys.forEach(element => {
    if (new_json[element] !== old_json[element]) {
      return false;
    }
  });
  return true;
}
