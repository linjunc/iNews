import instance from '../utils/request'

const Login = () => {
    /* 发起 post 请求 */
const navigate = useNavigate()
const calRef = useRef(null);
/* 获取表单数据 */
const onFinish = async (values) => {
    /* 禁止刷新 */
    const data = {
        "account": "",
        "password": ""
    }
    //定义一个data对象
    data['account'] = values.username
    data['password'] = values.password
    console.log('data:', data);
    const res = await axios({
        method:'post',
        headers:{"content-type":"application/json"},
        url: 'https://qctm8y.api.cloudendpoint.cn/user_login',
        data: data
    }).then(
        /* 获取到axios的数据 */
        res => {
          console.log("get res:",res);
          /* 登录成功 */
          if(res.data.msg === "账号或密码错误"){
            alert("账号或密码错误")
          }else{
             /* 保存token信息到本地 */
             window.localStorage.setItem('token',res.data.token)
            navigate('/');
            console.log("登录成功")
          }
       },error => {
          console.log("get request failed:",error);
       }
     );
  };