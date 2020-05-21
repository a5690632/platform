import Vue from "vue"
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

let ajax={}
for (const key in modules) {
  
  if (Object.prototype.hasOwnProperty.call(modules, key)) {
    ajax[key]=modules[key]
  }
}

Vue.prototype.$ajax = ajax
export default ajax

