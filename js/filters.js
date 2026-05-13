function uniq(k){return[...new Set(all.map(r=>r[k]).filter(v=>v&&v!=='—'))].sort();}
function fillSel(id,vals){const s=document.getElementById(id),c=s.value;while(s.options.length>1)s.remove(1);vals.forEach(v=>{const o=new Option(v,v);s.add(o);});if(c)s.value=c;}
function fillSels(){fillSel('f-s',uniq('st'));fillSel('f-p',uniq('prio'));fillSel('f-r',uniq('resp'));fillSel('sf-m',uniq('maq'));fillSel('sf-v',uniq('serv'));}

function go(){
  const fs=document.getElementById('f-s').value,fp=document.getElementById('f-p').value,
        fr=document.getElementById('f-r').value,fm=document.getElementById('sf-m').value,
        fv=document.getElementById('sf-v').value,ft=document.getElementById('sf-t').value;
  fil=all.filter(r=>(!fs||r.st===fs)&&(!fp||r.prio===fp)&&(!fr||r.resp===fr)&&(!fm||r.maq===fm)&&(!fv||r.serv===fv)&&(!ft||r.tipo===ft));
  draw();
}

function draw(){kpis();tbl();charts();}
function p(n,t){return t?Math.round(n/t*100):0;}
function $s(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
