'use strict';
let itemNameList = [];
let itemFeeList = [];
{
  let lineId = "userId";
  let displayName = "displayName";

  // 商品情報の取得
  create_item();
  // 初回API読み込み
  date_check();
  // "dateにイベントリスナーでonchange
  $("#date").change(function() {
    date_check();
  });

  function date_check() {
    // インジケータ開始
    $("#dateCheckLoading").css("display", "");
    // 予約ボタンの停止
    $('submit-btn').prop("disabled", true);

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
      // 予約ボタンの開始
      $('#submit-btn').prop("disabled", false);
    });
  }

  function create_item() {
    // 裏に用意したGoogleFormにajax非同期通信で値を送信する
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzUlzd4eB6DCpcoksAmSif5d9APlVASv9wnoqmzEqSxtAtmT3px/exec?kind=stock_num',
      type: 'GET',
      datatype: 'json'
    })
    .done(function(data) {
      // 商品の生成
      create_html(data);
      setSpinner();
    })
    .fail(function(data) {
      setSpinner();
    });
  }

  function create_html(items) {
    // items配列をループ
    for(let i = 0; i <items.length; i++) {
      let itemNum = i + 1;
      // リストの作成
      let itemList = $('<li></li>', {
        id: "menuItem" + itemNum,
        "class": "item"
      });

      // activeチェック
      if(items[i].isActive != 1 || items[i].type != 0) {
        itemList.addClass('d-none');
      }

      // h6の作成
      let h6 = $('<h6></h6>', {
        "class": "text-right mr-1",
        text: items[i].itemName,
        "style": `font-size: calc(100% - ${items[i].itemName.length * 5}vw)px`
      });
      // h3をリストに追加
      itemList.append(h6);

      // 価格用のdivタグ作成
      let priceDiv = $('<div></div>', {
        "class": "text-right mr-1",
      }).html(`<span>¥${(Math.round(items[i].price))}</span><small>  (¥${(Math.round(items[i].price * 100 / 108))})</small>`);
      // 価格用divタグをリストに追加
      itemList.append(priceDiv);

      // 画像用divタグの作成
      let imageDiv = $('<div></div>', {
        "class": "itemImage",
      }).html(`<img alt="${items[i].itemName}" src="${items[i].imageUrl}" class="itemImage">`);
      // 画像用divタグをリストに追加
      itemList.append(imageDiv);

      // 在庫数表示用divタグの作成
      let stockDiv = $('<div></div>', {
        "class": "text-right mr-2",
      }).html(`残り${items[i].stock}個`);
      // 画像用divタグをリストに追加
      itemList.append(stockDiv);

      // 個数変更用divタグの作成
      let spinnerDiv = $('<div></div>', {
        "class": "spinner_area",
      });
      spinnerDiv.append($('<input></input>', {
        type: "button",
        value: "－",
        "class": "btnspinner",
        "data-cal": "-1",
        "data-target": ".counter" + itemNum,
      }));
      spinnerDiv.append($('<input></input>', {
        name: "counter",
        type: "number",
        value: "0",
        "class": "counter counter" + itemNum,
        "data-max": items[i].stock,
        "data-min": 0,
        readonly: true,
      }));
      spinnerDiv.append($('<input></input>', {
        type: "button",
        value: "＋",
        "class": "btnspinner",
        "data-cal": "1",
        "data-target": ".counter" + itemNum,
      }));
      // 画像用divタグをリストに追加
      itemList.append(spinnerDiv);
      $("#itemLoading").fadeOut(1000);
      $('#items ul.menu').append(itemList).hide().fadeIn(1000);

      itemNameList.push(items[i].itemName);
      itemFeeList.push(items[i].price);
    }

  }

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
    // 予約ボタンの停止
    $('#submit-btn').prop("disabled", true);
    // インジケータ開始
    $("#loading").css("display", "");
    // 結果送信ボタン
    const submitBtn = document.getElementById('submit-btn');
    event.stopPropagation();
    // イベントキャンセル
    event.preventDefault();

    const fullName = $('#fullName').val();
    const year = $('#date').val().slice(0, 4);
    const month = $('#date').val().slice(5, 7);
    const day = $('#date').val().slice(8, 10);
    const hour = $('#exampleFormControlSelect1').val().slice(0, 2);
    const minute = $('#exampleFormControlSelect1').val().slice(3, 5);
    const mail = $('#exampleInputEmail1').val();
    const address = $('#inputAddress03').val();
    const address1 = $('#inputAddress04').val();
    const phone = $('#inputPhone').val();
    const sumPrice = $('#totalFeeOutTax').val();
  	var totalFeeInTax = 0;
  	var displayItemData = "";
    const customerComment = $('#exampleFormControlTextarea1').val();

    const times = $("#exampleFormControlSelect1 option:selected").text();
    const fn = "お名前: " + fullName;
    const ymd = "お届け日時:" + year + "年" + month + "月" + day +"日" + times;
    const phoneAddress = "電話番号:" + phone + "\n\n住所:" + address + address1;

    displayItemData =  "\n\n" + fn + "\n\n" + phoneAddress + "\n\n" + ymd + "\n\n" + "注文内容【おやつ号】\n_______________________\n";
    $('input[name="counter"]').each(function(index) {
        var qty = $(this).val();
        var feeInTax = itemFeeList[index] * qty;
        if (feeInTax > 0) {
          displayItemData = displayItemData + itemNameList[index] + "×" + qty + ": \n¥" + feeInTax.toLocaleString() + "\n";
        }
        totalFeeInTax = totalFeeInTax + feeInTax;
    });
    displayItemData = displayItemData + "_______________________\n合計: \n¥" + totalFeeInTax.toLocaleString();
    displayItemData = displayItemData + "\n\nその他：" + customerComment;

    // itemの個数の配列
    const items = document.getElementsByName('counter');

    // 裏に用意したGoogleFormにajax非同期通信で値を送信する
    $.ajax({
      url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSecxIXt5tU5tlNYSB4iUlx5uoQ_V65oqyAf5Aj0F56lWvIvXA/formResponse',
      data: {
        'entry.1353680214': lineId,             // lINE ID
        'entry.1235356053': displayName,        // 表示名
        'entry.1925208028': fullName,           // 氏名
        'entry.567938596_year': year,           // 年
        'entry.567938596_month': month,         // 月
        'entry.567938596_day': day,             // 日
        'entry.567938596_hour': hour,           // 時
        'entry.567938596_minute': minute,       // 分
        'entry.775530315': address + address1,  // 住所
        'entry.171214477': mail,                // メールアドレス
        'entry.1315798513': phone,              // 電話番号
        'entry.1407908955': totalFeeInTax,      // 合計料金
        'entry.12472245': items[0].value,       // ID-0001
        'entry.1191119162': items[1].value,     // ID-0002
        'entry.1553621218': items[2].value,     // ID-0003
        'entry.1263452350': items[3].value,     // ID-0004
        'entry.1119774577': items[4].value,     // ID-0005
        'entry.786743653': items[5].value,      // ID-0006
        'entry.494953515': items[6].value,      // ID-0007
        'entry.1487205902': items[7].value,     // ID-0008
        'entry.1658252972': items[8].value,     // ID-0009
        'entry.1197002078': items[9].value,     // ID-0010
        'entry.2115753137': items[10].value,    // ID-0011
        'entry.1021020355': items[11].value,    // ID-0012
        'entry.1696991098': items[12].value,    // ID-0013
        'entry.1445144589': items[13].value,    // ID-0014
        'entry.384973741': items[14].value,     // ID-0015
        'entry.1470527703': customerComment,    // その他
        'entry.1664613376': 'おやつ号',          // 種別
      },
      type: 'POST',
      datatype: 'xml',
      statusCode: {
        // 送信が成功した場合
        0: function() {
          // setTimeout(reserved(lineId, displayItemData), 3000);
          // インジケータ終了
          $("#loading").css("display", "none");
          $("#completealert").addClass("show");
          // 文字列を送信させる
          liff.sendMessages([{
            'type': 'text',
            'text': "【注文内容】\n" + displayItemData
          }]).then(function() {
            // LIFFを閉じる
            liff.closeWindow();
            return;
          }).catch(function(error) {
            // LIFFを閉じる
            liff.closeWindow();
            return;
          });
        },
        200: function() {
          // 予約ボタンの開始
          $('#submit-btn').prop("disabled", false);
          liff.closeWindow();
          alert("注文失敗しました。もう一度最初からお試しください");
        }
      }
    });
  });


  // function reserved(lineId, displayItemData) {
  //   $.ajax({
  //     url: 'https://script.google.com/macros/s/AKfycbzUlzd4eB6DCpcoksAmSif5d9APlVASv9wnoqmzEqSxtAtmT3px/exec?kind=order_num&userId=' + lineId,
  //     type: 'GET',
  //     datatype: 'json'
  //   })
  //   .done(function(data) {
  //       // インジケータ終了
  //       $("#loading").css("display", "none");
  //       $("#completealert").addClass("show");
  //     let order_num = data.orderNum;
  //       // 文字列を送信させる
  //     liff.sendMessages([{
  //       'type': 'text',
  //       'text': "【注文番号】" + order_num + "\n" + displayItemData
  //     }]).then(function() {
  //       // LIFFを閉じる
  //       liff.closeWindow();
  //       return;
  //     }).catch(function(error) {
  //       // LIFFを閉じる
  //       liff.closeWindow();
  //       return;
  //     });
  //     liff.closeWindow();
  //   })
  //   .fail(function(data) {
  //     // 予約ボタンの開始
  //     $('#submit-btn').prop("disabled", false);
  //   });
  // }

}
