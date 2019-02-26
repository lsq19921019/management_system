<div class="about_nav">
    <ul class="c">
        <% for(var i=0; i<config.length; i++) { %>
            <li id="J_<%= config[i].href.replace('.html','').split('/')[1] %>"><a href="<%= config[i].href %>"><%= config[i].text %></a></li>
        <% } %>

    </ul>
</div>