async function load(){

    console.log(document.getElementById('err'));
    console.log(document.getElementById('loading'));
    console.log(document.getElementById('ts'));

    
    document.getElementById('loading').style.display='flex';
    try{
      const url=`https://docs.google.com/spreadsheets/d/${SID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SNAME)}&headers=1`;
      const r=await fetch(url);
      if(!r.ok) throw new Error('HTTP '+r.status);
      const txt=await r.text();
      const m=txt.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);?\s*$/);
      if(!m) throw new Error('Resposta inesperada');
      const j=JSON.parse(m[1]);
      if(j.status==='error') throw new Error(j.errors?.[0]?.message||'Erro Sheets');
      const rows=j.table?.rows||[];
      all=[];
      rows.forEach(row=>{
        if(!row.c) return;
        const v=i=>(row.c[i]&&row.c[i].v!=null)?row.c[i].v:'';
        const f=i=>(row.c[i]&&row.c[i].f)?row.c[i].f:'';
        const maq=String(v(C.maq)).trim();
        if(!maq) return;
        const fd=i=>{
          const ff=f(i); if(ff) return ff;
          const rv=v(i); if(!rv) return '—';
          if(typeof rv==='string'&&rv.startsWith('Date(')){
            const p=rv.replace('Date(','').replace(')','').split(',');
            return new Date(+p[0],+p[1],+p[2]).toLocaleDateString('pt-BR');
          }
          return String(rv);
        };
        const gm=i=>{
          const ff=f(i);
          if(ff&&ff.includes('/')) return parseInt(ff.split('/')[1])-1;
          const rv=v(i);
          if(typeof rv==='string'&&rv.startsWith('Date(')) return parseInt(rv.replace('Date(','').split(',')[1]);
          return -1;
        };
        const serv=String(v(C.serv)).trim();
        all.push({
          maq, serv,
          tipo: serv.toLowerCase().includes('corretiv')?'Corretiva':'Preventiva',
          resp: String(v(C.resp)).trim()||'—',
          prio: String(v(C.prio)).trim()||'—',
          st:   String(v(C.st)).trim()||'—',
          dp:   fd(C.dp), de: fd(C.de), dent: fd(C.dent),
          dias: v(C.dias)!==''?Number(v(C.dias)):null,
          obs:  String(v(C.obs)).trim(),
          month:gm(C.dp),
        });
      });
      fillSels(); go();
      const n=new Date();
      document.getElementById('ts').textContent=n.toLocaleDateString('pt-BR')+' '+n.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      document.getElementById('err').style.display='none';
    }catch(e){
      console.error(e);
      const el=document.getElementById('err');
      el.innerHTML='⚠️ Não foi possível carregar os dados. Verifique se a planilha está pública.<br><small>'+e.message+'</small>';
      el.style.display='block';
    }finally{
      document.getElementById('loading').style.display='none';
    }
}