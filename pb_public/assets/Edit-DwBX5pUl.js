import{B as L,c as f}from"./BreadCrumb-DXLpQOAS.js";import{r,i as V,p as A,c as n,d as v,k as h,a as l,t as y,u as w,F as k,f as B,o as i,n as $,l as R,h as N}from"./index-7R5MiFNN.js";import{L as I}from"./LoadingSkeleton-BnsbOEAN.js";import{c as C,t as P,b as T}from"./utils-03Ebcb7A.js";import{S as q}from"./sweetalert2.esm.all-CIewtpap.js";import{R as z}from"./RenderForms-DhWJMHO2.js";import"./_commonjsHelpers-CqkleIqs.js";const K={key:0,class:"mt-4"},G={key:1},H={class:"card mt-3"},J={class:"card-content"},M={class:"has-text-weight-bold"},Q={class:"columns is-multiline"},U={key:2,class:"mt-4"},W={class:"has-text-danger"},oe={__name:"Edit",setup(X){const p=r(!1),c=r(null),u=r(null),t=R(),S=N(),b=r([]),_=r({}),o=r(null);V(()=>[t.params.id,t.params.query],D,{immediate:!0}),A(()=>{const a=[{label:"Dashboard",path:"/",isActive:!1},{label:"Settings",path:"/settings/collection/users",isActive:!1},{label:C(t.params.id),path:`/settings/collection/${t.params.id}`,isActive:!1},{label:"Edit",path:`/settings/collection/${t.params.id}/add`,isActive:!0}];b.value=a});async function D(){c.value=u.value=null,p.value=!0;try{const a=await f.send(`/api/get_collection/${t.params.id}`);c.value=a.collection;const s=await f.collection(t.params.id).getOne(t.params.collectionID);o.value=s}catch{u.value="something bad occured"}finally{p.value=!1}}function E(a){let s=a.map(e=>(e.label=C(e.name),e.placeholder=e.name,e.type==="relation"&&(e.type="relational_field_select",e.collection=e.name,e.labelField="name",e.firstOption=`select ${e.name}`),e));return s=s.filter(e=>{if(e.name!=="tokenKey"&&e.type!=="autodate"&&e.name!=="id")return e}),t.params.id==="users"&&s.splice(1,0,{name:"passwordConfirm",label:"Password Confirm",type:"password",placeholder:"password confirm"}),s}async function O(a){a.preventDefault();const s=a.target,e=new FormData(s);let d=Object.fromEntries(e.entries());d=P(d),console.log(Object.fromEntries(d.entries()));try{const m=await f.collection(t.params.id).update(t.params.collectionID,d);console.log(m),q.fire({title:"Success!",text:"successfully updated",icon:"success"}),S.push(`/settings/collection/${t.params.id}`)}catch(m){if(m.data.data){const g={};Object.entries(m.data.data).forEach(([F,j])=>{g[F]=j.message}),_.value=g}}}function x(a){return console.log(a.name,o.value),o.value&&o.value[a.name]!==void 0?o.value[a.name]:""}return(a,s)=>(i(),n(k,null,[v(L,{links:b.value},null,8,["links"]),p.value?(i(),n("div",K,[v(I)])):h("",!0),c.value!==null&&o.value!=null?(i(),n("div",G,[l("div",H,[l("div",J,[l("form",{novalidate:"",onSubmit:O},[l("legend",M," Add "+y(w(T)(w(t).params.id)),1),s[0]||(s[0]=l("div",{class:"is-flex is-flex-direction-row-reverse"},[l("button",{class:"button is-dark",type:"submit"}," Save ")],-1)),l("div",Q,[(i(!0),n(k,null,B(E(c.value.fields),e=>(i(),n("div",{class:$(["column",e.type==="editor"?"is-12":"is-4"])},[v(z,{form:e,errors:_.value,defaultValue:x(e)},null,8,["form","errors","defaultValue"])],2))),256))])],32)])])])):h("",!0),u.value!==null?(i(),n("div",U,[l("p",W,y(u.value),1)])):h("",!0)],64))}};export{oe as default};
