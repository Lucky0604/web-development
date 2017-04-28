import $ from '../../utils'
import Base from '../base'

const Comment = new Base('Comment', {
  user: {type: Base.ObjectId(), ref: 'User'},
  to: {type: Base.ObjectId(), ref: 'User'},
  comment: {type: Base.ObjectId(), ref: 'Comment'},
  article: {type: Base.ObjectId(), ref: 'Article'},
  activity: {type: Base.ObjectId(), ref: 'Activity'},
  question: {type: Base.ObjectId(), ref: 'Question'},
  vote: {type: Base.ObjectId(), ref: 'Vote'},
  content: String
})

Comment.methods.create = async function (query) {
  if ($.isEmpty(query.content) || $.isEmpty(query.user)) return -1
  return await Comment.create(query)
}

export default Comment.methods