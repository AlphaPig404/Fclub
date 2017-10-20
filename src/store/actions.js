import qs from 'qs'
import axios from 'axios'

export const setBackGroundColor = ({commit,state},{backgroundColor})=>{
  document.querySelector('body').style.backgroundColor = backgroundColor
}

export const toggleLike = ({commit,state},{data,type,isLiked})=>{
  console.log(data)
  const  params = {
    type,
    isLiked: data.isLiked,
    id: data._id
  }
  
  // axios.post('/like',qs.stringify(params)).then(res=>{
  //   console.log(res.data)
  // }).catch(err=>{

  // })
}
  
