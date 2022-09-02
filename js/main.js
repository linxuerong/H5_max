function investmentListShow() {
	let investmentLists = document.querySelectorAll('.investment-list')
	investmentLists.forEach(investmentList => {
		let accordionCollapse = investmentList.querySelector('.accordion-collapse')
		accordionCollapse.classList.add("show")
	});
}

function investmentListHide() {
	let investmentLists = document.querySelectorAll('.investment-list')
	investmentLists.forEach((investmentList, i) => {
		if (i == 0) {
			return
		} else {
			let accordionCollapse = investmentList.querySelector('.accordion-collapse')
			accordionCollapse.classList.remove("show")
		}
	});
}
function DatdIos(time) {
	var datd = time.replace(/\-/g, '/');
	return datd;
}

function DatdHuan(time) {
	var datd = time.replace(/\-/g, '/');
	datd = 	datd.substr(0, 10);
	return datd;
}
function DatdHuan2(time) {
	var datd = time.replace(/\-/g, '/');
	datd = 	datd.substr(5, 5);
	return datd;
}


window.addEventListener('load', function() {
	window.innerWidth < 576 && investmentListShow()
	window.innerWidth > 576 && investmentListHide()
	window.addEventListener('resize', function() {
		window.innerWidth < 576 && investmentListShow()
		window.innerWidth > 576 && investmentListHide()
	})
})

function getNow(s) {
	return s < 10 ? '0' + s: s;
}

$(function (){
	var hData = [42,42,43,45,46,44,49,42,45,46,47,42,46];
	var mData = [75,72,61,46,13,45,15,64,87,89,78,21,64];

	setInterval( ()=>{
		var myDate = new Date();
		var year=myDate.getFullYear();        //获取当前年
		var month=myDate.getMonth()+1;   //获取当前月
		var date=myDate.getDate();            //获取当前日
		var h=myDate.getHours();              //获取当前小时数(0-23)
		var m=myDate.getMinutes();          //获取当前分钟数(0-59)
		var s=myDate.getSeconds();
		var now=year+'/'+getNow(month)+"/"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);
		$(".header-time").text(now)

		var rand = hData[h%12]+''+mData[m%10]
		$(".rand").text(rand)


	},1000)

	// var Tx = 5000;
	// var Ty = 3000;
	// var rand = parseInt(Math.random() * (Tx - Ty + 1) + Ty);
	// $(".rand").text(rand)
	// setInterval(() =>{
	// 	var rand = parseInt(Math.random() * (Tx - Ty + 1) + Ty);
	// 	$(".rand").text(rand)
	// },60*1000)


})

$(function() {
	var _s = document.createElement('script');
	_s.src="https://service.max68888.com/customerServer.js"
	_s.onload = function(){
		var option = {
			"authInit":true,
			openUrl: 'https://service.max68888.com',
			token: '1cdefdbc31a297d7cd0705bc71352b50',
			kefuid:'',//默认为空自动对接客服，可填写指定客服ID
			isShowTip: false, // 初始化成功后，界面右下角会自动创建 “联系客服按钮”， 如无需默认展示，则填写false即可,默认为true
			mobileIcon: '', //  手机端悬浮客服图片
			pcIcon: '', // pc端悬浮客服图片
			windowStyle:'center',//默认空 右下角小弹窗， center 普通中间弹窗样式
		};
		window.canCustomerServer = new initCustomerServer(option);
		window.canCustomerServer.init();
	}
	document.head.appendChild(_s)
});
$(".onKefu").on('click' , function () {
	console.log("客服")
	window.canCustomerServer.getCustomeServer();
})








