import { $ } from '../pub/packages';
;(function($){
	$.fn.myPictureTurn=function(options){
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
		var num=$imgBox.find('li').length;
		var liW=$imgBox.find('li').outerWidth();
		var liH=$imgBox.find('li').outerHeight();
		var $left=$imgBox.find('.pre');
		var $right=$imgBox.find('.next');
		var $i=$imgBox.find('.cir').find('i');
		var many=now.many;
		var cur_i=now.cur;
		var speed=now.speed;
		var time=now.delay;
		var dis=now.dis;
		var turn;
		origin();
		$left.click(function(){
			if(cur_i<=0){
				cur_i=num-many
			}else{
				cur_i--
			}
			move()
		});
		$right.click(function(){
			if(cur_i>=num-many){
				cur_i=0
			}else{
				cur_i++
			}
			move()
		});
		$i.click(function(){
			cur_i=$(this).index();
			move()
		});
		function move(){
			$i.eq(cur_i).addClass('cur').siblings().removeClass('cur');
			if(dis=='y'){
				$ul.stop(true,true).animate({top:-cur_i*liH},speed)
			}else{
				$ul.stop(true,true).animate({left:-cur_i*liW},speed)
			}}
			function origin(){
				if(dis=='y'){
					$ul.height(num*liH).css('top',-cur_i*liH)
				}else{
					$ul.width(num*liW).css('left',-cur_i*liW)}
					$i.eq(cur_i).addClass('cur').siblings().removeClass('cur');
					if(now.autoPlay){
						beginTurn();
						stopTurn($imgBox)
					}
				}
			function beginTurn(){
				turn=setInterval(function(){
					if(cur_i>=num-many){
						cur_i=0
					}else{
						cur_i++
					}
					move()
				},time)
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