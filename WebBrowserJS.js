
/**
用途: 17直播網頁版自動點點心與回戳主播


1.0.0: 自動點點心與回戳主播
2.0.0: 自動點開點心櫃、滿十或直播結束自動關閉頁面
2.1.0: 黑白畫面，降低體驗

*/
javascript: (function () {
  var flag_snack_clicked = false;
  var loop_sec = 10; /*每隔幾秒執行一次*/
  function finishedLive() {
    let msg = document.querySelector('div[class^=Recommend__Title-sc-]');
    if (msg && msg.textContent == '直播已經結束囉')
      return true;
    return false;

  }
  function checkSnackFinish() {
    let msg = getSnackMsg();
    if (msg && msg == '每日免費點心額度已用完') {
      console.log('每日免費點心額度已用完');
      return true;
    }
    return false;

  }
  function getSnackMsg() {
    /*免費送點心支持主播！、每日免費點心額度已用完*/
    let msg = document.querySelector('div[class^="SubmitChatTip__SubmitChatTipWrapper-sc-"]');
    if (msg) return msg.textContent;
    return false;

  }
  function openSnackBox() {
    if (!getSnackMsg()) {
      let svg = document.querySelector('div[class^="SubmitChatModeButtons__SubmitChatModeButtonsWrapper-sc"] div[class^="Box-sc"] div[class^="CircleButton-sc"] svg');
      if (svg) svg.parentElement.click();
      if (getSnackMsg()) {
        console.log('開啟點心櫃');
        return true;
      } else {
        console.log('點心櫃開啟失敗');
        return false;
      }
    } return true;

  }
  function sendSnack() {
    if (!openSnackBox()) return;
    let button = document.querySelector('button[class^="SnackItemButton__StyledSnackItemButton-sc-"]');
    if (button) {
      if (!flag_snack_clicked) {
        button.click();
        console.log("送出按鈕已點擊！");
        flag_snack_clicked = true;

      } else {
        console.log("送出點心失敗！");
        window.top.document.title = '送出點心失敗！';
      }
    } else {
      console.log("未找到送出按鈕。");
      flag_snack_clicked = false;

    }
  };
  function backPoke() {
    document.querySelectorAll('div[class^=PokeItem__Wrapper-sc-] div.LinesEllipsis').
      forEach(div => {
        if (div.textContent.includes("直接回戳")) {
          
          /*降低頻率*/
          if (Math.floor(Math.random() * 2) == 0) { console.log("發現被主播戳，降低頻率，晚點再回戳");return;}
          
          console.log("發現被主播戳，直接回戳");
          div.parentElement.parentElement.click();
        }
      });

  };
  function closeWindow() {
    window.close();
    window.parent.location = 'about:blank';
  }
  function main() {
    /*降低頻率*/
    if (Math.floor(Math.random() * 3) == 0) return;
    if (finishedLive()) closeWindow();
    sendSnack();
    backPoke();
    /*滿十後隨機關閉*/
    if (checkSnackFinish())
      if (Math.floor(Math.random() * 5) == 0)
        closeWindow();

  };
  setInterval(main, loop_sec * 1000);
  console.log("設定自動化");
  alert("設定自動化");
  document.querySelector('html').style.cssText = '-webkit-filter:grayscale(100%);';
})();
