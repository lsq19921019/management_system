/**
 * Created by alan on 17-4-30.
 */
let imgUrl = location.origin.indexOf('test')>-1?'http://test.image.yzqianbao.com/MyDownload/':'http://image.yzqianbao.com/MyDownload/';
let hosts = location.origin.indexOf('test')>-1?'http://test.control.yzqianbao.com':'http://control.yzqianbao.com';
let Config = {
  //接口地址
  // host:'http://192.168.2.106:8080',
  //collection.yzqianbao.com
  host:hosts,
  uploadPathL:'',
  imageUrl:imgUrl,
};

export default Config

