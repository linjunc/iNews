import instance from '../utils/request'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { url } from './baseUrl';
import { message, Button } from 'antd';
export async function post_values(values) {
    /* 发起 post 请求 */
    const data = {
        "account": "",
        "password": ""
    }
    //定义一个data对象
    data['account'] = values.username
    data['password'] = values.password
    const res = await axios({
        method:'post',
        headers:{"content-type":"application/json"},
        url: url + 'user_login',  //登录连接
        data: data
    }).then(
        /* 获取到axios的数据 */
        res => {
          console.log("get res:",res);
          /* 登录成功 */
          if(res.data.msg === "账号或密码错误"){
            alert("账号或密码错误")
            message.info('This is a normal message');
          }else{
             /* 保存token信息到本地 */
            window.localStorage.setItem('token',res.data.token)
            console.log("登录成功")
          }
       },error => {
          console.log("get request failed:",error);
       }
     );
}