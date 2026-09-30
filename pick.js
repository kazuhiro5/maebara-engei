// ★デモ専用：案・色・書体の切り替え＋スマホのメニュー開閉（決定したら、このファイルと .pick を削除する）
//   ?color=c&font=b のようにURLでも指定できる。選んだ内容は端末に記憶され、案を移動しても引き継がれる。
(function () {
  var box = document.getElementById('pick');
  if (box) {
    var sets = {
      color: { link: document.getElementById('colorset'), keys: 'abcde', attr: 'color' },
      font:  { link: document.getElementById('fontset'),  keys: 'abc',   attr: 'font'  }
    };
    var apply = function (kind, k) {
      var set = sets[kind];
      if (!set.link) return;
      if (set.keys.indexOf(k) < 0) k = 'a';
      set.link.href = kind + '-' + k + '.css';
      Array.prototype.forEach.call(box.querySelectorAll('[data-' + set.attr + ']'), function (b) {
        b.classList.toggle('is-on', b.dataset[set.attr] === k);
      });
      try { localStorage.setItem('maebara-' + kind, k); } catch (e) {}
    };
    var q = new URLSearchParams(location.search);
    Object.keys(sets).forEach(function (kind) {
      var saved = null;
      try { saved = localStorage.getItem('maebara-' + kind); } catch (e) {}
      apply(kind, q.get(kind) || saved || 'a');
    });
    box.addEventListener('click', function (e) {
      var d = e.target.dataset || {};
      if (d.color) apply('color', d.color);
      if (d.font)  apply('font',  d.font);
    });
    // 案を移動しても色と書体を持ち越す
    box.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-plan]') : null;
      if (!a) return;
      var c = 'a', f = 'a';
      try { c = localStorage.getItem('maebara-color') || 'a'; f = localStorage.getItem('maebara-font') || 'a'; } catch (err) {}
      a.href = a.getAttribute('href').split('?')[0] + '?color=' + c + '&font=' + f;
    });
  }

  // スマートフォンのメニュー開閉
  var b = document.getElementById('burger'), n = document.getElementById('nav');
  if (b && n) {
    b.addEventListener('click', function () {
      var open = n.classList.toggle('is-open');
      b.classList.toggle('is-open', open);
      b.setAttribute('aria-expanded', open);
    });
    n.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { n.classList.remove('is-open'); b.classList.remove('is-open'); }
    });
  }
})();
