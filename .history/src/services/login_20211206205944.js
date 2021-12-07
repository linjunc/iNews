import instance from '../utils/request'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { url } from './baseUrl';
import { message, Button } from 'antd';
import { Router } from 'react-router';
export async function post_values(values) {
    //定义一个data对象
    const res = await axios({
        method:'post',
        headers:{"content-type":"application/json"},
        url: url + 'user_login',  //登录连接
        data: values
    }).then(
        /* 获取到axios的数据 */
        res => {
          console.log("get res:",res);
          /* 登录成功 */
          if(res.data.error === "账号或密码错误"){
            message.info('账号或密码错误');
          }else{
             /* 保存token信息到本地 */
            window.localStorage.setItem('token',res.data.token)
            message.info('登录成功');
            {<Link to="/"> 
          }
       },error => {
          console.log("get request failed:",error);
       }
     );
}