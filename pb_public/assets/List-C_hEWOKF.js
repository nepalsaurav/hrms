import{c as B,B as j}from"./BreadCrumb-DXLpQOAS.js";import{_ as P,r as c,b as Q,i as T,p as V,o as e,c as t,d as x,k as v,a as s,t as m,e as R,g as N,u as p,F as g,f as $,q as H,n as J,l as I,h as K,w as W,R as X}from"./index-7R5MiFNN.js";import{L as M}from"./LoadingSkeleton-BnsbOEAN.js";import{c as O,a as Z,b as ee}from"./utils-03Ebcb7A.js";import{v as te}from"./index-DDdb-4WH.js";import{S as k}from"./sweetalert2.esm.all-CIewtpap.js";import{_ as ae}from"./Avatar-CUvU5epV.js";const le={key:0},se={key:1},ne={key:0,class:"box"},oe={class:"is-flex"},ie={class:"has-text-weight-bold"},ce={class:"scroll-div"},re={key:0,class:"table is-fullwidth is-striped"},ue=["checked","indeterminate"],de={key:0},ve=["value"],me=["onClick"],pe={key:0},fe={key:1},he={key:2},_e={key:3},ge={key:4},ye={key:1,class:"mt-3 has-text-weight-bold"},ke={key:2},xe={class:"has-text-danger"},be={__name:"GenericList",props:{schema:Object,expand:{type:String,default:""},expandLabel:{type:String,default:""}},setup(D){const r=D,f=c(!0),u=c(null),i=c(null),n=c([]),b=I(),h=K(),y=c(!1),_=c([]),w=c(1),S=c(""),z=c("-created");async function A(o=1,d="-created",a="",l=!1){i.value=null,l||(f.value=!0);try{const C=r.schema.name,L=await B.collection(C).getList(o,50,{sort:d,filter:a,expand:r.expand});u.value=L,l?_.value.push(...L.items):_.value=L.items}catch(C){i.value=C.data.message}finally{l||(f.value=!1)}}function F(){w.value<u.value.totalPages&&(w.value+=1,y.value=!0)}Q(()=>{E(b.query)}),T(()=>b.query,(o,d)=>{E(o)},{immediate:!0}),V(()=>{A(w.value,z.value,S.value,y.value)});function E(o){o.filter!==void 0&&(S.value=o.filter,w.value=1,y.value=!1)}function q(o){return!o.hidden&&o.name!="id"}function G(o){o.target.checked?n.value=_.value:n.value=[]}async function U(){if(!(await k.fire({title:"Are you sure want to delete?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#171717",cancelButtonColor:"#808080",confirmButtonText:"Yes, delete it!"})).isConfirmed||n.value.length===0)return;const d=B.createBatch();n.value.forEach((a,l)=>{d.collection(r.schema.name).delete(a.id)}),k.fire({title:"Data is deleting ...",allowOutsideClick:!1,didOpen:()=>{k.showLoading()}});try{await d.send(),A(),n.value=[],k.close()}catch(a){k.close(),k.fire({title:"Error!",text:a.data.message,icon:"error"}),n.value=[]}}function Y(o){h.push(`${b.path}/edit/${o.id}`)}return(o,d)=>(e(),t(g,null,[f.value&&u.value===null?(e(),t("div",le,[x(M)])):v("",!0),u.value!==null?(e(),t("div",se,[n.value.length>0?(e(),t("div",ne,[s("div",oe,[s("p",ie,m(n.value.length)+" selected out of "+m(_.value.length),1),s("button",{class:"button is-danger is-small ml-4",onClick:U},d[1]||(d[1]=[s("i",{class:"bi bi-archive pr-1"},null,-1),R(" Delete ")]))])])):v("",!0),N((e(),t("div",ce,[u.value.items.length>0?(e(),t("table",re,[s("thead",null,[s("tr",null,[s("th",null,[s("input",{class:"custom-checkbox",onClick:G,type:"checkbox",checked:n.value.length===_.value.length,indeterminate:n.value.length>0&&n.value.length<_.value.length},null,8,ue)]),(e(!0),t(g,null,$(r.schema.fields,a=>(e(),t(g,{key:a.name},[q(a)?(e(),t("th",de,m(p(O)(a.name)),1)):v("",!0)],64))),128))])]),s("tbody",null,[(e(!0),t(g,null,$(_.value,a=>(e(),t("tr",null,[s("td",null,[N(s("input",{"onUpdate:modelValue":d[0]||(d[0]=l=>n.value=l),value:a,class:"custom-checkbox",type:"checkbox"},null,8,ve),[[H,n.value]])]),(e(!0),t(g,null,$(r.schema.fields,(l,C)=>(e(),t(g,null,[q(l)?(e(),t("td",{key:0,onClick:L=>Y(a),class:"edit-data"},[l.type==="autodate"?(e(),t("span",pe,m(p(Z)(a[l.name])),1)):l.type==="bool"?(e(),t("span",fe,[s("span",{class:J(["tag",a[l.name]===!0?"is-info":"is-danger"])},m(a[l.name]),3)])):l.type==="relation"&&r.expand!==""&&r.expandLabel!=""?(e(),t("span",he,m(a.expand[l.name][r.expandLabel]),1)):l.name==="avatar"?(e(),t("span",_e,[x(ae,{filename:a[l.name],record:a,size:"64x64"},null,8,["filename","record"])])):(e(),t("span",ge,m(a[l.name]),1))],8,me)):v("",!0)],64))),256))]))),256))])])):v("",!0)])),[[p(te),F]]),u.value.items.length===0?(e(),t("p",ye," no any data to show ")):v("",!0)])):v("",!0),i.value!==null?(e(),t("div",ke,[s("p",xe,m(i.value),1)])):v("",!0)],64))}},we=P(be,[["__scopeId","data-v-98d17e35"]]),Ce={key:0,class:"mt-4"},Le={key:1},$e={class:"is-flex is-flex-direction-row-reverse"},Be={class:"card mt-3"},De={class:"card-content"},Se={key:2,class:"mt-4"},Ae={class:"has-text-danger"},Me={__name:"List",setup(D){const r=c(!1),f=c(null),u=c(null),i=I(),n=c([]);V(()=>{const h=[{label:"Dashboard",path:"/",isActive:!1},{label:"Settings",path:"/settings/collection/users",isActive:!1},{label:O(i.params.id),path:`/settings/collection/${i.params.id}`,isActive:!0}];n.value=h}),T(()=>[i.params.id,i.query],b,{immediate:!0});async function b(){f.value=u.value=null,r.value=!0;try{const h=await B.send(`/api/get_collection/${i.params.id}`);f.value=h.collection}catch{u.value="something bad occured"}finally{r.value=!1}}return(h,y)=>(e(),t(g,null,[x(j,{links:n.value},null,8,["links"]),r.value?(e(),t("div",Ce,[x(M)])):v("",!0),f.value!==null?(e(),t("div",Le,[s("div",$e,[x(p(X),{to:`/settings/collection/${p(i).params.id}/add`,class:"button is-dark"},{default:W(()=>[y[0]||(y[0]=s("i",{class:"bi bi-plus-circle px-1"},null,-1)),R(" Add "+m(p(ee)(p(i).params.id)),1)]),_:1},8,["to"])]),s("div",Be,[s("div",De,[x(we,{schema:f.value,expand:p(i).query.expand,expandLabel:p(i).query.expand_label},null,8,["schema","expand","expandLabel"])])])])):v("",!0),u.value!==null?(e(),t("div",Se,[s("p",Ae,m(u.value),1)])):v("",!0)],64))}};export{Me as default};