$(document).ready(function(){
    var main= {
        data:{
            
        },
        dom:{
            /*                
                www.namicaifu.com   粤ICP备17096796号-1
                www.namilicai.com    粤ICP备17096796号-3
                www.gumicaifu.com    粤ICP备17096796号-4
            */
        },
        fncs:{
            getHeaderData(){
                $.getJSON('data.json',function(res){
                    if(res.status == '0'){
                        var resData = res.data.footdata.baId   //备案号信息
                        var resDatainfo = res.data.footdata    //底部信息            
                        if(location.href.indexOf('namicaifu') > 0) {
                            $(".xkId").text(resData[0]);
                        }else if(location.href.indexOf('namilicai') > 0){
                            $(".xkId").text(resData[1]);
                        }else if(location.href.indexOf('gumicaifu') > 0){
                            $(".xkId").text(resData[2]);
                        }else if(location.href.indexOf('kuaiyin') > 0){
                            $(".xkId").text(resData[3]);
                        }else{
                            $(".xkId").text(resData[0]);
                        }

                        $(".wxImgInfo img").attr("src",resDatainfo.info.src)
                        $(".concat .phone").text(resDatainfo.info.phone)
                        //链接
                        if(resDatainfo.linklist[0].linkarr.length>0){
                            for(var i=0;i<resDatainfo.linklist[0].linkarr.length;i++){
                                $(".linkList").eq(0).append('<a href="'+resDatainfo.linklist[0].linkarr[i].link+'">'+resDatainfo.linklist[0].linkarr[i].title+'</a>')
                            }
                        }
                        if(resDatainfo.linklist[1].linkarr.length>0){
                            for(var i=0;i<resDatainfo.linklist[1].linkarr.length;i++){
                                $(".linkList").eq(1).append('<a href="'+resDatainfo.linklist[1].linkarr[i].link+'">'+resDatainfo.linklist[1].linkarr[i].title+'</a>')
                            }
                        }
                        if(resDatainfo.linklist[2].linkarr.length>0){
                            for(var i=0;i<resDatainfo.linklist[0].linkarr.length;i++){
                                $(".linkList").eq(2).append('<a href="'+resDatainfo.linklist[2].linkarr[i].link+'">'+resDatainfo.linklist[2].linkarr[i].title+'</a>')
                            }
                        }                                
                    }
                })
            }
        },
        init : function(){
            main.fncs.getHeaderData();
        },
        bind : function() {

        }
    };
    main.init();
})