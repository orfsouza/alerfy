var S={n:[],i:[]},logo='',$=function(i){return document.getElementById(i)};
function load(){try{var r=localStorage.getItem('notifsim');if(r)S=JSON.parse(r)}catch(e){}}
function save(){try{localStorage.setItem('notifsim',JSON.stringify(S))}catch(e){}}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function ico(x){return x.lg?'<img src="'+x.lg+'" alt="">':x.ic}
function tab(n){$('s1').hidden=n!==1;$('s2').hidden=n!==2;$('b1').className=n===1?'on':'';$('b2').className=n===2?'on':'';if(n===2)readAll()}
function pickLogo(el){var f=el.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){
var c=document.createElement('canvas');c.width=c.height=128;var x=c.getContext('2d'),s=Math.min(im.width,im.height);
x.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,128,128);logo=c.toDataURL('image/png');$('lp').innerHTML='<img src="'+logo+'" alt="">'};im.src=r.result};r.readAsDataURL(f)}
function clearLogo(){logo='';$('lf').value='';$('lp').textContent='🖼️'}
function add(){var t=$('ti').value.trim();if(!t){$('ti').focus();return}
var n={id:Date.now(),t:t,m:$('me').value.trim(),ic:$('ic').value,lg:logo};S.n.unshift(n);save();
var d=+$('dl').value;if(d)setTimeout(function(){fire(n.id)},d*1000);
$('ti').value='';$('me').value='';clearLogo();render()}
function del(id){S.n=S.n.filter(function(x){return x.id!==id});save();render()}
function sys(n){if(!('Notification' in window)||Notification.permission!=='granted')return;
var o={body:n.m,icon:n.lg||'icons/icon-192.png',badge:'icons/icon-192.png',vibrate:[120],tag:'n'+n.id};
if('serviceWorker' in navigator){navigator.serviceWorker.ready.then(function(r){r.showNotification(n.t,o)}).catch(function(){try{new Notification(n.t,o)}catch(e){}})}
else{try{new Notification(n.t,o)}catch(e){}}}
function fire(id){var n=S.n.filter(function(x){return x.id===id})[0];if(!n)return;
S.i.unshift({id:Date.now()+Math.random(),t:n.t,m:n.m,ic:n.ic,lg:n.lg,at:new Date().toISOString(),r:false});save();render();toast(n);sys(n);
try{navigator.vibrate&&navigator.vibrate(120)}catch(e){}}
var tm;function toast(n){$('tI').innerHTML=ico(n);$('tT').textContent=n.t;$('tM').textContent=n.m;$('toast').className='show';clearTimeout(tm);tm=setTimeout(function(){$('toast').className=''},3500)}
function perm(){try{Notification.requestPermission().then(function(p){$('pb').textContent=p==='granted'?'Alertas ativados ✓':'Permissão: '+p})}catch(e){$('pb').textContent='Indisponível neste navegador'}}
function readAll(){S.i.forEach(function(x){x.r=true});save();render()}
function clr(){S.i=[];save();render()}
function hm(s){return new Date(s).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}
function render(){
$('lst').innerHTML=S.n.length?S.n.map(function(n){return '<div class="item"><div class="ic">'+ico(n)+'</div><div class="grow"><div class="t">'+esc(n.t)+'</div><div class="m">'+esc(n.m)+'</div><div class="acts"><button class="btn s" onclick="fire('+n.id+')">Simular recebimento</button><button class="btn g s" onclick="del('+n.id+')">Excluir</button></div></div></div>'}).join(''):'<div class="empty">Nenhuma notificação cadastrada.</div>';
$('inb').innerHTML=S.i.length?S.i.map(function(x){return '<div class="item'+(x.r?'':' unread')+'"><div class="ic">'+ico(x)+'</div><div class="grow"><div class="t">'+esc(x.t)+'</div><div class="m">'+esc(x.m)+'</div></div><div class="m">'+hm(x.at)+'</div></div>'}).join(''):'<div class="empty">Nada recebido ainda.</div>';
var u=S.i.filter(function(x){return !x.r}).length;$('bg').textContent=u;$('bg').hidden=!u}
load();render();
if('serviceWorker' in navigator)window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
