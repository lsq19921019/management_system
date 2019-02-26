export default function interactiveWithApp(appFncName, paramsFromWap) {
  return new Promise(function(resolve, reject) {
    var typeObject = base.getClientType();
    var type = typeObject.type;
    var version = typeObject.version;
    if (version.length > 0) {
      if (type == "iOS") {
        base.setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler(appFncName, { param: paramsFromWap }, function(
            response
          ) {
            //客户端返回参数response，json字符串类型{"status":"0","msg":"success",result:""}
            resolve(response);
          });
        });
      } else if (type == "android") {
        base.connectWebViewJavascriptBridge(function(bridge) {
          if (!base.isBridgeInit) {
            bridge.init(function(message, responseCallback) {});
          }
          base.isBridgeInit = true;
          window.WebViewJavascriptBridge.callHandler(
            appFncName,
            { param: paramsFromWap },
            function(response) {
              resolve(response);
            }
          );
        });
      }
    } else {
      //wap端直接返回特殊标识，方便单独处理
      resolve("wap");
    }
  });
}
