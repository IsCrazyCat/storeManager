$(function () {
	var hostName = "http://39.105.51.172";
//	hostName = "10.10.10.97:8081";
	var appName = "/store";
//	appName = "";
	var param={};
    $.ajax({
    	type:"post",
    	url:hostName+appName+"/api/store/findStoreInfo?page=0&size=100",
    	data: JSON.stringify(param),
    	dataType: 'json',
        contentType: "application/json",
        cache: false,
    	success:function(data){
    		var storeInfos = data.content; 
    		
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
		    		for(var i=0;i<storeInfos.length;i++){
		    			var storeInfo = storeInfos[i];
		    			var tdStr = "<td width='5%'>"+storeInfo["id"]+"</td>";
		    			tdStr += "<td width='10%'>"+storeInfo["name"]+"</td>";
			    		for(var j =0;j<storeTypes.length;j++){
			    			var storedict = storeTypes[j];
			    			if(storedict["code"]==storeInfo["type"]){
			    				tdStr += "<td width='10%'>"+storedict["name"]+"</td>";
			    				break;
			    			}
		    			}
		    			tdStr += "<td width='15%'>"+storeInfo["address"]+"</td>";
		    			tdStr += "<td width='10%'>"+storeInfo["mobile"]+"</td>";
		    			tdStr += "<td width='10%'>"+storeInfo["tags"]+"</td>";
		    			if(storeInfo["isOnline"]=='1'){
		    				tdStr += "<td width='5%'>已上架</td>";
		    			}else{
		    				tdStr += "<td width='5%'>未上架</td>";
		    			}
		    			tdStr += "<td width='5%'><a href='storeInfoShow.html?id="+storeInfo["id"]+"'>查看/修改</a></td>";
		    			trStr += tdStr;
		    			trStr +="</tr><tr>";
		    		}
		    		
		    		$("#storeInfoTable").append("<tr>"+trStr)
	    		}	
		    });
    		

    		
    	},
    	error:function(res){
    		console.log(JSON.stringify(res))
    	}
    });
});