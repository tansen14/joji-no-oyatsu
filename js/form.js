
/* ここから修正↓↓ */
function result() {
  var list = document.getElementById('list');
  while (list.firstChild) list.removeChild(list.firstChild);

  var elements = document.getElementsByTagName("input");
  for(var i=0; i<elements.length; i++){
    var type = elements[i].type;
    var name = elements[i].name;
    var key = elements[i].id;
    var checked = elements[i].checked;
    var value = elements[i].value;
    if(type == "checkbox" || type == "radio"){
      if (checked) {
        view(name, type, value, list);
      }
    }else {
      view(name, type, value, list);
    }
  }
}

// 画面に表を作成する関数
var view = function(name, key, value, list) {
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  list.appendChild(tr);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  td1.innerText = key;
  td2.innerText = name;
  td3.innerText = value;
}
/* ここまで修正↑↑ */

// スクロール
  function pageScroll() {
    // #で始まるアンカーをクリックした場合に処理
      // スクロールの速度
      var speed = 400; // ミリ秒
      // アンカーの値取得
      var href= "#confirm";
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      // スムーススクロール
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
  }
