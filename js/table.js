

function tbl(){
  const tb=document.getElementById('tb');let td=0;
  if(!fil.length){tb.innerHTML='<tr><td colspan="10" style="text-align:center;padding:22px;color:#888;font-style:italic;">Nenhum registro encontrado.</td></tr>';document.getElementById('tfd').innerHTML='<strong>0</strong>';return;}
  tb.innerHTML=fil.map(r=>{td+=r.dias||0;return`<tr><td><strong>${r.maq}</strong></td><td>${r.serv||'—'}</td><td>${r.dp}</td><td>${r.de}</td><td>${r.dent}</td><td style="text-align:center"><strong>${r.dias!=null?r.dias:'—'}</strong></td><td>${badgeSt(r.st)}</td><td>${prioSp(r.prio)}</td><td>${r.resp}</td><td style="max-width:200px;white-space:normal;font-size:10.5px;">${r.obs||''}</td></tr>`;}).join('');
  document.getElementById('tfd').innerHTML=`<strong>${td}</strong>`;
}
