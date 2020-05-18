/*商品情報*/
const itemName = ["ジョージのおやつHAPPY BOX","ピスタチオのモンブランタルト","栗のモンブランタルト","桜あんと生クリームのタルト","カヌレ","チーズケーキ","イチゴのタルト","クッキーシュー","生ガトーショコラ"];
const itemFeeInTax =      [900, 380, 380, 380, 220, 380, 380, 170, 370];
const itemFeeWithoutTax = [834, 352, 352, 352, 204, 352, 352, 158, 343];


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

function getValue() {
	var totalValue = 0;
	$('input[name="counter"]').each(function(index) {
		var qty = $(this).val();
		var feeWithoutTax = itemFeeWithoutTax[index] * qty;
		totalValue = totalValue  + feeWithoutTax;
	})
	return totalValue;
}

/* モーダル内容作成 */
function createTable() {
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
	var tbody = document.getElementById('itemListToBuy');

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
	td1.innerHTML = "(税込)合計";
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

function sum_show(){
	var tbody = document.getElementById('itemListToBuy');
	// 初期化
	clearTable(tbody);

	const totalFee = getValue();
	const totalFeeInTax = "¥" + totalFee.toLocaleString();
	$('#totalFeeOutTax').val(getValue());
	if ( totalFee >= 500) {
		$('#totalFeeOutTax').removeClass("is-invalid").addClass("is-valid");
		createTable();
	} else {
		$('#totalFeeOutTax').removeClass("is-valid").addClass("is-invalid");
		$('#totalFeeInTax').val("");
	}
}
