export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          // 该属性为了解决 微信开发工具 BUG “ Property or method "toJSON" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property ”
          toJSON: null
        }
      },
      // 该 Mixin 是全局的，为了解决 uViewUI Form表单验证要在onReady生命周期 setRules 规则
      onReady() {
        if (this.$refs && this.$refs.uForm && this.rules) this.$refs.uForm.setRules(this.rules)
      }
    })
  }
}
