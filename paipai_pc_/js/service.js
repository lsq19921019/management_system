$(document).ready(function(){
    var main= {
        data:{
            
        },
        dom:{
            priDesc:$(".about_con")
        },
        fncs:{

        },
        init:function(){
            $("header").load("./public/header.html",function(){$(this).find('#aboutus').addClass('active')});
            $(".footer").load("./public/footer.html");
            //main.fncs.getPriData();
        }
    };
    main.init();
})