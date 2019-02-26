/**
 * create lff
 * time 9.29
*/
$(document).ready(function(){
    var main= {
        data:{
            url:"data.json"
        },
        dom:{
            vList:$('.v_list'),
            onBtn:$('.banner'),
            mList:$('.m_list')
        },
        fncs:{
            //  获取JSON数据
            getData:function(){
                $.getJSON(main.data.url,function(res){
                    if(res.status == '0'){
                        var resData = res.data.vList;
                        var markImg = res.data.markImg;
                        var html = "";
                        for(var i=0;i<resData.length;i++){
                            if(i%2 == 1){
                                html+='<div class="v_item">'+
                                '<div class="v_item_c">'+
                                    '<div class="v_item_r">'+
                                        '<img src="'+resData[i].imgUrl+'" alt="">'+
                                    '</div>'+                                
                                    '<div class="v_item_l">'+
                                        '<p>'+resData[i].name+'</p>'+
                                        '<p>'+resData[i].desc+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'                                
                            }else{
                                html+='<div class="v_item">'+
                                    '<div class="v_item_c">'+
                                        '<div class="v_item_l">'+
                                            '<p>'+resData[i].name+'</p>'+
                                            '<p>'+resData[i].desc+'</p>'+
                                        '</div>'+
                                        '<div class="v_item_r">'+
                                            '<img src="'+resData[i].imgUrl+'" alt="">'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'
                            }
                        }
                        main.dom.vList.append(html);
                        main.dom.mList.find('.m_item').eq(0).find('.codeImg').attr('src',markImg[0])
                        main.dom.mList.find('.m_item').eq(1).find('.codeImg').attr('src',markImg[1])
                    }
                })
            },
            //  按钮悬浮
            onBtn(){
                main.dom.onBtn.find('.btn').hover(function(){
                    main.dom.onBtn.find('.markInfo').fadeIn();
                },function(){
                    main.dom.onBtn.find('.markInfo').fadeOut();
                })
            }
        },
        init:function(){
            $("header").load("./public/header.html",function(){
                $(this).find('#home').addClass('active');
            });
            $(".footer").load("./public/footer.html");
            main.fncs.getData();
            main.fncs.onBtn();
        }
    };
    main.init();
})