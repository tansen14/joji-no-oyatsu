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
    // 結果送信ボタン
    const submitBtn = document.getElementById('submit-btn');

    event.stopPropagation();
    // イベントキャンセル
    event.preventDefault();

    const year = 2020;
    const month = 4;
    const day = 9;
    const hour = 15;
    const minute = 30;
    const mail = "test@gmail.com";
    const address = "青森県弘前市〇〇－１";
    const phone = "090-1234-5678";
    const sumPrice = 500;
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
        'entry.545868401': mail,                // メールアドレス
        'entry.775530315': address,             // 住所
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
          // 文字列を送信させる
          getOrderNum(lineId);
          // LIFFを閉じる
          liff.closeWindow();
        },
        200: function() {
          //
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
    $("#exampleFormControlSelect1").prop("disabled", true);
    // 初期化
    $("#exampleFormControlSelect1").empty();
    const base_time = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];
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

  function getOrderNum(lineId) {
    fetch('https://script.google.com/macros/s/AKfycbzUlzd4eB6DCpcoksAmSif5d9APlVASv9wnoqmzEqSxtAtmT3px/exec?kind=order_num&userId=' + lineId)
      .then((data) => data.json())
      .then((obj) => {
        console.log(obj.orderNum);
        return "【注文番号】" + obj.oderNum;
      });
  }
}