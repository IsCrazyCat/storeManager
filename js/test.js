$(function () {
	var param={};
    var storeTable = $('#storeInfoTable').dataTable({
    	"ajax": {
	        "url": "http://10.10.10.97:8081/api/store/findStoreInfo?page=0&size=50",
	        "type": "POST",
	        "dataType": "json",
	        "contentType": "application/json",
	        "data":function(){
	        	return JSON.stringify(param);
	        },
	        "dataSrc":"data.content",
	        "success":function(data){
	            //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染  
  				//此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕  
  				return data.content;
	        }
    	},
		"aoColumns": [
            {"sWidth": "5%", "sTitle": "订单号码", "mData": "orderno","render":function(data,type,row){
                return data;
            }}
    	]
    });
})
