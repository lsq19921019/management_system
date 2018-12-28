<template>
</template>
<script>
	import alertify from 'alertifyjs';
  import DataUtil from '../common/dataUtil'
	export default {
		data() {
			return {}
		},
		methods: {
			connect() {
				let stompClient = null;
				let socket = new SockJS("http://control.yaoqianguan.com/manage/message");
				// let socket = new SockJS("http://192.168.0.133:8088/manage/message");
				stompClient = Stomp.over(socket);
				stompClient.connect({}, (frame) => {
					// console.log(frame);
		  		stompClient.subscribe('/topic/collectionMessage', (greeting) => {
		    		this.showGreeting(greeting);
	 	 			});
				});
			},
			showGreeting(message) {
			 let audioElement = document.createElement('audio');
				audioElement.setAttribute('src','http://control.yqguan.com/assets/message_alert.mp3');
				let {body} = message;
				let _body = JSON.parse(body);
				console.log(_body);
				for(var i=0; i< _body.length; i++){
					if(_body[i].userId == DataUtil.id()){
      			audioElement.play();
						let _url = _body[i].url;
			 			let msg = alertify.notify(_body[i].message, '', 10, function(){});
			 			msg.callback = (isClicked) => {
			 				if(isClicked){
             		window.open(_url);
             	}else{}
			 			}
					}
				}
			},
			//自动连接
		},
		mounted() {
			this.connect();
		}
	}
</script>
<style >
	.alertify-notifier.ajs-right {
		right: 120px;
	}
	.alertify-notifier .ajs-message {
		width: 360px;
		color: #fff;
		background: #324057;
	}
</style>
