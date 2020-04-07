
function accountCaluculate() {	
	// item情報
	const itemName = ["ジョージのおやつHAPPY BOX","カヌレ","チーズケーキ","アップルパイ","イチゴのタルト","クッキーシュー","桜あんと生クリームのタルト","生ガトーショコラ","レモンケーキ"];
	const itemFeeInTax = [900, 162, 378, 216, 378, 162, 378, 367, 324];
	const itemQty = document.getElementsByName('counter');
		
	const totalFee = getValue(itemFeeInTax,itemQty);
	document.getElementById('totalFeeOutTax').value = itemName[0];
	
	if (totalFee > 500) {
		document.getElementById('totalFeeOutTax').value = "(税込)合計：¥" + totalFee;
	} else {
		document.getElementById('totalFeeOutTax').value = "500円以上買ってください。現在：(税抜)¥" + totalFee;
	}
}

function getValue(fees, qtys, fluctuation) {
	var totalValue = 0;
	for (  var i = 0;  i < fees.length;  i++  ) {
		var qty = 0;
		if (Number(qtys[i].value) > 0) {
			qty = Number(qtys[i].value) + Number(fluctuation);				
		}
		if (i == 0) {
			console.log(qty)
		}
		const fee = fees[i];
		var value = qty * fee;
		totalValue = totalValue + value;
	}

	return totalValue;
}

document.getElementById("modal_display_button").onclick = function() {
	createTbody();
};

function createTbody() {
        var tbody = document.getElementById('modal_itemlist');
        for (var r = 1; r <= 3; r++) {
            var tr = document.createElement('tr');
        	var th = document.createElement('th');
            th.scope = "row";
            th.innerHTML = 1;
            tr.appendChild(th);
            var td1 = document.createElement('td');
            td1.innerHTML = "チーズケーキ";
            tr.appendChild(td1);
            var td2 = document.createElement('td');
            td2.innerHTML = r;
            tr.appendChild(td2);
            var td3 = document.createElement('td');
            td3.innerHTML = "¥300";
            tr.appendChild(td3);
            tbody.appendChild(tr);
        }
        var tr = document.createElement('tr');
    	var th = document.createElement('th');
        th.scope = "row";
        tr.appendChild(th);
        var td1 = document.createElement('td');
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.classList.add("font-weight-bolder");
        td2.innerHTML = "合計";
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        td3.innerHTML = "¥900";
        tr.appendChild(td3);
        tbody.appendChild(tr);
}


