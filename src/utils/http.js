/*
* 封装Http请求
* */

import Vue from 'vue'
import  { LoadingPlugin, ToastPlugin } from 'vux'
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
import axios from 'axios'
import process from '../../config/prod.env'


// axios初始化：延迟时间，主路由地址
let instance = axios.create({
  baseURL: process.API_BASEURL,  // 从环境进程中根据运行环境获取的api的base_url
  timeout: 10000, // 请求超时时间
});


//http request拦截器
instance.interceptors.request.use(config => {
  //在发送请求之前做某事
  Vue.$vux.loading.show({
    text: 'Loading'
  })
  config.headers = {
    "Content-Type": "application/json; charset=utf-8"
  }
  config.data = JSON.stringify(config.data);
  return config;
}, error => {
  //请求错误时做些事
  setTimeout(() => {
    Vue.$vux.loading.hide();
    Vue.$vux.toast.text('加载超时', 'middle')
  },3000)
  return Promise.reject(error);
});


//http response拦截器
instance.interceptors.response.use(response => {
  //对响应数据做些事
  Vue.$vux.loading.hide();
  return response;
}, error => {
  //请求错误时做些事
  setTimeout(() => {
    Vue.$vux.loading.hide()
    Vue.$vux.toast.text('请求失败', 'middle');
  },1000)
  return Promise.reject(error);
});

export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.get(url, {
        params: params
      })
        .then(res => {
          //请求结束成功
          if (res.status === 200 || res.status === 304) {
            resolve(res.data)
          }else{
            reject(new Error(res.data.msg))
          }
        })
        .catch(res => {
          reject(res)
        })
    })
  },
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, data)
        .then(res => {
          //请求结束成功
          if (res.status === 200 || res.status === 304) {
            resolve(res.data)
          }else{
            reject(new Error(res.data.msg))
          }
        })
        .catch(res => {
          reject(res)
        })
    })
  },
}


