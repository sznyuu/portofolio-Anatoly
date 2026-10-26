(function(){
    var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $('#yr').textContent=new Date().getFullYear();
  
    // Menu mobile
    var burger=$('#burger'), menu=$('#menu');
    burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.textContent=o?'✕':'☰'});
    $$('#menu a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');burger.textContent='☰';burger.setAttribute('aria-expanded','false')})});
  
    // Menu aktif saat scroll
    var secs=$$('header[id],section[id]'), links=$$('#menu a');
    var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){spy.observe(s)});
  
    // Teks mengetik
    var roles=['Mahasiswa Sistem Informasi','Web Developer Pemula','Universitas Tanjungpura'], t=$('#typed'), ri=0, ci=0, del=false;
    function type(){
      var w=roles[ri];
      if(reduce){t.textContent=w;return}
      t.textContent=w.slice(0,ci);
      if(!del&&ci<w.length){ci++;setTimeout(type,70)}
      else if(!del){del=true;setTimeout(type,1400)}
      else if(ci>0){ci--;setTimeout(type,35)}
      else{del=false;ri=(ri+1)%roles.length;setTimeout(type,300)}
    }
    type();
  
    // Efek scroll muncul dan hitung angka
    var rv=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      var el=e.target; el.classList.add('in'); rv.unobserve(el);
      $$('[data-count]',el).forEach(count);
    })},{threshold:.15});
    $$('.rv').forEach(function(el){rv.observe(el)});
    function count(el){
      var end=parseFloat(el.dataset.count), dec=String(el.dataset.count).indexOf('.')>-1?1:0, t0=null;
      function step(ts){t0=t0||ts;var p=Math.min((ts-t0)/1200,1);el.textContent=(end*p).toFixed(dec);if(p<1)requestAnimationFrame(step)}
      reduce?el.textContent=end.toFixed(dec):requestAnimationFrame(step);
    }
  
    // Filter proyek
    $$('#filters button').forEach(function(b){b.addEventListener('click',function(){
      $$('#filters button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');
      $$('.card').forEach(function(c){c.classList.toggle('hide',b.dataset.f!=='all'&&c.dataset.c!==b.dataset.f)});
    })});
  
  })();