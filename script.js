var hashA = init();
var keys = hashA['keys'];
var hash = hashA['hash'];

generateKeyBoard(keys, hash);

listenToUser(hash);

function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || 'null');
}

function createSpan(textContent) {
  var span = document.createElement('span');
  span.textContent = textContent;
  span.className = 'text';
  return span;
}

function createButton(id) {
  var button = document.createElement('button');
  button.textContent = 'edit';
  button.id = id;
  button.onclick = function(event) {
    var img = event.target.previousElementSibling;
    var website = prompt('Give me a website');
    hash[id] = website;
    img.src = 'http://' + website + '/favicon.ico';
    img.onerror = function(event) {
      event.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
    };
    localStorage.setItem('zzz', JSON.stringify(hash));
  }
  return button;
}

function createImage(domain) {
  var img = document.createElement('img');
  if (domain) {
    img.src = 'http://' + domain + '/favicon.ico';
  } else {
    img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
  }
  img.onerror = function(event) {
    event.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  }
  return img;
}

function init() {
  var keys = {
    '0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
    '1': {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
    '2': {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
    'length': 3
  };
  var hash = {
    'g': 'google.com', 'h': 'hsbc.com', 'q': 'qq.com', 'w': 'weibo.com', 'e': 'explainshell.com', 'r': 'react.com', 't': 'twitter.com', 'y': 'youtube.com', 'u': 'uniqlo.com' , 'i': 'iqiyi.com', 'o': 'opera.com', 'p': "paypal.com", 'a': 'amazon.com', 's': 'shadowsocks.la', 'z': 'zhihu.com', 'm': 'www.mcdonalds.com.cn'
  };
  var hashInLocalStorage = getFromLocalStorage('zzz');
  if (hashInLocalStorage) {
    hash = hashInLocalStorage;
  }
  return {
    keys: keys,
    hash: hash,
  };
}

function generateKeyBoard(keys, hash) {
  for (var index = 0; index < keys.length; index++) {
    var div = document.createElement('div');
    div.className = 'row';
    main.appendChild(div);

    var row = keys[index];

    for (var index2 = 0; index2 < row.length; index2++) {
      var span = createSpan(row[index2]);
      var button = createButton(row[index2]);
      var img = createImage(hash[row[index2]]);

      var kbd = document.createElement('kbd');
      kbd.className = 'key';

      kbd.appendChild(span);
      kbd.appendChild(img);
      kbd.appendChild(button);

      div.appendChild(kbd);
    }
  }
}

function listenToUser(hash) {
  document.onkeypress = function(event) {
    var key = event.key;
    var website = hash[key];
    // location.href = 'http://' + website;
    window.open('http://' + website, '_blank');
  }
}
