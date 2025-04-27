/*網頁版-統計寶寶幣，僅統計頁面上有的數據*/
/* URL: /zh-Hant/point */
statistics = {};
purchaseHistoryElements = [];
usingHistoryElements = [];
func_statists = function(element) {
    /* 購買日期 */
    let date = element.querySelector('[class^=ColumnDate-sc-]').textContent.trim();
    /* 購買方式 */
    let type = element.querySelector('[class^=ColumnType-sc-]').textContent.trim();
    /* 接收者 */
    let receiver = '';
    if(usingHistoryElements.length)
        receiver = element.querySelector('div[class*=UsingHistory__Name-sc-]').textContent.replace(/\s*\(.*?\)\s*/g, '').trim();
    /* 購買數 */
    let points = parseInt(element.querySelector('[class^=Point__PointValue-sc-]').textContent.trim().replace(/,/g, ''), 10);
    /* 忽略條件 */
    let key = '';
    if(purchaseHistoryElements.length){
        key = `${date}_${type}`;
        /* 忽略 "購買戰隊" */
        if (type.includes('購買戰隊')) return;
        /* 忽略背包禮物 */
        if (points === 1) return;
    }
    if(usingHistoryElements.length){
        key = `${date}_${receiver}`;
        /* 忽略 "訂閱戰隊" */
        if (type.includes('訂閱戰隊')) return;
    }
    /* 統計 */
    if (statistics[key]) {
        statistics[key] += points;
    } else {
        statistics[key] = points;
    }
};

purchaseHistoryElements = document.querySelectorAll('div[class^=PurchaseHistory__Wrapper-sc]');
purchaseHistoryElements.forEach(element => func_statists(element));
usingHistoryElements = document.querySelectorAll('div[class^=UsingHistory__Wrapper-sc]');
usingHistoryElements.forEach(element => func_statists(element));

/* console */
console.log('統計結果:');
console.table(statistics);

/* Alert */
alertMessage = '統計結果:\n';
for (let [key, value] of Object.entries(statistics)) {
    alertMessage += `${key}: ${value} 點數\n`;
}
alert(alertMessage);
