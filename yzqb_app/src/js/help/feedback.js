!function(global, layer, userUtil, dataUtil){

      // 反馈字数计算
      $("#feedText").keyup(function(){
        $("#feedCount").text($("#feedText").val().length);
      });

      // 提交反馈意见
      $("#feedSubBtn").on("click",function(){
         var $this = $(this);
         var _model = getModel();
         if(validate()){
            var _data = {
              userUuid: userUtil.userID(),
              feedbackString: _model.feedbackString,
              uploadImages: _model.uploadImages.join("|")
            }
            layer.showLoad();
            userUtil.ajax({
              url: global.localUrl + 'nw/users/feedback',
              data: _data,
              done: function(re){
                layer.hideLoad();
                layer.tips('反馈成功');
                setTimeout(function(){
                  location.reload();
                },1000);
              }
            })
            return;
         }
      });


      // 控制最多传几张图片
      function photoLimit() {
          var _max = 3;
          if ($(".photos .photo").length >= _max + 1) {
              $("#btnAddPhoto").parents(".photo_wap").hide();
          } else {
              $("#btnAddPhoto").parents(".photo_wap").show();
          }
      }

    // 上传图片
    !function () {
        new PicUpLoad("flContractPhoto", {
            formUrl:global.localUrl+'nw/upload/imageUpload',
            formData: {type:"FEED_BACK_IMAGE",sessionId:userUtil.sid()},
            onFileRead: function (fileObj) {
                canUpload = true;
                var $p = $("<div class=\"photo_wap\"><div class=\"photo\"><input type=\"hidden\" class=\"photo_url\"/><img class=\"photo_bg\" /><div class=\"photo_upload\"><div class=\"photo_upload_progress\"><div class=\"photo_upload_bar\"><i></i></div><p class=\"photo_upload_txt\">正在读取文件</p></div><div class=\"photo_upload_cancel\"></div></div></div></div>");
                $p.find(".photo_upload_cancel").on("click", function () { _remove($p); });
                $p.insertBefore($("#btnAddPhoto").parents(".photo_wap"));
                photoLimit();

                fileObj.domBar = $p;
            },
            onLoadStart: function (e, fileObj) {
                var $p = fileObj.domBar;
                $p.find(".photo_upload_cancel ").hide();
                _showProgress($p);
            },
            onProgress: function (e, fileObj) {
                var $p = fileObj.domBar;
                var _loaded = e.loaded;
                var _total = e.total;
                var _per = Math.floor(100 * _loaded / _total);
                _showProgress($p, _per);
            },
            onSuccess: function (re, fileObj) {
                var $p = fileObj.domBar;
                $p.find(".photo_upload_progress ").hide();
                $p.find(".photo_upload_cancel ").show();
                $p.find(".photo_url").val(re.data.url);

                if (0 == $p.find(".photo_img").length) {
                    $p.find(".photo_bg").after("<img class=\"photo_img\" />");
                }
                $p.find(".photo_img").attr("src", fileObj.localUri);
            },
	          onFail: function (re, fileObj) {
	              layer.tips("上传失败，请稍后重试");
	              _remove(fileObj.domBar);
	          },
	          onError: function (fileObj) {
	              layer.tips(global.netError);
	              _remove(fileObj.domBar);
	          }
        }).init();

        function _showProgress($p, per) {
            if (per) {
                per = 100 == per ? 99 : per;  //容错上传100%卡住的情况
                $p.find(".photo_upload_bar i").css("width", per + "%");
                $p.find(".photo_upload_txt").text("正在上传 " + per + "%");
            } else {
                $p.find(".photo_upload_bar i").css("width", "0");
                $p.find(".photo_upload_txt").text("正在准备上传");
            }
        }

        function _remove($p) {
            $p.remove();
            photoLimit();
        }
    }();

    // 获取页面数据
 		function getModel() {
        var _arr = [];
        $(".photos .photo").each(function (k, v) {
            if (!$(v).hasClass("btn_add_photo")) {
                var _url = $(v).find(".photo_url").val();
                if (_url) {
                    _arr.push(_url);
                } else {
                    _arr.push("");
                }
            }
        });
        return {
            feedbackString: $.trim($("#feedText").val()),
            uploadImages: _arr
        }
  	};

    // 数据校验
    function validate() {
        var _model = getModel();
        if (!_model.feedbackString) {
            layer.tips("请输入反馈意见"); return false;
        }
        for (var i = 0 ; i < _model.uploadImages.length; i++) {
            if (!_model.uploadImages[i]) {
                layer.tips("照片正在上传，请等待"); return false;
            }
        }
        return true;
    };
}(global, layer, userUtil, dataUtil)