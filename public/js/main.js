'use strict';
{

  let lineId = "userId";
  let displayName = "displayName";

  liff.init(function (data) {
    getProfile();
    // initializeApp(data);
  });

  // プロファイルの取得と表示
  function getProfile(){
    liff.getProfile().then(function (profile) {
      lineId = profile.userId;
      displayName = profile.displayName;
    }).catch(function (error) {
      window.alert("Error getting profile: " + error);
    });
  }

  const onSubmitBtn = $("#form");
  onSubmitBtn.submit(function(){
    // インジケータ開始
    $("#loading").css("display", "");
    // 結果送信ボタン
    const submitBtn = document.getElementById('submit-btn');
    event.stopPropagation();
    // イベントキャンセル
    event.preventDefault();
    
    const year = $('#date').val().slice(0, 4);
    const month = $('#date').val().slice(5, 7);
    const day = $('#date').val().slice(8, 10);
    const hour = $('#exampleFormControlSelect1').val().slice(0, 2);
    const minute = $('#exampleFormControlSelect1').val().slice(3, 5);
    const mail = $('#exampleInputEmail1').val();
    const address = $('#inputAddress03').val();
    const phone = $('#inputPhone').val();
    const sumPrice = $('#totalFeeOutTax').val();

    const itemName = ["ジョージのおやつHAPPY BOX","カヌレ","チーズケーキ","アップルパイ","イチゴのタルト","クッキーシュー","桜あんと生クリームのタルト","生ガトーショコラ","レモンケーキ"];
	var totalFeeInTax = 0;
	var displayItemData = "";
	
	
	const times = $("#exampleFormControlSelect1 option:selected").text();
	const ymd = "お届け日時:" + year + "年" + month + "月" + day +"日" + times;
	const phoneaddress = "電話番号:" + phone + "\n\n住所:" + address
	
	displayItemData =  phoneaddress+ "\n\n" + ymd + "\n\n" + "注文内容\n_______________________\n";
    $('input[name="counter"]').each(function(index) {
        var qty = $(this).val();
        var feeInTax = itemFeeInTax[index] * qty;
        if (feeInTax > 0) {
        	displayItemData = displayItemData + itemName[index] + "×" + qty + ": \n¥" + feeInTax.toLocaleString() + "\n";
        }
        totalFeeInTax = totalFeeInTax + feeInTax;
    })
    displayItemData = displayItemData + "_______________________\n合計: \n¥" + totalFeeInTax.toLocaleString();

    // itemの個数の配列
    const items = document.getElementsByName('counter');

    // 裏に用意したGoogleFormにajax非同期通信で値を送信する
    $.ajax({
      url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSecxIXt5tU5tlNYSB4iUlx5uoQ_V65oqyAf5Aj0F56lWvIvXA/formResponse',
      data: {
        'entry.1353680214': lineId,             // lINE ID
        'entry.1235356053': displayName,        // 表示名
        'entry.567938596_year': year,           // 年
        'entry.567938596_month': month,         // 月
        'entry.567938596_day': day,             // 日
        'entry.567938596_hour': hour,           // 時
        'entry.567938596_minute': minute,       // 分
        'entry.775530315': address,             // 住所
        'entry.171214477': mail,                // メールアドレス
        'entry.1315798513': phone,              // 電話番号
        'entry.1407908955': sumPrice,           // 合計料金
        'entry.12472245': items[0].value,       // ジョージのおやつHAPPY BOX
        'entry.1191119162': items[1].value,     // カヌレ
        'entry.1553621218': items[2].value,     // チーズケーキ
        'entry.1263452350': items[3].value,     // アップルパイ
        'entry.1119774577': items[4].value,     // イチゴのタルト
        'entry.786743653': items[5].value,      // クッキーシュー
        'entry.494953515': items[6].value,      // 桜あんと生クリームのタルト
        'entry.1487205902': items[7].value,     // 生ガトーショコラ
        'entry.1658252972': items[8].value,     // レモンケーキ
      },
      type: 'POST',
      datatype: 'xml',
      statusCode: {
        // 送信が成功した場合
        0: function() {
          setTimeout(reserved(lineId, displayItemData), 2000);
        },
        200: function() {
          alert("注文失敗しました。もう一度最初からお試しください");
          liff.closeWindow();
        }
      }
    });
  });

  // 初回API読み込み
  date_check();
  // "dateにイベントリスナーでonchange
  $("#date").change(function() {
    date_check();
  });

  function date_check() {
    // インジケータ開始
    $("#dateCheckLoading").css("display", "");
    $("#exampleFormControlSelect1").prop("disabled", true);
    // 初期化
    $("#exampleFormControlSelect1").empty();
    const base_time = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

    $("#exampleFormControlSelect1").append("<option selected>選択してください</option>");

    for(let i = 0; i < base_time.length - 1; i++){
      let data_option = '<option value=' + base_time[i] + '>' + base_time[i] + ' 〜 ' + base_time[i+1] + '</option>';
      $("#exampleFormControlSelect1").append(data_option);
    }
    $("#exampleFormControlSelect1 option").prop("disabled", false);

    let date = $("#date").val().replace(/-/g, '');

    // 裏に用意したGoogleFormにajax非同期通信で値を送信する
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzUlzd4eB6DCpcoksAmSif5d9APlVASv9wnoqmzEqSxtAtmT3px/exec?kind=time_check&userId=' + lineId + '&date=' + date,
      type: 'GET',
      datatype: 'json'
    })
    .done(function(data) {
      // インジケータ終了
      $("#dateCheckLoading").css("display", "none");
      let reserved_dates = data.ReservedDates;
      reserved_dates.forEach(element => {
        $('#exampleFormControlSelect1 option[value="' + element + '"]').text('✕既にご予約されています。').prop("disabled", true);
      });
      $("#exampleFormControlSelect1").prop("disabled", false);
    })
    .fail(function(data) {
      $("#exampleFormControlSelect1").prop("disabled", false);
    });
  }

  function reserved(lineId, displayItemData) {
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzUlzd4eB6DCpcoksAmSif5d9APlVASv9wnoqmzEqSxtAtmT3px/exec?kind=order_num&userId=' + lineId,
      type: 'GET',
      datatype: 'json'
    })
    .done(function(data) {
        // インジケータ終了
        $("#loading").css("display", "none");
      let order_num = data.orderNum;
      const m = "予約確定しました。画面が閉じない場合は左上のXボタンで閉じてください。\n【注文番号】" + order_num + "\n" + displayItemData;
      window.alert(m);

        // 文字列を送信させる
      liff.sendMessages([{
        'type': 'text',
        'text': "【注文番号】" + order_num + "\n" + displayItemData
      }]).then(function() {
        // LIFFを閉じる
        liff.closeWindow();
      }).catch(function(error) {
        window.alert('Error sending message: ' + error);
        // LIFFを閉じる
        liff.closeWindow();
      });
      liff.closeWindow();
    })
    .fail(function(data) {
    });
  }

}
