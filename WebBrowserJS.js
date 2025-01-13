javascript:(function() {
	/* 送出點心(點心櫃要先點開) */
	function sendSnack(){
		let button = document.querySelector('button[class^="SnackItemButton__StyledSnackItemButton-sc-"]');
		if(button){button.click();console.log("送出按鈕已點擊！");}
		else{console.log("未找到送出按鈕。");}
	};
	/* 回戳主播 */
	function backPoke(){
		document.querySelectorAll('div[class^=PokeItem__Wrapper-sc-] div.LinesEllipsis').forEach(div =>{
			if(div.textContent.includes("直接回戳")){console.log("發現被主播戳，直接回戳");div.parentElement.parentElement.click();}
		});
	};
	function clickButton() {
		sendSnack();
		backPoke();
	};
	setInterval(clickButton,1*60*1000);
	console.log("設定自動化");
})();
