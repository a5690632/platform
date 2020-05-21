import store from '@/store'

export default {
  inserted(el, binding) {
   
    const { value } = binding
    // console.log(store.state.user.roles)
    const roles = store.state.user.roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role.roleName)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } 
  }
}
