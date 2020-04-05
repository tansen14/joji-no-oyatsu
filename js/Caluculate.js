var caluculate = function () {
	// item情報
	const itemName = ["ジョージのおやつHAPPY BOX","カヌレ","チーズケーキ","アップルパイ","イチゴのタルト","クッキーシュー","桜あんと生クリームのタルト","生ガトーショコラ","レモンケーキ"];
	const itemFeeInTax = [900, 162, 378, 216, 378, 162, 378, 367, 324];
	const itemQty = document.getElementsByName('counter');
	const totalFee = getValue(itemFeeInTax,itemQty);

	if (totalFee > 500) {
		document.getElementById('edit_area').innerHTML = "(税込)合計：¥" + totalFee;
	} else {
		document.getElementById('edit_area').innerHTML = "500円以上買ってください。現在：(税抜)¥" + totalFee;
	}
}


function getValue(fees, qtys) {
	var totalValue = 0;
	for (  var i = 0;  i < fees.length;  i++  ) {
		const qty = qtys[i].value;
		const fee = fees[i];
		var value = qty * fee;
		totalValue = totalValue + value;
	}

	return totalValue;
}
