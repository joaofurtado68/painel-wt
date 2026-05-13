function kpis(){
    const t=fil.length,ex=fil.filter(r=>r.st==='Executado').length,
          an=fil.filter(r=>['Em execução','Planejado'].includes(r.st)).length,
          at=fil.filter(r=>r.st==='Atrasado').length,
          di=fil.reduce((s,r)=>s+(r.dias||0),0),
          mq=new Set(fil.map(r=>r.maq)).size;
    $s('k0',t);$s('k1',ex);$s('k1s',p(ex,t)+'% do total');$s('k2',an);$s('k2s',p(an,t)+'% do total');
    $s('k3',at);$s('k3s',p(at,t)+'% do total');$s('k4',di);$s('k4s','Média: '+(t?(di/t).toFixed(2):'0')+' dias/OS');
    $s('dnT',t);$s('dnP',t);$s('s0',t);$s('s1',ex);$s('s2',p(ex,t)+'%');$s('s3',di);$s('s4',mq);
  }
  
  function badgeSt(s){const m={'Executado':'b-exec','Em execução':'b-and','Planejado':'b-plan','Atrasado':'b-atr','Reprogramado':'b-repr','Pendente':'b-pend','Cancelado':'b-canc'};return`<span class="badge ${m[s]||'b-plan'}">${s}</span>`;}
  function prioSp(p){const m={Urgente:'p-urg',Alta:'p-alt','Média':'p-med',Baixa:'p-bai'};return`<span class="${m[p]||''}">${p}</span>`;}
  