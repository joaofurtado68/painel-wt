const GR=['#1a5c2a','#2e7d32','#388e3c','#4caf50','#66bb6a','#a5d6a7'];
const PC={Urgente:'#c62828',Alta:'#e65100','Média':'#f9a825',Baixa:'#2e7d32'};

function cntBy(arr,k){return arr.reduce((a,r)=>{const v=r[k]||'—';a[v]=(a[v]||0)+1;return a;},{});}
function kill(k){if(CH[k]){CH[k].destroy();delete CH[k];}}
function mkDonut(id,labels,vals,colors){const t=vals.reduce((a,b)=>a+b,0);return new Chart(document.getElementById(id),{type:'doughnut',data:{labels,datasets:[{data:vals,backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},options:{cutout:'63%',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`  ${c.label}: ${c.raw} (${Math.round(c.raw/t*100)}%)`}}}}});}
function mkLegend(id,labels,vals,colors){const t=vals.reduce((a,b)=>a+b,0);document.getElementById(id).innerHTML=labels.map((l,i)=>`<div class="li"><div class="ld" style="background:${colors[i]}"></div>${l}<span class="lp">${vals[i]} (${Math.round(vals[i]/t*100)}%)</span></div>`).join('');}

function charts(){
  const td=cntBy(fil,'tipo'),tL=Object.keys(td),tV=Object.values(td);
  kill('T');CH.T=mkDonut('cT',tL,tV,GR);mkLegend('lgT',tL,tV,GR);

  const pd=cntBy(fil,'prio'),pO=['Urgente','Alta','Média','Baixa'].filter(p=>pd[p]),pV=pO.map(p=>pd[p]),pC=pO.map(p=>PC[p]);
  kill('P');CH.P=mkDonut('cP',pO,pV,pC);mkLegend('lgP',pO,pV,pC);

  const dm={};fil.forEach(r=>{dm[r.maq]=(dm[r.maq]||0)+(r.dias||0);});
  const dL=Object.keys(dm).sort((a,b)=>dm[b]-dm[a]);
  kill('D');CH.D=new Chart(document.getElementById('cD'),{type:'bar',data:{labels:dL,datasets:[{label:'Dias',data:dL.map(k=>dm[k]),backgroundColor:'#2e7d32',borderRadius:4}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'#e8f5e9'},ticks:{font:{size:10}}},y:{grid:{display:false},ticks:{font:{size:10}}}}}});

  const mm=cntBy(fil,'maq'),mL=Object.keys(mm).sort((a,b)=>mm[b]-mm[a]);
  kill('M');CH.M=new Chart(document.getElementById('cM'),{type:'bar',data:{labels:mL,datasets:[{label:'Ordens',data:mL.map(k=>mm[k]),backgroundColor:'#388e3c',borderRadius:4}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'#e8f5e9'},ticks:{stepSize:1,font:{size:10}}},y:{grid:{display:false},ticks:{font:{size:10}}}}}});

  const MN=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],bM=Array(12).fill(0);
  fil.forEach(r=>{if(r.month>=0)bM[r.month]++;});
  const cu=[];let ac=0;bM.forEach(v=>{ac+=v;cu.push(ac);});
  kill('E');CH.E=new Chart(document.getElementById('cE'),{type:'line',data:{labels:MN,datasets:[{label:'Acumulado',data:cu,borderColor:'#2e7d32',backgroundColor:'rgba(46,125,50,0.1)',borderWidth:2.5,pointBackgroundColor:'#2e7d32',pointRadius:4,tension:0.3,fill:true},{label:'Por Mês',data:bM,borderColor:'#f9a825',backgroundColor:'transparent',borderWidth:2,borderDash:[5,4],pointBackgroundColor:'#f9a825',pointRadius:3,tension:0.3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:{size:11},boxWidth:14}}},scales:{x:{grid:{color:'#e8f5e9'},ticks:{font:{size:10}}},y:{grid:{color:'#e8f5e9'},ticks:{font:{size:10},stepSize:1},beginAtZero:true}}}});
}
