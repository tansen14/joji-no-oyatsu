/* モーダル内容作成 */
function createTable() {
	var totalFeeInTax = 0;
	var displayItemList = [];
	$('input[name="counter"]').each(function(index) {
		var qty = $(this).val();
		var feeInTax = itemFeeList[index] * qty
		if (feeInTax > 0) {
			displayItemList.push([itemNameList[index], qty, feeInTax.toLocaleString()]);
		}
		totalFeeInTax = totalFeeInTax + feeInTax;
	})

	// tbodyの作成
	createTbody(displayItemList, totalFeeInTax.toLocaleString());

	// 合計の入力
	$('#totalFeeOutTax').val(totalFeeInTax);
	if (totalFeeInTax >= 500) {
		$('#totalFeeOutTax').removeClass("is-invalid").addClass("is-valid");
	} else {
		$('#totalFeeOutTax').removeClass("is-valid").addClass("is-invalid");
	}
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

	createTable();
}
