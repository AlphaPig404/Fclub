export default{
  data() {
    return {
      user_info: {},
      clientWidth: document.documentElement.clientWidth,
    }
  },
  created(){
    this.user_info = this.getLocalStore('user_info')
  },
  methods:{
    sliceCards(data,count){
      return data.slice(0,count)
    },
    getLocalStore(name){
      const value = localStorage.getItem(name)||'{}'
      return JSON.parse(value)
    },
    setLocalStore(name,value){
      value = value? JSON.stringify(value):'{}'
      localStorage.setItem(name,value)
    }
  }
}