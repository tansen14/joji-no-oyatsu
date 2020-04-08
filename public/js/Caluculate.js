/*商品情報*/
const itemName = ["ジョージのおやつHAPPY BOX","カヌレ","チーズケーキ","アップルパイ","イチゴのタルト","クッキーシュー","桜あんと生クリームのタルト","生ガトーショコラ","レモンケーキ"];
const itemFeeInTax = [900, 162, 378, 216, 378, 162, 378, 367, 324];
const itemFeeWithoutTax = [834, 150, 378, 216, 378, 162, 378, 367, 324];

function accountCaluculate() {

	const itemQty = document.getElementsByName('counter');
	const totalFee = getValue(itemFeeInTax,itemQty);

	document.getElementById('totalFeeOutTax').value = itemName[0];

	if (totalFee > 500) {
		document.getElementById('totalFeeOutTax').value = "(税込)合計：¥" + totalFee;
	} else {
		document.getElementById('totalFeeOutTax').value = "500円以上購入してください。　現在：(税抜)¥" + totalFee;
	}
}

function getValue(fees, qtys) {
	var totalValue = 0;
	for (  var i = 0;  i < fees.length;  i++  ) {
		const fee = fees[i];
		const value = qty * fee;
		totalValue = totalValue + value;
	}

	return totalValue;
}

/* モーダル内容作成 */
document.getElementById("modal_display_button").onclick = function() {
	const itemName = ["ジョージのおやつHAPPY BOX","カヌレ","チーズケーキ","アップルパイ","イチゴのタルト","クッキーシュー","桜あんと生クリームのタルト","生ガトーショコラ","レモンケーキ"];
	const itemFeeInTax = [900, 162, 378, 216, 378, 162, 378, 367, 324];
	const itemFeeWithoutTax = [834, 150, 378, 216, 378, 162, 378, 367, 324];
	var totalFeeInTax = 0;
	var displayItemList = [];
    $('input[name="counter"]').each(function(index) {
        var qty = $(this).val();
        var feeInTax = itemFeeInTax[index] * qty
        if (feeInTax > 0) {
			displayItemList.push([itemName[index], qty, feeInTax.toLocaleString()]);
        }
        totalFeeInTax = totalFeeInTax + feeInTax;
    })

    // tbodyの作成
	createTbody(displayItemList, totalFeeInTax.toLocaleString());
};

function createTbody(displayItemList, totalFeeInTax) {
		console.log(totalFeeInTax);
		var tbody = document.getElementById('modal_itemlist');

		// 初期化
		clearTable(tbody);

		// データの数だけレコード生成
		for (var r = 0; r < displayItemList.length; r++) {
			var displayItem = displayItemList[r];
			var tr = document.createElement('tr');
			var th = document.createElement('th');
			th.scope = "row";
			// #
			th.innerHTML = r + 1;
			tr.appendChild(th);
			// 商品名
			var td1 = document.createElement('td');
			console.log(displayItem[0]);
			td1.innerHTML = displayItem[0];
			tr.appendChild(td1);
			// 数量
			var td2 = document.createElement('td');
			td2.innerHTML = displayItem[1];
			tr.appendChild(td2);
			// 小計
			var td3 = document.createElement('td');
			td3.classList.add("text-right");
			td3.innerHTML = "¥" + displayItem[2];
			tr.appendChild(td3);
			tbody.appendChild(tr);
		}
		var tr = document.createElement('tr');
		var th = document.createElement('th');
		th.scope = "row";
		tr.appendChild(th);
		var td1 = document.createElement('td');
		td1.classList.add("font-weight-bolder");
		td1.classList.add("text-right");
		td1.innerHTML = "合計";
		tr.appendChild(td1);
		var td2 = document.createElement('td');
		tr.appendChild(td2);
		var td3 = document.createElement('td');
		td3.classList.add("text-right");
		td3.innerHTML = "¥" + totalFeeInTax;
		tr.appendChild(td3);
		tbody.appendChild(tr);
}

// 既存の行を削除
function clearTable(tbody) {
    while (tbody.rows.length > 0) {
        tbody.deleteRow(0);
    }
}