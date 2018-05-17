$(function () {
	var hostName = "http://39.105.51.172";
//	hostName = "10.10.10.97:8081":
	var appName = "/store";
//	appName = "";
	
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
    		var optStr = "";
    		for(var j =0;j<storeTypes.length;j++){
				var storedict = storeTypes[j];
				optStr += "<option value='"+storedict["code"]+"'>"+storedict["name"]+"</option>";
				
			}
    		$("#type").html(optStr);
    	}
    });
	clickBtnn = function(){

    	$.ajax({
	    	type:"post",
	    	url:hostName+appName+"/api/store/addStoreInfo",
	    	data: JSON.stringify($('#storeInfoFrom').serializeObject()),
	    	dataType: 'json',
	        contentType: "application/json",
	        cache: false,
	    	success:function(data){
	    		alert(data);
	    		console.log(data);
    		}
		});
	};
    
});