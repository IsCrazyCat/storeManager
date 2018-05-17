$(function () {
	var hostName = "http://39.105.51.172";
//	hostName = "10.10.10.97:8081":
	var appName = "/store";
//	appName = "";
	
	var id = getQueryString(id);
	var param={};
	param.id = id;
	
	clickUpdate = function(){

    	$.ajax({
	    	type:"post",
	    	url:hostName+appName+"/api/store/updateStoreInfo",
	    	data: JSON.stringify($('#storeInfoFrom').serializeObject()),
	    	dataType: 'json',
	        contentType: "application/json",
	        cache: false,
	    	success:function(data){
	    		if(data){}
    		}
		});
	};
	
    $.ajax({
    	type:"post",
    	url:hostName+appName+"/api/store/findStoreInfo?page=0&size=1",
    	data: JSON.stringify(param),
    	dataType: 'json',
        contentType: "application/json",
        cache: false,
    	success:function(data){
    		var storeInfo = data.content[0]; 
    		
    		var dictparam = {"categoryCode":"storeType"};
    		var storeTypes = [];
    		$.ajax({
		    	type:"post",
		    	url:hostName+appName+"/api/dict/findDict",
		    	data: JSON.stringify(dictparam),
		    	dataType: 'json',
		        contentType: "application/json",
		        cache: false,
		    	success:function(data){
		    		storeTypes = data;

		    	},
		    	complete:function(){
		    		var trStr = "";
		    		trStr +="<tr><td width='5%'>id</td><td width='15%'><input name='id'  value='"+storeInfo["id"]+"' type='hidden'/>"+storeInfo["id"]+"</td></tr>";
		    		trStr +="<tr><td width='5%'>店名</td><td width='15%'><input name='name' value='"+storeInfo["name"]+"' id = 'name'/></td></tr>";
		    		trStr +="<tr><td width='5%'>类型</td><td width='15%'><select name='ttype'id='type'>";
		    		for(var j =0;j<storeTypes.length;j++){
		    			var storedict = storeTypes[j];
		    			if(storedict["code"]==storeInfo["type"]){
		    				trStr += "<option selected value='"+storedict["code"]+"'>"+storedict["name"]+"</option>";
		    			}else{
		    				trStr += "<option value='"+storedict["code"]+"'>"+storedict["name"]+"</option>";
		    			}
		    			
	    			}
		    		trStr +="</select></td></tr>";
		    		trStr +="<tr><td width='5%'>电话</td><td width='15%'><input name='mobile' value='"+storeInfo["mobile"]+"' id = 'mobile'/></td></tr>";
		    		trStr +="<tr><td width='5%'>地址</td><td width='15%'><input name='address' value='"+storeInfo["address"]+"' id = 'address'/></td></tr>";
		    		trStr +="<tr><td width='5%'>logo</td><td width='15%'><input name='logoUrl' value='"+storeInfo["logoUrl"]+"' id = 'logoUrl'/></td></tr>";
		    		trStr +="<tr><td width='5%'>详情图</td><td width='15%'><input name='logoDetailUrl' value='"+storeInfo["logoDetailUrl"]+"' id = 'logoDetailUrl'/></td></tr>";
		    		trStr +="<tr><td width='5%'>X坐标</td><td width='15%'><input name='locationX' value='"+storeInfo["locationX"]+"' id = 'locationX'/></td></tr>";
		    		trStr +="<tr><td width='5%'>Y坐标</td><td width='15%'><input name='locationY' value='"+storeInfo["locationY"]+"' id = 'locationY'/></td></tr>";
		    		trStr +="<tr><td width='5%'>描述</td><td width='15%'><input name='description' value='"+storeInfo["description"]+"' id = 'description'/></td></tr>";
		    		trStr +="<tr><td width='5%'>标签</td><td width='15%'><input name='tags' value='"+storeInfo["tags"]+"' id = 'tags'/></td></tr>";
		    		trStr +="<tr><td width='5%'>是否上架</td><td width='15%'><select name='isOnline' id='isOnline'><option value='1'>上架</option><option value='0' selected>下架</option></select></td></tr>";
		//  		trStr +="<tr><td width='5%'>排序</td><td width='15%'><input name='orderId' value='"+storeInfo["orderId"]+"' id = 'orderId'/></td></tr>";
		    		trStr +="<tr><td width='10%'><button id='tijiao' onclick='clickUpdate()'>确认修改</button></td><td width='10%'><button id='cancel' onclick='clickCancel()'>返回</button></td></tr>";
		    		
		 
		    		$("#storeInfoTable").append(trStr);
				 	$("#isOnline").find("option[value='"+storeInfo["isOnline"]+"']").attr("selected",true);
		    	}
	    	});
    	},
    	error:function(res){
    		console.log(JSON.stringify(res))
    	}
    });
    
    clickCancel = function(){
    	window.location.go(-1);
//  	window.location.href = "../../storeInfoManager.html";
//  	return false;
    }
    
});