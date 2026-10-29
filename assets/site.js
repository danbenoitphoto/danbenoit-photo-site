// Dan Benoit Photo — reveal-on-scroll + lightbox
(function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.08});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  var figs=[].slice.call(document.querySelectorAll('.grid figure'));
  if(!figs.length)return;
  var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo viewer');
  lb.innerHTML='<button class="close" aria-label="Close">\u00d7</button><img alt=""><div class="bar"><button class="prev" aria-label="Previous photo">\u2039</button><span class="count"></span><button class="next" aria-label="Next photo">\u203a</button></div>';
  document.body.appendChild(lb);
  var img=lb.querySelector('img'),count=lb.querySelector('.count'),i=0,lastFocus=null;
  function show(n){i=(n+figs.length)%figs.length;var f=figs[i],full=f.getAttribute('data-full'),alt=f.querySelector('img').getAttribute('alt')||'';img.src=full;img.alt=alt;count.textContent=(i+1)+' / '+figs.length;}
  function open(n){lastFocus=document.activeElement;show(n);lb.classList.add('open');document.body.style.overflow='hidden';lb.querySelector('.close').focus();}
  function close(){lb.classList.remove('open');document.body.style.overflow='';img.src='';if(lastFocus)lastFocus.focus();}
  figs.forEach(function(f,n){f.addEventListener('click',function(){open(n);});f.setAttribute('tabindex','0');f.addEventListener('keydown',function(e){if(e.key==='Enter')open(n);});});
  lb.querySelector('.close').addEventListener('click',close);
  lb.querySelector('.prev').addEventListener('click',function(){show(i-1);});
  lb.querySelector('.next').addEventListener('click',function(){show(i+1);});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(i-1);else if(e.key==='ArrowRight')show(i+1);
    else if(e.key==='Tab'){var bs=lb.querySelectorAll('button');var first=bs[0],last=bs[bs.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  var x0=null;
  lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>42)show(i+(dx<0?1:-1));x0=null;},{passive:true});
})();
// reveal failsafe: never leave content hidden if the observer lags
setTimeout(function(){document.querySelectorAll('.reveal:not(.in)').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<window.innerHeight*1.4)el.classList.add('in');});},1600);
// v2 UI: mobile menu, header shadow, back-to-top
(function(){
  var btn=document.querySelector('.menu-btn'),navwrap=document.querySelector('header.site .nav');
  if(btn&&navwrap){btn.addEventListener('click',function(){var open=navwrap.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false');});
    navwrap.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){navwrap.classList.remove('open');btn.setAttribute('aria-expanded','false');});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){navwrap.classList.remove('open');btn.setAttribute('aria-expanded','false');}});}
  var hdr=document.querySelector('header.site'),top=document.querySelector('.totop');
  function onScroll(){if(hdr)hdr.classList.toggle('scrolled',window.scrollY>8);if(top)top.classList.toggle('show',window.scrollY>600);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(top)top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
})();
// Site intro: plays on external arrival, click/tap skips, auto-removes after ~5s (CSS fade is the fallback)
(function(){var el=document.getElementById('intro');if(!el)return;var internal=false;try{internal=!!document.referrer&&new URL(document.referrer).origin===location.origin;}catch(e){}
if(internal){el.remove();return;}
var kill=function(){if(el.parentNode)el.remove();};
el.addEventListener('click',kill);setTimeout(kill,5200);})();
// v6.6: contact form — prefill from ?service=&date=, submit via FormSubmit AJAX to Dan's inbox, fall back to the visitor's email app
(function(){var form=document.getElementById('inquiry');if(!form)return;
var NL=String.fromCharCode(10);
var q=new URLSearchParams(location.search);
var svc=q.get('service'),dt=q.get('date');
var sel=form.querySelector('[name="service"]'),dti=form.querySelector('[name="date"]');
if(sel&&svc){for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===svc)sel.selectedIndex=i;}}
if(dti&&dt)dti.value=dt;
form.addEventListener('submit',function(ev){ev.preventDefault();
var data=new FormData(form);
function done(){var ok=document.getElementById('form-ok');if(ok){ok.style.display='block';ok.scrollIntoView({behavior:'smooth',block:'center'});}form.reset();}
function fallback(){var lines=[];data.forEach(function(v,k){if(k.charAt(0)!=='_')lines.push(k+': '+v);});
 location.href='mailto:Dan@DanBenoit.com?subject='+encodeURIComponent('Website inquiry - Dan Benoit Photo')+'&body='+encodeURIComponent(lines.join(NL));done();}
var obj={};data.forEach(function(v,k){obj[k]=v;});
 fetch('https://formsubmit.co/ajax/Dan@DanBenoit.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(obj)}).then(function(r){if(r.ok)done();else fallback();}).catch(fallback);
});})();

