!function(global, layer, userUtil, dataUtil){
	var ratess,amountss,orderNo="as";
	var beheadInterest = '';
	var amount="",amount_="",trem="";
	var applyPurpus;
	initProduct();
	
	var temp_selected = {
		borrowingAmount:'',
		productId:'',
		repaymentAmount:'',
		borrowingTerm:'',
		beheadInterest:'',
		gameRechargeRateMin:''
	};
	// re = {
	// 	"code": 1,
	// 	"message": "success",
	// 	"data": [
	// 		{
	// 			"borrowingAmount": "1000.00",
	// 			"borrowingTerm": "14",
	// 			"interest": "13.30",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1013.30",
	// 			"gameRechargeRateMin": "0.2000",
	// 			"productId": "42F60274C3A9488DAE838EB6F2B674A9",
	// 			"productLevel": 1,
	// 			"beheadInterest": "200",
	// 			"faceStatus": true
	// 		},
	// 		{
	// 			"borrowingAmount": "1100.00",
	// 			"borrowingTerm": "14",
	// 			"interest": "14.70",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1114.70",
	// 			"gameRechargeRateMin": "0.2000",
	// 			"productId": "75CBA2C0A01349B6A20996255B000130",
	// 			"productLevel": 1,
	// 			"beheadInterest": "220",
	// 			"faceStatus": true
	// 		},
	// 		{
	// 			"borrowingAmount": "1300.00",
	// 			"borrowingTerm": "7",
	// 			"interest": "8.70",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1308.70",
	// 			"gameRechargeRateMin": "0.2308",
	// 			"productId": "75CBA2C0A01349B6A20996255B000131",
	// 			"productLevel": 1,
	// 			"beheadInterest": "300",
	// 			"faceStatus": true
	// 		},
	// 		{
	// 			"borrowingAmount": "1350.00",
	// 			"borrowingTerm": "7",
	// 			"interest": "9.00",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1359.00",
	// 			"gameRechargeRateMin": "0.2296",
	// 			"productId": "0d433aa6-f859-11e8-9f6a-00163e043bfa",
	// 			"productLevel": 1,
	// 			"beheadInterest": "310",
	// 			"faceStatus": true
	// 		},
	// 		{
	// 			"borrowingAmount": "1400.00",
	// 			"borrowingTerm": "7",
	// 			"interest": "9.40",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1409.40",
	// 			"gameRechargeRateMin": "0.2285",
	// 			"productId": "0d484367-f859-11e8-9f6a-00163e043bfa",
	// 			"productLevel": 1,
	// 			"beheadInterest": "320",
	// 			"faceStatus": false
	// 		},
	// 		{
	// 			"borrowingAmount": "1450.00",
	// 			"borrowingTerm": "7",
	// 			"interest": "9.70",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1459.70",
	// 			"gameRechargeRateMin": "0.2275",
	// 			"productId": "0d4c7fc1-f859-11e8-9f6a-00163e043bfa",
	// 			"productLevel": 1,
	// 			"beheadInterest": "330",
	// 			"faceStatus": false
	// 		},
	// 		{
	// 			"borrowingAmount": "1500.00",
	// 			"borrowingTerm": "7",
	// 			"interest": "10.00",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1510.00",
	// 			"gameRechargeRateMin": "0.2267",
	// 			"productId": "0d51fd04-f859-11e8-9f6a-00163e043bfa",
	// 			"productLevel": 1,
	// 			"beheadInterest": "340",
	// 			"faceStatus": false
	// 		},
	// 		{
	// 			"borrowingAmount": "1550.00",
	// 			"borrowingTerm": "7",
	// 			"interest": "10.40",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1560.40",
	// 			"gameRechargeRateMin": "0.2258",
	// 			"productId": "0d570fac-f859-11e8-9f6a-00163e043bfa",
	// 			"productLevel": 1,
	// 			"beheadInterest": "350",
	// 			"faceStatus": false
	// 		},
	// 		{
	// 			"borrowingAmount": "1600.00",
	// 			"borrowingTerm": "7",
	// 			"interest": "10.70",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1610.70",
	// 			"gameRechargeRateMin": "0.2250",
	// 			"productId": "0d5c233b-f859-11e8-9f6a-00163e043bfa",
	// 			"productLevel": 1,
	// 			"beheadInterest": "360",
	// 			"faceStatus": false
	// 		},
	// 		{
	// 			"borrowingAmount": "1150.00",
	// 			"borrowingTerm": "14",
	// 			"interest": "15.30",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1165.30",
	// 			"gameRechargeRateMin": "0.2000",
	// 			"productId": "0d620d4f-f859-11e8-9f6a-00163e043bfa",
	// 			"productLevel": 1,
	// 			"beheadInterest": "230",
	// 			"faceStatus": false
	// 		},
	// 		{
	// 			"borrowingAmount": "1200.00",
	// 			"borrowingTerm": "14",
	// 			"interest": "16.00",
	// 			"comprehensiveRate": "32.85%",
	// 			"repaymentAmount": "1216.00",
	// 			"gameRechargeRateMin": "0.2000",
	// 			"productId": "0d670bb5-f859-11e8-9f6a-00163e043bfa",
	// 			"productLevel": 1,
	// 			"beheadInterest": "240",
	// 			"faceStatus": false
	// 		}
	// 	]
	// };
	
	$('.banner_to_detail').on('click',function(){
		window.location.href = global.localUrl+'activity/toBorrowMoney.html';
	});
	function sort_data(lists){

	}
	function bubbleSort(array){
		/*给每个未确定的位置做循环*/
		for(var unfix=array.length-1; unfix>0; unfix--){
		  /*给进度做个记录，比到未确定位置*/
		  for(var i=0; i<unfix;i++){
			if(parseFloat(array[i].borrowingAmount)>parseFloat(array[i+1].borrowingAmount)){
			  var temp = array[i];
			  array.splice(i,1,array[i+1]);
			  array.splice(i+1,1,temp);
			}
		  }
		}
		// console.log(array);
		return array;
	}

	function initProduct(){
		userUtil.ajax({
			url: global.localUrl + 'nw/system/initProduct',
			data: {},
			done: function(re){
				
	layer.hideLoad();
	amountss=re.data;
	tempMaxVal = 0;
	tempMaxIndex = 0; 
	tempMaxTime = 0; 
	tempAmoutList = [];
	re.data = bubbleSort(re.data);
	$.each(re.data,function(k,v){

		// amount += ("<option value=\""+v.borrowingAmount+"\">"+v.borrowingAmount+"元</option>");
		if(v.faceStatus){
			amount += (
				'<div class="sel_item_unlock select_option" tag="select_option" name="sel_item_unlock" borrowingTerm="'+v.borrowingTerm+'" repaymentAmount="'+v.repaymentAmount+'" beheadInterest="'+v.beheadInterest+'" productId="'+v.productId+'" gameRechargeRateMin="'+v.gameRechargeRateMin+'" borrowingAmount="'+v.borrowingAmount+'" style="overflow:hidden;box-sizing: border-box;padding: 0 20px;line-height: 40px;height: 40px;color:#555555;">'+
					'<div style="float:left;"><span class="borrow_money">'+v.borrowingAmount+'</span>元</div>'+
					'<div style="float:right;position: relative;" class="img_container">'+
					'</div>'+
				'</div>'
			);
			tempAmoutList.push(v);
		}else{
			amount_ += (
				'<div class="sel_item_lock select_option" tag="select_option" name="sel_item_lock" borrowingTerm="'+v.borrowingTerm+'" repaymentAmount="'+v.repaymentAmount+'" beheadInterest="'+v.beheadInterest+'" productId="'+v.productId+'" gameRechargeRateMin="'+v.gameRechargeRateMin+'" borrowingAmount="'+v.borrowingAmount+'" style="overflow:hidden;box-sizing: border-box;padding: 0 20px;line-height: 40px;height: 40px;color:#CCCCCC;">'+
					'<div style="float:left;">'+v.borrowingAmount+'元</div>'+
					'<div style="float:right;position: relative;">'+
						'<img src="../images/apply/locked_icon.png" alt="" style="position: absolute;height:15px;top: 12px;left: -20px;">复借解锁' +
					'</div>'+
				'</div>'
			);
		}
		if(k===0){
			if(v.faceStatus){
				tempMax = parseFloat(v.borrowingAmount);
				tempMaxTime = parseInt(v.borrowingTerm);
				beheadInterest = v.beheadInterest;
				tempMaxIndex = k;
				p_id = v.productId
				r_amount = v.repaymentAmount;
				m_game = v.gameRechargeRateMin
			}
		}else{
			if(v.faceStatus){
				if(parseInt(v.borrowingAmount)>=tempMax){
					tempMax = parseFloat(v.borrowingAmount);
					tempMaxTime = parseInt(v.borrowingTerm);
					tempMaxIndex = k;
					beheadInterest = v.beheadInterest;
					p_id = v.productId;
					r_amount = v.repaymentAmount;
					m_game = v.gameRechargeRateMin
				}
			}
		}
		console.log(v.borrowingTerm);
		// trem += ("<option value=\""+v.borrowingTerm+"\">"+v.borrowingTerm+"</option>");
	});
	// if(k===0){
		// alert(tempMaxVal);
		temp_selected.borrowingAmount = tempMax;
		temp_selected.borrowingTerm = tempMaxTime;
		temp_selected.repaymentAmount = r_amount;
		temp_selected.gameRechargeRateMin = m_game;
		temp_selected.productId = p_id;
		temp_selected.beheadInterest = beheadInterest;
		
		var temp_data_obj = {
			borrowingTerm:tempMaxTime,
			repaymentAmount:r_amount,
			beheadInterest:beheadInterest,
			productId:p_id,
			gameRechargeRateMin:m_game,
			borrowingAmount:tempMax,
		}

		trem = ("<option borrowingTerm='"+tempMaxTime+"' repaymentAmount='"+r_amount+"' beheadInterest='"+beheadInterest+"' productId='"+p_id+"' gameRechargeRateMin='"+m_game+"' borrowingAmount='"+tempMax+"' value='"+JSON.stringify(
			{
				'borrowingAmount_':tempMax,
				'borrowingTerm_':tempMaxTime,
				'repaymentAmount_':r_amount,
				'beheadInterest_':beheadInterest,
				'productId_':p_id,
				'gameRechargeRateMin_':m_game,
				'multi_sel':'1'
			}
			)+"'>"+tempMaxTime+"</option>");
		$('#borrowingAmount').html(temp_selected.borrowingAmount);
		
	// }
	// $(amount).appendTo("#borrowingAmount");
	// $("#borrowingAmount").find('option')[tempMaxIndex].selected = true;
	$("#sel_box_list").html('');
	$(amount).appendTo("#sel_box_list");
	$(amount_).appendTo("#sel_box_list");
	$($("#sel_box_list").find('.select_option[productId="'+temp_selected.productId+'"]')[0]).find('.img_container').html('<img src="../images/apply/selected_icon.png" alt="" style="position: absolute;height:15px;top: 12px;left: -20px;">');
	// $("#sel_box_list").find('.select_option')[1].find('.img_container').html('<img src="../images/apply/selected_icon.png" alt="" style="position: absolute;height:15px;top: 12px;left: -20px;">');


	// $(trem).appendTo("#borrowingTerm");
	$("#borrowingTerm").html(trem);
	ratess=re.data[tempMaxIndex].gameRechargeRateMin;
	$("#arriveMoney").html(Math.ceil(re.data[tempMaxIndex].borrowingAmount));
	// $("#arriveMoney").html(Math.ceil(re.data[0].borrowingAmount-re.data[0].gameRechargeRateMin*re.data[0].borrowingAmount));
	$("#arriveGameCoin").html(Math.ceil(re.data[tempMaxIndex].beheadInterest));
	$("#repaymentAmount").html(re.data[tempMaxIndex].repaymentAmount+"元现金");
	$("#btnApply").attr("data-type",re.data[tempMaxIndex].productId);
	$("#btnApply").attr("data-rate",re.data[tempMaxIndex].gameRechargeRateMin);

				// layer.hideLoad();
				// amountss=re.data;
				// tempMaxVal = 0;
				// tempMaxIndex = 0; 
				// tempMaxTime = 0; 
				// $.each(re.data,function(k,v){
				// 	// amount += ("<option value=\""+v.borrowingAmount+"\">"+v.borrowingAmount+"元</option>");
				// 	if(v.faceStatus){
				// 		amount += (
				// 			'<div class="sel_item_unlock select_option" borrow_day="'+v.borrowingTerm+'" clickable="0" style="overflow:hidden;box-sizing: border-box;padding: 0 20px;line-height: 40px;height: 40px;color:#555555;">'+
				// 				'<div style="float:left;" class="borrow_money">'+v.borrowingAmount+'元</div>'+
				// 				'<div style="float:right;position: relative;">'+
				// 				'</div>'+
				// 			'</div>'
				// 		);
				// 	}else{
				// 		amount += (
				// 			'<div class="sel_item_lock select_option" style="overflow:hidden;box-sizing: border-box;padding: 0 20px;line-height: 40px;height: 40px;color:#CCCCCC;">'+
				// 				'<div style="float:left;">'+v.borrowingAmount+'元</div>'+
				// 				'<div style="float:right;position: relative;">'+
				// 					'<img src="../images/apply/locked_icon.png" alt="" style="position: absolute;height:15px;top: 12px;left: -20px;">复借解锁' +
				// 				'</div>'+
				// 			'</div>'
				// 		);
				// 	}
				// 	if(k===0){
				// 		tempMax = parseInt(v.borrowingAmount);
				// 		tempMaxTime = parseInt(v.borrowingTerm);
				// 		beheadInterest = v.beheadInterest;
				// 		tempMaxIndex = k;
				// 	}else{
				// 		if(parseInt(v.borrowingAmount)>=tempMax){
				// 			tempMaxVal = parseInt(v.borrowingAmount);
				// 			tempMaxTime = parseInt(v.borrowingTerm);
				// 			tempMaxIndex = k;
				// 			beheadInterest = v.beheadInterest;
				// 		}
				// 	}
				// 	console.log(v.borrowingTerm);
				// 	// trem += ("<option value=\""+v.borrowingTerm+"\">"+v.borrowingTerm+"</option>");
				// });
				// // if(k===0){
				// 	// alert(tempMaxVal);
				// 	trem = ("<option value=\""+tempMaxTime+"\">"+tempMaxTime+"</option>");
				// // }
				// // $(amount).appendTo("#borrowingAmount");
				// // $("#borrowingAmount").find('option')[tempMaxIndex].selected = true;

				// $("#sel_box_list").html('');
				// $(amount).appendTo("#sel_box_list");
				// // $("#sel_box_list").find('.select_option')[1].find('.img_container').html('<img src="../images/apply/selected_icon.png" alt="" style="position: absolute;height:15px;top: 12px;left: -20px;">');

				// $($("#sel_box_list").find('.select_option')[1]).find('.img_container').html('<img src="../images/apply/selected_icon.png" alt="" style="position: absolute;height:15px;top: 12px;left: -20px;">');

				// // $(trem).appendTo("#borrowingTerm");
				// $("#borrowingTerm").html(trem);
				// ratess=re.data[tempMaxIndex].gameRechargeRateMin;
				// $("#arriveMoney").html(Math.ceil(re.data[tempMaxIndex].borrowingAmount));
				// // $("#arriveMoney").html(Math.ceil(re.data[0].borrowingAmount-re.data[0].gameRechargeRateMin*re.data[0].borrowingAmount));
				// $("#arriveGameCoin").html(Math.ceil(re.data[tempMaxIndex].beheadInterest));
				// $("#repaymentAmount").html(re.data[tempMaxIndex].repaymentAmount+"元现金");
				// $("#btnApply").attr("data-type",re.data[tempMaxIndex].productId);
				// $("#btnApply").attr("data-rate",re.data[tempMaxIndex].gameRechargeRateMin);
				// alert(66666);

				//解锁金额去重；
				$('#sel_box_list').find('div[name=sel_item_unlock]').each(function(i,v){
					
					if($('#sel_box_list').find('div[name=sel_item_unlock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]').length>1){
						var rm_el = $($('#sel_box_list').find('div[name=sel_item_unlock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[0]);	
						var show_el = $($('#sel_box_list').find('div[name=sel_item_unlock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[1]);				

						if(parseInt($(v).attr('borrowingAmount'))===parseInt(tempMax)){
							$('#borrowingAmount').attr('multi_sel','1');
							// alert(6666);
							$('#borrowingTerm').append("<option value='"+JSON.stringify({
								'borrowingAmount_':rm_el.attr('borrowingAmount'),
								'borrowingTerm_':rm_el.attr('borrowingTerm'),
								'repaymentAmount_':rm_el.attr('repaymentAmount'),
								'beheadInterest_':rm_el.attr('beheadInterest'),
								'productId_':rm_el.attr('productId'),
								'gameRechargeRateMin_':rm_el.attr('gameRechargeRateMin'),
								'multi_sel':'1'
							})+"'>"+rm_el.attr('borrowingTerm')+'</option>');
						}

						console.log(rm_el.attr('borrowingAmount'));
						$($('#sel_box_list')
							.find('div[name=sel_item_unlock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[1])
							.attr({
								'borrowingAmount_':rm_el.attr('borrowingAmount'),
								'borrowingTerm_':rm_el.attr('borrowingTerm'),
								'repaymentAmount_':rm_el.attr('repaymentAmount'),
								'beheadInterest_':rm_el.attr('beheadInterest'),
								'productId_':rm_el.attr('productId'),
								'gameRechargeRateMin_':rm_el.attr('gameRechargeRateMin'),
								'multi_sel':'1'
							});
						$('#sel_box_list').find('div[name=sel_item_unlock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[0].remove();
						


					}
				});
				
				//未解锁金额去重；
				$('#sel_box_list').find('div[name=sel_item_lock]').each(function(i,v){
					
					if($('#sel_box_list').find('div[name=sel_item_lock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]').length>1){
						var rm_el = $($('#sel_box_list').find('div[name=sel_item_lock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[0]);	
						var show_el = $($('#sel_box_list').find('div[name=sel_item_lock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[1]);				

					
						$('#sel_box_list').find('div[name=sel_item_lock][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[0].remove();
						


					}
				});
				
				//交叉金额去重；
				$('#sel_box_list').find('div[tag=select_option]').each(function(i,v){
					if($('#sel_box_list').find('div[tag=select_option][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]').length>1){
						var dom_status = $($('#sel_box_list').find('div[tag=select_option][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[1]).attr('name');
						if(dom_status==='sel_item_lock'){
							$('#sel_box_list').find('div[tag=select_option][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[1].remove();
						}else{
							$('#sel_box_list').find('div[tag=select_option][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[0].remove();
						}
					}
				});
				// var temp_element = '';
				// $('#sel_box_list').find('div[tag=select_option]').each(function(i,v){
				// 	if($(v).attr('borrowingAmount')==='1300.00'){
				// 		temp_element = $(v).clone()[0];
						
				// 	}
					// if($('#sel_box_list').find('div[tag=select_option][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]').length>1){
					// 	var dom_status = $($('#sel_box_list').find('div[tag=select_option][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[1]).attr('name');
					// 	if(dom_status==='sel_item_lock'){
					// 		$('#sel_box_list').find('div[tag=select_option][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[1].remove();
					// 	}else{
					// 		$('#sel_box_list').find('div[tag=select_option][borrowingAmount="'+$(v).attr('borrowingAmount')+'"]')[0].remove();
					// 	}
					// }
				// });


			}
		})
	};
	$('#borrowingTerm').on('change',function(){
		// alert($(this).children('option:selected').attr('value'));
		
		var page_data_ =  JSON.parse($(this).children('option:selected').attr('value'));

		$("#arriveMoney").html(Math.ceil(page_data_.borrowingAmount_));
		// $("#arriveMoney").html(Math.ceil(re.data[0].borrowingAmount-re.data[0].gameRechargeRateMin*re.data[0].borrowingAmount));
		$("#arriveGameCoin").html(Math.ceil(page_data_.beheadInterest_));
		$("#repaymentAmount").html(page_data_.repaymentAmount_+"元现金");
		$("#btnApply").attr("data-type",page_data_.productId_);
		$("#btnApply").attr("data-rate",page_data_.gameRechargeRateMin_);

	});
	$('.tip').on('click',function(){
		if($(this).find('img').attr('alt')==='no_check'){
			$(this).find('img').attr('src','../images/bingo.png');
			$(this).find('img').attr('alt','bingo');
			$("#btnApply").attr('click_able','click');
		}else{
			$(this).find('img').attr('src','../images/login_check.png');
			$(this).find('img').attr('alt','no_check');
			$("#btnApply").attr('click_able','unclick');
		}
	});
	$('#borrowingAmount').on('click',function(){
		$('#sel_box_container,#sel_box_lawyer').show();
	});
	$('#sel_box_cancel').on('click',function(){
		$('#sel_box_container,#sel_box_lawyer').hide();
	});
	$('#sel_box_confirm').on('click',function(){
		$('#sel_box_container,#sel_box_lawyer').hide();
		// var el = $('.sel_item_unlock');
		// console.log(el);
		// console.log(el.attr('borrowingamount'));
		
		var t_trem = ("<option value='"+JSON.stringify({
			'borrowingAmount_':temp_selected.borrowingAmount,
			'borrowingTerm_':temp_selected.borrowingTerm,
			'repaymentAmount_':temp_selected.repaymentAmount,
			'beheadInterest_':temp_selected.beheadInterest,
			'productId_':temp_selected.productId,
			'gameRechargeRateMin_':temp_selected.gameRechargeRateMin,
			'multi_sel':'1'
		})+"'>"+temp_selected.borrowingTerm+"</option>");
		$('#borrowingAmount').html(temp_selected.borrowingAmount);
		$("#borrowingTerm").html(t_trem);

		$("#arriveMoney").html(Math.ceil(temp_selected.borrowingAmount));
		// $("#arriveMoney").html(Math.ceil(re.data[0].borrowingAmount-re.data[0].gameRechargeRateMin*re.data[0].borrowingAmount));
		$("#arriveGameCoin").html(Math.ceil(temp_selected.beheadInterest));
		$("#repaymentAmount").html(temp_selected.repaymentAmount+"元现金");
		$("#btnApply").attr("data-type",temp_selected.productId);
		$("#btnApply").attr("data-rate",temp_selected.gameRechargeRateMin);

		if(temp_selected.temp_selected_){
			$('#borrowingTerm').append("<option value='"+JSON.stringify({
				'borrowingAmount_':temp_selected.temp_selected_.borrowingAmount_,
				'borrowingTerm_':temp_selected.temp_selected_.borrowingTerm_,
				'repaymentAmount_':temp_selected.temp_selected_.repaymentAmount_,
				'beheadInterest_':temp_selected.temp_selected_.beheadInterest_,
				'productId_':temp_selected.temp_selected_.productId_,
				'gameRechargeRateMin_':temp_selected.temp_selected_.gameRechargeRateMin_,
				'multi_sel':'1'
			})+"'>"+temp_selected.temp_selected_.borrowingTerm_+"</option>");
		}
	});
	$("#sel_box_list").on('click','.sel_item_unlock',function(){
		// alert(1111);
		// alert(temp_selected);
		$('.sel_item_unlock').find('.img_container').html('');
		$('.sel_item_unlock').attr('clickable','0');
		// $(this).attr('clickable','1');
		// $(this).attr('clickable','1');
		// $(this).attr('clickable','1');
		// $(this).attr('clickable','1');
		temp_selected.borrowingAmount = $(this).attr('borrowingAmount');
		temp_selected.borrowingTerm = $(this).attr('borrowingTerm');
		temp_selected.repaymentAmount = $(this).attr('repaymentAmount');
		temp_selected.gameRechargeRateMin = $(this).attr('gameRechargeRateMin');
		temp_selected.productId = $(this).attr('productId');
		temp_selected.beheadInterest = $(this).attr('beheadInterest');
		temp_selected.borrowingAmount = ($(this).find('.borrow_money').html());
		temp_selected.temp_selected_ = null;
		if($(this).attr('borrowingAmount_')){
			temp_selected.temp_selected_ = {};
			temp_selected.temp_selected_.borrowingAmount_ = $(this).attr('borrowingAmount_');
			temp_selected.temp_selected_.borrowingTerm_ = $(this).attr('borrowingTerm_');
			temp_selected.temp_selected_.repaymentAmount_ = $(this).attr('repaymentAmount_');
			temp_selected.temp_selected_.gameRechargeRateMin_ = $(this).attr('gameRechargeRateMin_');
			temp_selected.temp_selected_.productId_ = $(this).attr('productId_');
			temp_selected.temp_selected_.beheadInterest_ = $(this).attr('beheadInterest_');
		}
		$(this).attr('clickable','1');
		$(this).find('.img_container').html('<img src="../images/apply/selected_icon.png" alt="" style="position: absolute;height:15px;top: 12px;left: -20px;">');
	});
	
	// $("#borrowingAmount").bind("change",function(){
	// 	var _this = $(this),repayss,rateInterest;
	// 	var sel_list = $('#borrowingTerm').find('option');
	// 	$.each(amountss,function(index,val){
	// 		if(amountss[index].borrowingAmount==_this.val()){
	// 			repayss=amountss[index].repaymentAmount;
	// 			rateInterest = amountss[index].gameRechargeRateMin;
	// 			beheadInterest = amountss[index].beheadInterest
	// 			// sel_list[index].prop('selected',true);
	// 			// sel_list[index].selected = true;
	// 			// console.log(sel_list[index].selected);
	// 			trem = ("<option value=\""+amountss[index].borrowingTerm+"\">"+amountss[index].borrowingTerm+"</option>");
	// 			$("#borrowingTerm").html(trem);
	// 			$("#btnApply").attr("data-type",amountss[index].productId);
	// 			$("#btnApply").attr("data-rate",amountss[index].gameRechargeRateMin);
	// 		}
	// 	})

	// 	// $("#arriveMoney").html(Math.ceil(_this.val()-ratess*_this.val()));
	// 	// alert(_this.val());
	// 	$("#arriveMoney").html(Math.ceil(_this.val()));
	// 	// $("#arriveGameCoin").html(Math.ceil(ratess*_this.val()));
	// 	// $("#arriveGameCoin").html(Math.ceil(rateInterest*_this.val()));
	// 	$("#arriveGameCoin").html(beheadInterest);
	// 	// $("#repaymentAmount").html(repayss+"元");
	// 	$("#repaymentAmount").html(repayss+"元现金");
	// });

	$("#btnApply").click(function(){
		if($("#btnApply").attr('click_able')==='unclick'){
			layer.tips("请先阅读并勾选《借款协议》");
			return false;
		}
		applyAlertClick();
	});
	$('#confirmAlertBtn').on('click',function(){
		$('.alert_box').removeClass('on');
	});
	function toIdentity(){
	}
	$("#applyAlertBtn").on("click",function(){
		var _this = $(this);
		// layer.showLoad();
        if(!applyPurpus){
            applyPurpus=$("#touchSelect li").eq(1).text();
        }
		userUtil.ajax({
			url: global.localUrl + "nw/orders/init",
			data: {
				userUuid: userUtil.userID(),
				sessionId: userUtil.sid(),
				productId: $("#btnApply").attr("data-type"),
				"applyPurposr": applyPurpus
			},
			fault: true,
			done: function(re){
				// return;
				layer.hideLoad();
				$(".alert").removeClass("on");
				if(re.code == 1053){    
                    layer.tips("您暂未开通拿现金资质，请过两天再试吧！");
                    // setTimeout(function(){
					// 	//跳转到认证页面
                    //     location.href = '../trust/identification.html';
					// },500);
					return;
				}
				if(re.code == 3033){   //有待还款订单
					$('.alert_box').addClass('on');
					// setTimeout(function(){
                    //     //
					// 	window.location.href="../refund/refundlist.html";
					// },500);
					return;
				}
				if(re.code == 3019){   //有待处理的订单
					$('.alert_box').addClass('on');
					// layer.tips("你还有未结清订单！");
					// setTimeout(function(){
                    //     //
					// 	window.location.href="../refund/refundlist.html";
					// },500);
					return;
				}
				if(re.code == 1){
					if(re.data.orderNo){
						orderNo=re.data.orderNo;
					}
				    function connectWebViewJavascriptBridge (callback) { if (window.WebViewJavascriptBridge) { callback(WebViewJavascriptBridge) } else { document.addEventListener( 'WebViewJavascriptBridgeReady' , function() { callback(WebViewJavascriptBridge) }, false ); } }
				    connectWebViewJavascriptBridge (function(bridge) { 
				    // bridge.registerHandler('JS Echo', function(data, responseCallback) { console.log("JS Echo called with:", data) responseCallback(data) }) 
				    bridge.callHandler('getUserInfo', {sessionId: userUtil.sid(),orderNo:orderNo}, function responseCallback(responseData) { }) })
					 window.location.href="../trust/identification.html";
					 localStorage.removeItem('fromWallet');
					return;
				}else{
						layer.tips(re.message);
                        // setTimeout(function(){
                        //     //跳转到认证页面
                        //     location.href = '../trust/identification.html';
						// },500); 
						return;                  
				}


			}
		});
	});

    //获取消费目的列表
    $.ajax({
        url: global.localUrl + "nw/system/dicItemList",
        type: "post",
        data: JSON.stringify({"sessionId": userUtil.sid(),"dicCode":"APPLY_PURPOSR"}),
        contentType: 'application/json;charset=utf-8',
        success: function (re) {
            if (1 == re.code) {
                var htmls="";
               for(e in re.data){
                    console.log(re.data[e].dicItemName)
                    htmls+="<li>"+re.data[e].dicItemName+"</li>";
               }
               $("#touchSelect ul").html(htmls);
               
            }else{
                layer.tips(re.message);
            }
        },
        error: function () {
            layer.tips(global.netError);
        }
    });

	//提交弹窗
	function applyAlertClick(){

        $(".alert").addClass("on");
		// alert(333333);
        var d=document.getElementById("touchSelect");
		$("#touchSelect li").css({"font-size":"12px","color":"#BDBDBD","border":"0px solid white"});
	    $("#touchSelect li").eq(2).css({"font-size":"20px","color":"black"});
	    $("#touchSelect li").eq(1).css({"font-size":"16px","color":"gray"});
	    $("#touchSelect li").eq(3).css({"font-size":"16px","color":"gray"});
		    d.addEventListener('touchstart',touch, false);  
		    d.addEventListener('touchmove',touch, false);  
		    d.addEventListener('touchend',touch, false);  
		    var l,lists=$("#touchSelect li")[0].offsetHeight,topVal=0,startTop,moveTop,endTop,liL=document.getElementsByTagName('li').length-3;
			applyPurpus=$("#touchSelect li").eq($("#touchSelect li").length-1).text();
			$("#touchSelect li").eq($("#touchSelect li").length-1).css({"font-size":"20px","color":"black"});
			document.getElementsByTagName("ul")[0].style.top=$("#touchSelect li")[0].offsetHeight+"px";
			function touch (event){ 
		        var event = event || window.event;  
		        switch(event.type){  
		            case "touchstart":  
		                startTop=event.touches[0].clientY;
		                break;  
		            case "touchend":  
		                endTop=event.changedTouches[0].clientY
		                topVal+=endTop-startTop;
		                if(l>lists*2){
		                	topVal=l=lists*2
		                }else if(l<-lists*liL) {
		                	topVal=l=-lists*liL;
		                }
		                l=Math.round(l/lists)*lists;
		                applyPurpus=$("#touchSelect li").eq(-Math.round(l/lists)+2).text();
		                $("#touchSelect li").css({"font-size":"12px","color":"#BDBDBD","border":"0px solid white"});
		                $("#touchSelect li").eq(-Math.round(l/lists)+2).css({"font-size":"20px","color":"black","borderTop":"1px solid gray","borderBottom":"1px solid gray"});
		                $("#touchSelect li").eq(-Math.round(l/lists)+1).css({"font-size":"16px","color":"gray"});
		                $("#touchSelect li").eq(-Math.round(l/lists)+3).css({"font-size":"16px","color":"gray"});
		                document.getElementsByTagName("ul")[0].style.top=l+"px";

		                break;
		            case "touchmove":  
		                // event.preventDefault(); 
		                moveTop=event.touches[0].clientY;
		                l=topVal+moveTop-startTop;
		                document.getElementsByTagName("ul")[0].style.top=l+"px"; 
		                l=Math.round(l/lists)*lists;
		                $("#touchSelect li").css({"font-size":"12px","color":"#BDBDBD","border":"0px solid white"});
		                $("#touchSelect li").eq(-Math.round(l/lists)+2).css({"font-size":"20px","color":"black","border-top":"gray","border-bottom":"gray"});
		                $("#touchSelect li").eq(-Math.round(l/lists)+1).css({"font-size":"16px","color":"gray"});
		                $("#touchSelect li").eq(-Math.round(l/lists)+3).css({"font-size":"16px","color":"gray"});

		                break;  
		        }  

		    }  
	}

}(global, layer, userUtil, dataUtil)