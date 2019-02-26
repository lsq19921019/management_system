<div class="header_wrap">
    <div class="header por">
        <!-- logo -->
        <div class="fl logo c f14" style="margin-top:14px;">
            <dl class="c">
                <dt class="fl"><a href="./"><img src="<%= require('../../assets/images/logo2.png') %>" title="小鸽理财" alt="小鸽理财"></a></dt>               
            </dl>
        </div>
        <!-- 主导航 -->
        <div class="nav fr f14">
            <ul id="J_mainNav">
                <li><a class="parent" href="javascript:;" id="J_myAccount">我的账户</a></li>
                <li class="por">
                    <a class="parent" href="./about_xg_company.html">信息披露</a>
                    <div id="J_navAbout" class="nav_about poa dsn">
                        <a href="./commitment_letter.html">承诺函</a>
                        <a href="./about_xg_company.html">关于小鸽</a>
                        <a href="./record_info.html">对外公告</a>
                        <a href="./platform_data.html">平台数据</a>
                        <a href="./security.html">安全保障</a>
                        <a href="./laws_page.html">出借人教育</a>
                        <a href="./news.html">新闻报道</a>
                    </div>
                </li>
                <li><a class="parent" href="./">首页</a></li> 
            </ul>
        </div>
        <!-- 登录&未登录 -->
        <div class="login_info poa f14">
            <ul>           
                <li class="last">
                    <a href="./about_xg_company.html">关于小鸽</a>
                </li>
                <li>
                    <a href="./newPeopleGuide.html">新手指引</a>
                </li>
                <% if(nickName) { %>
                <li class="first">&nbsp;                    
                    <a href="javascript:;">用户 <%= nickName %>
                    <a class="login_out" id="J_loginOut" href="javascript:;">退出</a>                    
                </li>
                <%} else {%>

                <%}%>
            </ul>
        </div>
    </div>
</div>
