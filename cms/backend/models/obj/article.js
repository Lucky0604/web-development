import $ from '../../utils'
import Base from '../base'

const Article = new Base('Article', {
  user: {type: Base.ObjectId(), ref: 'User'},
  headerImg: String,
  title: String,
  content: String,
  markdown: String,
  html: String,
  status: String,
  job: {},
  sendAt: {type: Date, default: Date.now},
  likes: {type: Array, default: []},
  _index: {type: Number, default: 0, index: true}
})

const validateSchema = $.parameter.object().keys({
  title: $.parameter.string(),
  user: $.parameter.string(),
  content: $.parameter.string().empty(''),
  markdown: $.parameter.string().empty(''),
  html: $.parameter.string().empty(''),
  subTitle: $.parameter.string().empty(''),
  headerImg: $.parameter.string().empty(''),
  status: $.parameter.string(),
  sendAt: $.parameter.date().empty('')
})
.with('title', 'user')
.without('headerImg', 'subTitle', 'sendAt', 'html', 'markdown', 'content')

Article.methods.create = async function (query) {
  const {error, value} = $.parameter.validate(query, validateSchema)
  $.debug(error)
  if (error) return -1
  query._index = await this.count({}) + 1
  return await Article.create(query)
}

export default Article.methods