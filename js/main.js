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
