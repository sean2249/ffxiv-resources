// Mini Cactpot maths — ported from cactpot/cactpot.js (sean2249/ffxiv-resources).
const PAYOUT = {6:10000,7:36,8:720,9:360,10:80,11:252,12:108,13:72,14:54,15:180,16:72,17:180,18:119,19:36,20:306,21:1080,22:144,23:1800,24:3600};
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const LINE_NAMES = ['上排','中排','下排','左行','中行','右行','左斜','右斜'];

function remaining(board){const used=new Set(board.filter(v=>v!=null));return [1,2,3,4,5,6,7,8,9].filter(d=>!used.has(d));}

function perms(pool,k){if(k===0)return [[]];const out=[];for(let i=0;i<pool.length;i++){const rest=pool.slice(0,i).concat(pool.slice(i+1));for(const p of perms(rest,k-1))out.push([pool[i],...p]);}return out;}

function lineEV(board,line){const pool=remaining(board);const unknown=line.filter(i=>board[i]==null);const known=line.filter(i=>board[i]!=null).reduce((a,i)=>a+board[i],0);
  if(!unknown.length)return {ev:PAYOUT[known],certain:true};
  const ps=perms(pool,unknown.length);let total=0;for(const p of ps)total+=PAYOUT[known+p.reduce((a,b)=>a+b,0)];
  return {ev:total/ps.length,certain:false};}

function lineDistribution(board,idx){const line=LINES[idx];const pool=remaining(board);const unknown=line.filter(i=>board[i]==null);
  const known=line.filter(i=>board[i]!=null).reduce((a,i)=>a+board[i],0);
  const counts={};const ps=perms(pool,unknown.length);
  for(const p of ps){const s=known+p.reduce((a,b)=>a+b,0);counts[s]=(counts[s]||0)+1;}
  return Object.keys(counts).map(Number).sort((a,b)=>a-b).map(s=>({sum:s,mgp:PAYOUT[s],pct:counts[s]/ps.length*100}));}

function allLineEVs(board){return LINES.map((l,i)=>({idx:i,name:LINE_NAMES[i],...lineEV(board,l)}));}

function bestLine(board){return allLineEVs(board).reduce((a,b)=>b.ev>a.ev?b:a);}

// "Which cell should I reveal next" — average best-line EV after revealing each empty cell.
function recommendReveal(board){const pool=remaining(board);const empties=board.map((v,i)=>v==null?i:-1).filter(i=>i>=0);
  let best=null;
  for(const i of empties){let total=0;
    for(const d of pool){const b=board.slice();b[i]=d;total+=bestLine(b).ev;}
    const score=total/pool.length;
    if(!best||score>best.score)best={index:i,score};}
  return best;}

const CELL_NAMES=['左上','中上','右上','左中','正中','右中','左下','中下','右下'];

window.CactpotSolver={PAYOUT,LINES,LINE_NAMES,CELL_NAMES,allLineEVs,bestLine,lineDistribution,recommendReveal,remaining};
