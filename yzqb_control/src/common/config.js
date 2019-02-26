/**
 * Created by LiuSiqi 18-11-5
 */
let imgUrl = location.origin.indexOf('test')>-1?'http://test.image.yzqianbao.com/MyDownload/':'http://image.yzqianbao.com/MyDownload/';
let hosts = location.origin.indexOf('test')>-1?'http://test.control.yzqianbao.com':'http://control.yzqianbao.com';
let Config = {
  //接口地址
	// image.yzqb.yzmer.com
	// h5.yzqb.yzmer.com
  // control.yzqb.yzmer.com
  //http://test.image.yzqianbao.com/MyDownload/
  // host:'http://test.control.yzqianbao.com',
  host:hosts,
  uploadPath:'manage/uploadImage',
  imageUrl:imgUrl,
  // imageUrl:'http://test.image.yzqianbao.com/MyDownload/'
};
export default Config

