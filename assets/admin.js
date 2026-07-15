// Shared admin chrome for static mockups — injects sidebar + topnav.
// Usage: <aside class="side" data-side="orders"></aside> and <header class="topnav" data-crumb="Đơn hàng"></header>
(function () {
  var NAV = [
    { g: null, items: [['dashboard', 'Dashboard', 'a01-dashboard.html', 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z']] },
    { g: 'Bán hàng', items: [
      ['orders', 'Đơn hàng', 'a08-orders-list.html', 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0'],
      ['contact', 'Yêu cầu custom', 'a14-contact-requests.html', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z'],
      ['vouchers', 'Voucher', 'a10-vouchers-list.html', 'M5 8a3 3 0 0 0 0 8v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-8V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2ZM15 5v14'],
    ]},
    { g: 'Danh mục', items: [
      ['products', 'Sản phẩm', 'a04-products-list.html', 'm21 16-9 5-9-5V8l9-5 9 5ZM3 8l9 5 9-5M12 13v8'],
      ['categories', 'Danh mục & BST', 'a06-categories.html', 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'],
      ['landing', 'Landing page', 'a12-landing-list.html', 'M3 3h18v18H3zM3 9h18M9 21V9'],
    ]},
    { g: 'Hệ thống', items: [
      ['users', 'Người dùng', 'a02-users-list.html', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M22 21v-2a4 4 0 0 0-3-3.87'],
      ['settings', 'Cài đặt', 'a15-settings.html', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83A1.65 1.65 0 0 0 12 21a1.65 1.65 0 0 0-3-1 1.65 1.65 0 0 0-1.82.33 2 2 0 1 1-2.83-2.83A1.65 1.65 0 0 0 4.6 15a2 2 0 1 1 0-4 1.65 1.65 0 0 0 1-2.75 2 2 0 1 1 2.83-2.83A1.65 1.65 0 0 0 12 3a2 2 0 1 1 4 0 1.65 1.65 0 0 0 2.75 1 2 2 0 1 1 2.83 2.83A1.65 1.65 0 0 0 21 12a2 2 0 1 1 0 4Z']]
    }
  ];
  function ic(d){ return '<svg class="icon" viewBox="0 0 24 24"><path d="'+d+'"/></svg>'; }
  function buildSide(active){
    var h = '<div class="side-brand"><svg class="icon gem" viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 12L2 9Z"/></svg>MOC Gems</div>';
    NAV.forEach(function(sec){
      if (sec.g) h += '<div class="side-group">'+sec.g+'</div>';
      sec.items.forEach(function(it){
        h += '<a href="'+it[2]+'"'+(it[0]===active?' class="active"':'')+'>'+ic(it[3])+it[1]+'</a>';
      });
    });
    h += '<div class="side-foot"><span class="avatar">SA</span><div><div style="color:#fff;font-size:12px;font-weight:600">Super Admin</div><div style="font-size:11px">admin@mocgems.com</div></div></div>';
    return h;
  }
  function buildTop(crumb){
    return '<div class="crumb">'+crumb+'</div>'
      + '<div style="display:flex;gap:12px;align-items:center">'
      + '<button class="icon-btn" aria-label="Thông báo"><svg class="icon" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg></button>'
      + '<span class="avatar">SA</span></div>';
  }
  document.addEventListener('DOMContentLoaded', function(){
    var s = document.querySelector('.side[data-side]');
    if (s) s.innerHTML = buildSide(s.getAttribute('data-side'));
    var t = document.querySelector('.topnav[data-crumb]');
    if (t) t.innerHTML = buildTop(t.getAttribute('data-crumb'));
  });
})();
