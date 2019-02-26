import { $ } from '../pub/packages';
;(function($){
	$.fn.mySimpleTurn=function(options){
		var old={
			speed:500,
			delay:2000,
			many:1,
			cur:0,
			autoPlay:false,
			dis:'x'
		};
		var now=$.extend({},old,options);
		return this.each(function(){
			var $imgBox=$(this);
			var $ul=$imgBox.find('ul');
			var liW=$imgBox.find('li').outerWidth();
			var liH=$imgBox.find('li').outerHeight();
			var $left=$imgBox.find('.pre');
			var $right=$imgBox.find('.next');
			var $i=$imgBox.find('.cir').find('i');
			var many=now.many;
			var num=$imgBox.find('li').length;
			var cur_i=now.cur;
			var speed=now.speed;
			var time=now.delay;
			var dis=now.dis;
			var turn;
			if(dis=='x'){
				cloneLi()
			}
			function cloneLi(){
				var lastLi=$ul.find('li').last();
				for(var i=0;i<many;i++){
					var li=$ul.find('li').eq(i).clone();
					$ul.append(li)
				}
				for(var t=0;t<many;t++){
					var thisIndex=lastLi.index();
					var preLi=$ul.find('li').eq(thisIndex-t).clone();
					$ul.prepend(preLi)
				}
				cur_i=many
			}
			origin();
			$left.click(function(){
				if(dis=='x'){
					if(cur_i<=0){
						cur_i=num+many
					}else{
						cur_i--}
					}else{if(cur_i<=0){
						cur_i=num-many
					}else{cur_i--}
				}
				move();
				playSameTime(cur_i)
			});
			$right.click(function(){
				if(dis=='x'){
					if(cur_i>=num+many){
						cur_i=0
					}else{
						cur_i++
				}}else{
					if(cur_i>=num-many){
						cur_i=0
					}else{
						cur_i++
					}}
					move();
					playSameTime(cur_i)
				});
				$i.click(function(){
					cur_i=$(this).index();
					move()
				});
				window.GoToPlay=function(_num){
					cur_i=_num;
					move()
				};
				function move(){
					$i.eq(cur_i).addClass('cur').siblings().removeClass('cur');
					if(dis=='y'){
						$ul.stop(true,true).animate({top:-cur_i*liH},speed)
					}else{
						$ul.stop(true,true).animate({
							left:-cur_i*liW
						},
						speed,
						function(){
							if(cur_i==num+many){
								cur_i=many;
								$ul.css('left',-cur_i*liW)
							}
							if(cur_i==0){
								cur_i=num;
								$ul.css('left',-cur_i*liW)
							}
						})
					}
				}
				function playSameTime(_cur){
					var num;
					if(_cur==4||_cur==5||_cur==6||_cur==7||_cur==8||_cur==9||_cur==10||_cur==16)
					{
						num=0;
					}else if(_cur==11||_cur==12||_cur==13||_cur==1||_cur==0)
					{
						num=1;
					}else if(_cur==14||_cur==2)
					{
						num=2;
					}else if(_cur==15||_cur==3)
					{
						num=3;
					}else
					{
						num=0;
					}
					$('#unit dl dd').eq(num).addClass('on').siblings().removeClass('on');            
				}				
				function origin(){
					if(dis=='y'){
						$ul.height(num*liH).css('top',-cur_i*liH)
					}else{
						$ul.width((num+many*2)*liW).css('left',-cur_i*liW)
					}
					$i.eq(cur_i).addClass('cur').siblings().removeClass('cur');
					if(now.autoPlay){
						beginTurn();
						stopTurn($imgBox)
					}}
					function beginTurn(){
						turn=setInterval(function(){$right.click()},time)
					}
					function stopTurn(obj){
						obj.hover(function(){
							clearInterval(turn)
						},function(){
							beginTurn()
						})
					}
				})
			}
		})($);