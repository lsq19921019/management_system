/*
* 图片上传控件  2016-11-08
* FileObj    为文件对象与上传的文件绑定
* PicUpLoad  为上传控件对象与File控件绑定
*/

"use strict";

function FileObj() {
    //文件类型
    this.type = "";
    //文件名
    this.name = "";
    //本地地址
    this.localUri = "";
    //传递数据
    this.basic64 = "";
    //原图片
    this.img = null;
    //图片宽度
    this.width = 0;
    //图片高度
    this.height = 0;
    //
    this.domBar = null;
}

function PicUpLoad(inputID, param) {
    var conf = param || {};

    //上传控件Dom元素id
    this.inputID = inputID;
    //上传大小限制
    this.maxSize = conf.maxSize || 10;
    //文件格式限制
    this.fileType = conf.fileType || "png|jpg|jpeg|bmp";
    //上传超时
    this.timeout = conf.timeout || 300000;
    //是否重置控件
    this.isReset = conf.isReset || true;
    //是否启动压缩
    this.isCompress = conf.isCompress || true;
    //压缩率
    this.compressRate = conf.compress || 95;
    //压缩宽度
    this.compressWidth = conf.compressWidth || 1000;
    //上传地址
    this.formUrl = conf.formUrl || (global.localUrl + "upload/uploadBase64.json");
    //附加上传参数
    this.formData = conf.formData || {}

    //文件读取后事件
    this.onFileRead = conf.onFileRead || function () { };
    //文件上传开始事件
    this.onLoadStart = conf.onLoadStart || function () { };
    //文件上传进度事件
    this.onProgress = conf.onProgress || function () { };
    //文件上传成功事件
    this.onSuccess = conf.onSuccess || function () { };
    //文件上传失败事件
    this.onFail = conf.onFail || function () { };
    //文件上传网络错误
    this.onError = conf.onError || function () { };
    //文件上传结束后
    this.onFinal = conf.onFinal || function () { };
}

PicUpLoad.prototype.init = function () {
    var _this = this;
    if (!_this.inputID) {
        console.error("PicUpLoad is Null");
        return;
    }
    var _input = document.getElementById(_this.inputID);
    _input.addEventListener("change", function (e) { _this._change(e); }, false);
}

PicUpLoad.prototype._change = function (e) {
    var _this = this,
        _input = e.target;
    var _file = _input.files[0];

    if (_this.isReset) {
        _input.outerHTML = _input.outerHTML;
        var _dom = document.getElementById(_this.inputID);
        _dom.addEventListener("change", function (e) { _this._change(e) }, false);
    }

    if (_file) {
        if (_file.size > 1024 * 1024 * _this.maxSize) {
            layer.tips("图片大小超出限制，请上传小于" + _this.maxSize + "M的图片");
            return;
        }

        if (_file.type && !new RegExp("image.(" + _this.fileType + ")").test(_file.type)) {
            layer.tips('选择的文件类型不是图片');
            return;
        }

        var fileObj = new FileObj();
        fileObj.type = _file.type;
        fileObj.name = _file.name;
        //兼容处理
        try {
            if (window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1) {
                fileObj.localUri = window.webkitURL.createObjectURL(_file);
            }
            else {
                fileObj.localUri = window.URL.createObjectURL(_file);
            }
        } catch (e) {
        }

        var _reader = new FileReader();
        _reader.readAsDataURL(_file);
        _reader.onload = function (e) {
            var _img = new Image();
            var _res = fileObj.basic64 = this.result + "";
            _img.src = _res;
            _img.onload = function () {
                fileObj.img = _img;
                fileObj.width = _img.width;
                fileObj.height = _img.height;

                if (_this.isCompress) {
                    _this._compress(fileObj);
                }
                fileObj.img = null;   //Dispose
                _this._send(fileObj);
            }
        }
        _this.onFileRead(fileObj);

    } else {
        global.log("File Upload Error", "upload.js : _file is undefined");
    }
}

PicUpLoad.prototype._compress = function (fileObj) {
    var _this = this;
    if (fileObj.width < _this.compressWidth && fileObj.height < _this.compressWidth) {
        return;
    }

    var _ratio = (fileObj.width / fileObj.height).toFixed(2);
    var _canvas = document.createElement('canvas');
    var _ctx = _canvas.getContext('2d');
    var _area = fileObj.width * fileObj.height;

    if (fileObj.width < fileObj.height) {
        var _needComp = fileObj.width > _this.compressWidth;
        fileObj.width = _needComp ? _this.compressWidth : fileObj.width;
        fileObj.height = _needComp ? Math.round(_this.compressWidth / _ratio) : fileObj.height;
    } else {
        var _needComp = fileObj.height > _this.compressWidth;
        fileObj.height = _needComp ? _this.compressWidth : fileObj.height;
        fileObj.width = _needComp ? Math.round(_this.compressWidth * _ratio) : fileObj.width;
    }

    _canvas.width = fileObj.width;
    _canvas.height = fileObj.height;

    // IOS 下 高像素图片 drawImage 的BUG
    if (_area > 2000000 && navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        var _vertSquashRatio = getRatio(fileObj.img);
        _ctx.drawImage(fileObj.img, 0, 0, fileObj.img.width, fileObj.img.height, 0, 0, fileObj.width, fileObj.height / _vertSquashRatio);

    } else {
        _ctx.drawImage(fileObj.img, 0, 0, fileObj.img.width, fileObj.img.height, 0, 0, fileObj.width, fileObj.height);
    }
    fileObj.basic64 = _canvas.toDataURL(fileObj.type, _this.compressRate / 100);
    fileObj.img = null;

    function getRatio(img) {
        if (/png$/i.test(img.src)) {
            return 1;
        }
        var iw = img.naturalWidth, ih = img.naturalHeight;
        var canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = ih;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var data = ctx.getImageData(0, 0, 1, ih).data;
        var sy = 0;
        var ey = ih;
        var py = ih;
        while (py > sy) {
            var alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        var ratio = (py / ih);
        return (ratio === 0) ? 1 : ratio;
    }
}

PicUpLoad.prototype._send = function (fileObj) {
    var _this = this;
    var _formData = {
        imgBase64:fileObj.basic64.split("base64,")[1]
    };

    for (var p in _this.formData) {
        _formData[p] = _this.formData[p];
    }

    var _formData = JSON.stringify(_formData);

    var xhr = new XMLHttpRequest();
    xhr.timeout = _this.timeout;

    // 开始上传
    xhr.addEventListener("loadstart", function (e) {
        _this.onLoadStart(e, fileObj);
    }, false);
    // 进度
    xhr.upload.addEventListener("progress", function (e) {
        _this.onProgress(e, fileObj);
    }, false);
    // 完成
    xhr.addEventListener("load", function (e) {
        if (200 == xhr.status) {
            var re = dataUtil.stringToJson(xhr.responseText);
            if (1 == re.code) {
                _this.onSuccess(re, fileObj);
            } else {
                _this.onFail(re, fileObj);
            }
        } else {
            _this.onError(fileObj);
        }
        _this.onFinal(fileObj);
        fileObj = null;    //Dispose
    }, false);

    xhr.open("POST", _this.formUrl);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(_formData);
}
