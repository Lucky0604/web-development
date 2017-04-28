import $ from '../../utils'
import Base from '../base'

const VoteRecord = new Base('VoteRecord', {
  index: {type: Number, default: -1},
  vote: {type: Base.ObjectId(), ref: 'Vote'},
  user: {type: Base.ObjectId(), ref: 'User'}
})

VoteRecord.methods.create = async function (query) {
  const v = await VoteRecord.find({_id: query.vote})
  // 若无此设置，或者索引比可投票范围大
  if (!v || query.index >= v.points.length || query.index < 0) {return -1}
  return await VoteRecord.create(query)
}

export default VoteRecord.methods