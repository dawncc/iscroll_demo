var isInit = 0;
var myScroll,
pullDownEl, pullDownOffset,
pullUpEl, pullUpOffset, generatedCount = 0;
/**
* 下拉刷新 
* myScroll.refresh();		// 数据加载完成后，调用界面更新方法
*/
function pullDownAction () {
setTimeout(update, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
* 上拉刷新
* myScroll.refresh();		// 数据加载完成后，调用界面更新方法
*/
function pullUpAction() {
setTimeout(loadData, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
* 初始化iScroll控件
*/
function initIscroll() {
	if (myScroll != null) {
		myScroll.destroy();
	}
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	myScroll = new iScroll(
		'wrapperIndex',
		{
			//scrollbarClass: 'myScrollbar', /* 自定义样式 */
			useTransition : true, //是否使用CSS变换
			topOffset: pullDownOffset,
			hScroll        : true,
         	vScroll        : true,
         	hScrollbar     : false,
         	vScrollbar     : true,
         	fixedScrollbar : true,
         	fadeScrollbar  : true,
         	hideScrollbar  : true,
         	bounce         : true,
         	momentum       : true,
         	lockDirection  : true,
         	checkDOMChanges: true,
			onRefresh : function() {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				} else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				}
			},
			onScrollMove : function() {
				if (this.y > 45 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
					this.minScrollY = 0;
				} else if (this.y < 45 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 45)
					&& !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 45)
					&& pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd : function() {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
					pullDownAction();	// Execute custom function (ajax call?)
				} else if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
					pullUpAction(); // Execute custom function (ajax call?)
				}
			}
			
		});
	//页面初始化
	isInit=1;
}

var startNum = -1;
var count = -1;

function loadData() {
	console.log("当前页：" + startNum+ " || 总页数：" + count)
	if (startNum!=-1&&Number(startNum) >=Number(count)) {
		myAlert('已加载完全部信息');
		myScroll.refresh();
		return false;
	}
	showLoading();
	console.log("服务器地址："+ serverURL);
	$.ajax({
		async : false,
			url : serverURL, // 跨域URL
			type : 'get',
			data : startNum,
			timeout : 6000,
			success : function(datas) { //客户端jquery预先定义好的callback函数，成功获取跨域服务器上的json数据后，会动态执行这个callback函数 
				desplay(datas);
			},
			complete : function(XMLHttpRequest, textStatus) {
				//alert(textStatus);
			},
			error : function(xhr) {
				//jsonp 方式此方法不被触发
				//请求出错处理 
				myAlert("请求出错(请检查相关度网络状况.)");
				myScroll.refresh();
			}
		});
}

function desplay(datas){
	// datas = '<li> <a href="fpmx.html"> <img src="images/ic_wast.png" alt=""> <h3>￥0.00</h3> <p>发票代码：<span class="text-no">11155653322</span></p> <p>发票号码：<span class="text-no">00001234</span></p> </a> <p class="desc-normal desc-wast"><span class="left-aside">开票日期：2013/5/17</span><span class="right-aside">开票员：01</span></p> </li>'
	if(datas!=null && datas!=""){
		console.log("加载后的当前页：" + startNum + "|| 获取数据"+ datas);
		startNum = startNum + 1;
		$("#fpmxList").append(datas);
		$("#fpmxList").listview("refresh");
		
		setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!			
		myScroll.refresh(); // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
		hideLoading();
		if (Number(startNum) >= Number(count)) {
			myAlert('已加载完全部信息');
		}
	}, 1500);
	}
}

function update() {
	myScroll.refresh(); // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
	window.location.reload();
}

function showMyAlert(text) {
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.showPageLoadingMsg("a", text, true);

}
function myAlert(text) {
	showMyAlert(text);
	setTimeout(hideLoading, 2000);
}
function showLoading() {
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.showPageLoadingMsg("a", "加载中...");
}

function hideLoading() {
	$.mobile.hidePageLoadingMsg();
}

