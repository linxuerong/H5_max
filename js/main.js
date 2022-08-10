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
	setInterval( ()=>{
		var myDate = new Date();
		var year=myDate.getFullYear();        //获取当前年
		var month=myDate.getMonth()+1;   //获取当前月
		var date=myDate.getDate();            //获取当前日
		var h=myDate.getHours();              //获取当前小时数(0-23)
		var m=myDate.getMinutes();          //获取当前分钟数(0-59)
		var s=myDate.getSeconds();
		var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);
		$(".header-time").text(now)

		var x = 4000;
		var y = 3000;
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		$(".rand").text(rand)

	},1000)


})


