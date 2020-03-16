//const ApiRootUrl = 'https://customer.wlcb.net:8086/api/';
//const ApiRootUrl = 'http://192.168.3.111:8360/api/';
const ApiRootUrl = 'http://127.0.0.1:8081/api/';
module.exports = {
  AuthLoginByWeixin: ApiRootUrl + 'user/loginByWeixin',
  AccessTokenByWeixin: ApiRootUrl +'user/getAccessToken',
  GetNickName:ApiRootUrl+'user/getNickName',
  GetVideoList:ApiRootUrl+'video/getVideoList',
  UpdateCustomerStatus:ApiRootUrl+'video/updateCustomerStatus',
  isCustomer:ApiRootUrl+'video/isCustomer',
  sendmsg :ApiRootUrl+"templete/sendMessage",
  getMyCard: ApiRootUrl + "getMyCard"
};