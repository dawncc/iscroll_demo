iscroll_demo
============

下拉刷新
-----

    *  下拉刷新和上拉加载更多功能
    *  ajax分页
    *  正在加载中的loadding提示

####  启用iscroll下拉刷新功能
  
    在‘data-role="page"‘上使用‘data-iscroll="enable"‘
    
####  初始化iscroll,并启用ajax加载
  
   ```html
   <script type="text/javascript" charset="utf-8" src="js/iscroll.js"></script>
		<script type="text/javascript" charset="utf-8" src="js/initScroll.js"></script>
		<script type="text/javascript">
		$(document).bind("pageinit", function() {
			isInit=0;
			serverURL = "11"; //服务器地址
			startNum = 1;//当前页
			count = 5; //总页数
		});
		
   ````
   
#### 使用下拉刷新样式

```html

<div id="wrapperIndex" class="wrapper" >
		<div id="scrollerIndex" class="scroller">
			<div id="pullDown" >
				<span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新...</span>
			</div>
			
			<div id="pullUp">
				<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>
			</div>

	</div>
<div>
```

    
