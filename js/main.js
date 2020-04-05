// 'use strict';

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

// 結果送信ボタン
const submit = document.getElementById('submit');

// クリックイベントを付与
submit.addEventListener('click', () => {
  // TODO inputの必須条件をクリアしているかチェック

  const year = 2020;
  const month = 4;
  const day = 9;
  const hour = 15;
  const minute = 30;
  const mail = "test@gmail.com";
  const address = "青森県弘前市〇〇－１";
  const phone = "090-1234-5678";
  const items = ["0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009",];

  // 確認事項を表示
  const confirm = document.getElementById('confirm');
  confirm.style.display = "block";


  // 裏に用意したGoogleFormにajax非同期通信で値を送信する
  $.ajax({
    url: 'https://docs.google.com/forms/d/e/"ここにフォームのID"/formResponse',
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
      'entry.12472245': items[0],             // ジョージのおやつHAPPY BOX
      'entry.1191119162': items[1],           // カヌレ
      'entry.1553621218': items[2],           // チーズケーキ
      'entry.1263452350': items[3],           // アップルパイ
      'entry.1119774577': items[4],           // イチゴのタルト
      'entry.786743653': items[5],            // クッキーシュー
      'entry.494953515': items[6],            // 桜あんと生クリームのタルト
      'entry.1487205902': items[7],           // 生ガトーショコラ
      'entry.1658252972': items[8],           // レモンケーキ

    },
    type: 'POST',
    datatype: 'xml',
    statusCode: {
      // 送信が成功した場合
      0: function() {
        // 文字列を送信させる

        // LIFFを閉じる

      },
      200: function() {
        // テキストに結果を代入
        // scoreLabel.textContent = '送信に失敗しました。';
        // ボタンのテキストを変更
        // scoreSubmit.textContent = 'もう一度やり直す';
        // ボタンのhrefを変更
        // scoreSubmit.href = '';
      }
    }
  })
});
