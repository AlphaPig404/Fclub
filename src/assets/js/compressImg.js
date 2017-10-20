const MAX_SIZE = 200 * 1024 // 200KB
/**
 * 将file对象转成base64格式
 */
export function file2base64(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader()

    reader.onload = function(e){
      const result = e.target.result
      resolve(result)
    }
    reader.readAsDataURL(file)
  })
}

/**
 * 将base64数据传入img对象，绘制到canvas上，再调用canvas.toDataURL对图片进行压缩，返回压缩后的base64数据
 */


export function compress(baseStr){
  return new Promise((resolve,reject)=>{

    if(baseStr.length < MAX_SIZE){resolve(baseStr)}

    let img = new Image()
    img.src = baseStr

    if(img.complete){
      callback()
    }else{
      img.onload = callback
    }

    function callback(){
      const d = window.document
      // 用于压缩图片的canvas
      const canvas = d.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 瓦片canvas
      const tCanvas = d.createElement('canvas')
      const tCtx = tCanvas.getContext('2d')

      const initSize = img.src.length
      let width = img.width
      let height = img.height

      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
    
      if((ratio = width*height/4000000)>1){
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      }else{
        ratio = 1
      }

      canvas.width = width
      canvas.height = height

      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0,0,canvas.width,canvas.height)

      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if((count = width *height/1000000)>1){
        count = ~~(Math.sqrt(count)+1) // 计算要分成多少瓦片

        // 计算每块瓦片的宽和高
        const nw = ~~(width/count)
        const nh = ~~(height/count)

        tCanvas.width = nw
        tCanvas.height = nh

        for(let i = 0;i< count;i++){
          for(let j = 0; j < count ;j++){
            tCtx.drawImage(img,i*nw*ratio,j*nh*ratio,nw*ratio,nh*ratio,0,0,nw,nh)

            ctx.drawImage(tCanvas,i*nw,j*nh,nw,nh)
          }
        }
      }else{
        ctx.drawImage(img,0,0,width,height)
      }

      // 进行最小压缩
      const nData = canvas.toDataURL('image/jpeg', 0.6)

      console.log('压缩前base64数据长度：' + initSize)
      console.log('压缩后base64数据长度：' + nData.length)
      console.log('base64数据压缩率：' + ~~(100 * (initSize - nData.length) / initSize) + '%')

      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      img = null

      resolve(nData)
    }
  })
  
}


export function base2blob(baseStr,type){
  const text = window.atob(baseStr.split(',')[1])
  const buffer = new ArrayBuffer(text.length)
  const ubuffer = new Uint8Array(buffer)
 
  for (let i = 0; i < text.length; i++) {
    ubuffer[i] = text.charCodeAt(i)
  }

  const Builder = window.WebKitBlobBuilder || window.MozBlobBuilder
  let blob

  if (Builder) {
    const builder = new Builder()
    builder.append(buffer)
    blob = builder.getBlob(type)
  } else {
    blob = new window.Blob([buffer], {type: type})
  }
  return blob
}
