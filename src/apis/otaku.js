import jsonp from 'jsonp'

const url = 'https://www.toutiao.com/pgc/ma/'

const params = {
  page_type: 1,
  uid: 61703921384,
  media_id: 1569738907524097,
  output: 'json',
  is_json: 1,
  count: 20,
  from: 'user_profile_app',
  version: 2,
  as: 'A195291C2B604F3',
  cp: '59CB1064EFC38E1',
  callback: 'jsonp3'
}

export default function getOtaku(url,data,opts){

  url += (url.indexOf('?')<0?'?':'&')+param(data)

  return new Promise((resolve,reject)=>{
    jsonp(url,opts,(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

export function param(data){
  let url = ''
  for(var k in data){
    let value = data[k]!== undefined? data[k]:''
    url += '&'+k+'='+encodeURIComponent(value)
  }
  return url ? url.substring(1):''
}