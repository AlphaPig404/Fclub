const set = function(name,value){
  value = value? JSON.stringify(value):'{}'
  localStorage.setItem(name,value)
}

const get = function(name){
  const value = localStorage.getItem(name)||'{}'
  return JSON.parse(value)
}

export default{
  get,
  set
}