// パスワード生成の関数を定義
function generatePassword() {
  // パスワードの長さを取得
  var length = document.getElementById("length").value;
  // パスワードの長さが0以下の場合は処理を終了
  if (length <= 0) {
    return;
  }
  // パスワードの文字列を定義
  var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // 大文字は除外する
  if (!document.getElementById("uppercase").checked) {
    str = str.replace(/[A-Z]/g, "");
  }
  // 小文字は除外する
  if (!document.getElementById("lowercase").checked) {
    str = str.replace(/[a-z]/g, "");
  }
  // 数字は除外する
  if (!document.getElementById("number").checked) {
    str = str.replace(/[0-9]/g, "");
  }
  // 記号は除外する
  if (!document.getElementById("symbol").checked) {
    str = str.replace(/[^a-zA-Z0-9]/g, "");
  }
  // 特定の文字を除外する
  if (document.getElementById("exclude").value) {
    var exclude = document.getElementById("exclude").value;
    str = str.replace(new RegExp("[" + exclude + "]", "g"), "");
  }
  // パスワード生成の個数を取得
  var count = document.getElementById("count").value;
  // パスワードを生成
  var password = [];
  // パスワード生成の個数分繰り返し配列に格納
  for (var i = 0; i < count; i++) {
    // パスワードを生成
    var pass = "";
    for (var j = 0; j < length; j++) {
      pass += str[Math.floor(Math.random() * str.length)];
      // パスワードを配列に格納
    }
    password.push(pass);
  }
  return password;
}

function outputPassword() {
  // init password
  var password = [];
  // パスワードを生成
  password = generatePassword();
  // パスワードをテーブするに表示
  var table = document.getElementById("password");
  // テーブルの行を削除
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
  // パスワードとコピーボタンをテーブルに表示
  for (var i = 0; i < password.length; i++) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    cell1.innerHTML = password[i];
    cell2.innerHTML =
      '<button class="btn btn-primary" onclick="copyPassword(event)">コピー</button>';
  }

  // init password
  password = [];
}

function copyPassword(event) {
  // パスワードをクリップボードにコピー
  var password = event.target.parentNode.parentNode.cells[0].innerHTML;
  var temp = document.createElement("div");
  temp.appendChild(document.createElement("pre")).textContent = password;
  var s = temp.style;
  s.position = "fixed";
  s.left = "-100%";
  document.body.appendChild(temp);
  document.getSelection().selectAllChildren(temp);
  var result = document.execCommand("copy");
  document.body.removeChild(temp);
  return result;
}

outputPassword();
