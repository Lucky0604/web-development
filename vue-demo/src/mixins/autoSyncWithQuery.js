import updateQuery from 'MIXIN/updateQuery'
import _difference from 'lodash/difference'

/**
 * 引入本mixin组件，相应字段须以$结尾
 * 并需在ready内调用: this.autoSyncWithQuery();
 *
 * [query 同步到本地变量]这一步，赋值类型为string
 */
export default {
  mixins: [updateQuery],
  // Tips: Vue不代理前缀为$或 _ 的变量，因为这些变量会被视为私有变量
  data: () => ({specialFields_: []}),
  watch: {
    '$route.query' (curQuery, oldQuery) {
      const missingKeys = _difference(
        Object.keys(oldQuery),
        Object.keys(curQuery)
      )
      this.autoSyncWithQuery(missingKeys)
    }
  },
  methods: {
    _init() {
      let specialFields = []
      for (let origField in this.$data) {
        if (!origField.endsWith('$')) continue
        var field = origField.replace(/\$$/, '')
        specialFields.push(field)
        this._cache(origField)
        this._watch(origField, field)
      }
      this.specialFields_ = specialFields
    },
    // 缓存其默认值(例如limit$默认值5，对应使用limit$$ 缓存5)
    _cache (origField) {
      this.$data[`${origField}$`] = this[origField]
    },
    _restore (origField) {
      this[origField] = this.$data[`${origField}$`]
    },
    _watch (origField, field) {
      this.$watch(origField, function (v) {
        // 本地变量同步到query
        this.updateQuery({[field]: v})
      })
    },
    autoSyncWithQuery (missingKeys) {
      if (!missingKeys) this._init()   // 初始化

      const {query} = this.$route
      this.specialFields_.forEach(field => {
        var origField = `${field}$`
        query[field] && (this[origField] = query[field])   // query 同步到本地
        missingKeys && missingKeys.includes(field) && this._restore(origField)
      })
    }
  }
}
