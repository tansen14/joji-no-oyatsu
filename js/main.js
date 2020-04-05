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
  // inputの必須条件をクリアしているかチェック

  // 裏に用意したGoogleFormにajax非同期通信で値を送信する
  $.ajax({
    url: 'https://docs.google.com/forms/d/e/"ここにフォームのID"/formResponse',
    data: {
      'entry.----------': lineId,             // lINE ID
      'entry.----------': displayName,        // 表示名
      'entry.----------': userAnswers[0],     //
      'entry.----------': userAnswers[1],     //
      'entry.----------': userAnswers[2],     //
      'entry.----------': userAnswers[3],     //
      'entry.----------': userAnswers[4],     //
      'entry.----------': userAnswers[6],     //
      'entry.----------': userAnswers[5],     //
      'entry.----------': userAnswers[8],     //
      'entry.----------': userAnswers[7],     //
      'entry.----------': userAnswers[9],     //
      'entry.----------': score               //
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
