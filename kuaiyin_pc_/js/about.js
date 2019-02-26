$(document).ready(function(){
    var main= {
        data:{
            
        },
        dom:{
            
        },
        fncs:{

        },
        init:function(){
            $("header").load("./public/header.html",function(){$(this).find('#aboutus').addClass('active')});
            $(".footer").load("./public/footer.html");
            $(".aboutNav").load("./public/aboutNav.html",function(){$(this).find("#us").addClass('activeNav')});
        }
    };
    main.init();
})