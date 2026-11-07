import{X as S,O as R,aE as Y,E as tt,o as et,p as at,s as rt,g as nt,c as it,b as ot,_ as g,l as F,v as st,d as lt,F as ct,K as pt,a5 as ut,k as gt}from"./SdkDocs-N2mGN70o.js";import{p as dt}from"./chunk-4BX2VUAB-hh9sZmBQ.js";import{p as ft}from"./wardley-RL74JXVD-G1QD3D5k.js";import{d as _}from"./arc-V0-IExSI.js";import{o as mt}from"./ordinal-wXG5obU4.js";/* empty css             *//* empty css                     *//* empty css                    *//* empty css                *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                  */import"./index-WbcqHQD_.js";import"./index-zbQVoJ9T.js";import"./rainfall-h7Pf1DAF.js";import"./purify.es-VnshMA6w.js";import"./_plugin-vue_export-helper-x3n3nnut.js";import"./reduce-UNOZ6vjB.js";import"./min-NmHN3ude.js";import"./init-Hi12RPRh.js";function ht(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function vt(t){return t}function xt(){var t=vt,a=ht,f=null,y=S(0),o=S(R),d=S(0);function s(e){var n,l=(e=Y(e)).length,c,m,v=0,p=new Array(l),i=new Array(l),x=+y.apply(this,arguments),w=Math.min(R,Math.max(-R,o.apply(this,arguments)-x)),h,D=Math.min(Math.abs(w)/l,d.apply(this,arguments)),$=D*(w<0?-1:1),u;for(n=0;n<l;++n)(u=i[p[n]=n]=+t(e[n],n,e))>0&&(v+=u);for(a!=null?p.sort(function(A,C){return a(i[A],i[C])}):f!=null&&p.sort(function(A,C){return f(e[A],e[C])}),n=0,m=v?(w-l*$)/v:0;n<l;++n,x=h)c=p[n],u=i[c],h=x+(u>0?u*m:0)+$,i[c]={data:e[c],index:n,value:u,startAngle:x,endAngle:h,padAngle:D};return i}return s.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),s):t},s.sortValues=function(e){return arguments.length?(a=e,f=null,s):a},s.sort=function(e){return arguments.length?(f=e,a=null,s):f},s.startAngle=function(e){return arguments.length?(y=typeof e=="function"?e:S(+e),s):y},s.endAngle=function(e){return arguments.length?(o=typeof e=="function"?e:S(+e),s):o},s.padAngle=function(e){return arguments.length?(d=typeof e=="function"?e:S(+e),s):d},s}var V=tt.pie,W={sections:new Map,showData:!1,config:V},T=W.sections,z=W.showData,St=structuredClone(V),yt=g(()=>structuredClone(St),"getConfig"),wt=g(()=>{T=new Map,z=W.showData,st()},"clear"),At=g(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),Ct=g(()=>T,"getSections"),Dt=g(t=>{z=t},"setShowData"),$t=g(()=>z,"getShowData"),U={getConfig:yt,clear:wt,setDiagramTitle:et,getDiagramTitle:at,setAccTitle:rt,getAccTitle:nt,setAccDescription:it,getAccDescription:ot,addSection:At,getSections:Ct,setShowData:Dt,getShowData:$t},Tt=g((t,a)=>{dt(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),Et={parse:g(async t=>{const a=await ft("pie",t);F.debug(a),Tt(a,U)},"parse")},kt=g(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),bt=kt,Mt=g(t=>{const a=[...t.values()].reduce((o,d)=>o+d,0),f=[...t.entries()].map(([o,d])=>({label:o,value:d})).filter(o=>o.value/a*100>=1);return xt().value(o=>o.value).sort(null)(f)},"createPieArcs"),Rt=g((t,a,f,y)=>{var P;F.debug(`rendering pie chart
`+t);const o=y.db,d=lt(),s=ct(o.getConfig(),d.pie),e=40,n=18,l=4,c=450,m=c,v=pt(a),p=v.append("g");p.attr("transform","translate("+m/2+","+c/2+")");const{themeVariables:i}=d;let[x]=ut(i.pieOuterStrokeWidth);x??(x=2);const w=s.textPosition,h=Math.min(m,c)/2-e,D=_().innerRadius(0).outerRadius(h),$=_().innerRadius(h*w).outerRadius(h*w);p.append("circle").attr("cx",0).attr("cy",0).attr("r",h+x/2).attr("class","pieOuterCircle");const u=o.getSections(),A=Mt(u),C=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let E=0;u.forEach(r=>{E+=r});const G=A.filter(r=>(r.data.value/E*100).toFixed(0)!=="0"),k=mt(C).domain([...u.keys()]);p.selectAll("mySlices").data(G).enter().append("path").attr("d",D).attr("fill",r=>k(r.data.label)).attr("class","pieCircle"),p.selectAll("mySlices").data(G).enter().append("text").text(r=>(r.data.value/E*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice");const X=p.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText"),L=[...u.entries()].map(([r,M])=>({label:r,value:M})),b=p.selectAll(".legend").data(L).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const I=n+l,H=I*L.length/2,J=12*n,Q=M*I-H;return"translate("+J+","+Q+")"});b.append("rect").attr("width",n).attr("height",n).style("fill",r=>k(r.label)).style("stroke",r=>k(r.label)),b.append("text").attr("x",n+l).attr("y",n-l).text(r=>o.getShowData()?`${r.label} [${r.value}]`:r.label);const j=Math.max(...b.selectAll("text").nodes().map(r=>(r==null?void 0:r.getBoundingClientRect().width)??0)),K=m+e+n+l+j,N=((P=X.node())==null?void 0:P.getBoundingClientRect().width)??0,Z=m/2-N/2,q=m/2+N/2,O=Math.min(0,Z),B=Math.max(K,q)-O;v.attr("viewBox",`${O} 0 ${B} ${c}`),gt(v,c,B,s.useMaxWidth)},"draw"),Ft={draw:Rt},ee={parser:Et,db:U,renderer:Ft,styles:bt};export{ee as diagram};
