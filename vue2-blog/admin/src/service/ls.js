/**
 * Created by lucky on 4/4/17.
 *
 * localStorage相关方法
 */
import localStorage from 'local-storage'

export const ls = {
  get (key, defaultVal = null) {
    return localStorage(key) || defaultVal
  },

  set(key, val) {
    return localStorage(key, val)
  },

  remove(key) {
    return localStorage.remove(key)
  }
}
