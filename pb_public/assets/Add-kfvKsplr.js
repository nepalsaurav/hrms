import{B as O,c as b}from"./BreadCrumb-DXLpQOAS.js";import{r as i,i as j,p as B,c as o,d as p,k as f,a as r,t as g,u as y,F as k,f as E,o as l,n as $,l as D,h as R}from"./index-7R5MiFNN.js";import{L as N}from"./LoadingSkeleton-BnsbOEAN.js";import{c as w,g as T,b as V}from"./utils-03Ebcb7A.js";import{S as q}from"./sweetalert2.esm.all-CIewtpap.js";import{R as P}from"./RenderForms-DhWJMHO2.js";import"./_commonjsHelpers-CqkleIqs.js";const z={key:0,class:"mt-4"},K={key:1},G={class:"card mt-3"},H={class:"card-content"},I={class:"has-text-weight-bold"},J={class:"columns is-multiline"},M={key:2,class:"mt-4"},Q={class:"has-text-danger"},se={__name:"Add",setup(U){const u=i(!1),n=i(null),c=i(null),t=D(),C=R(),v=i([]),h=i({});j(()=>[t.params.id,t.params.query],S,{immediate:!0}),B(()=>{const a=[{label:"Dashboard",path:"/",isActive:!1},{label:"Settings",path:"/settings/collection/users",isActive:!1},{label:w(t.params.id),path:`/settings/collection/${t.params.id}`,isActive:!1},{label:"Add",path:`/settings/collection/${t.params.id}/add`,isActive:!0}];v.value=a});async function S(){n.value=c.value=null,u.value=!0;try{const a=await b.send(`/api/get_collection/${t.params.id}`);n.value=a.collection}catch{c.value="something bad occured"}finally{u.value=!1}}function x(a){let s=a.map(e=>(e.label=w(e.name),e.placeholder=e.name,e.type==="relation"&&(e.type="relational_field_select",e.collection=e.name,e.labelField="name",e.firstOption=`select ${e.name}`),e));return s=s.filter(e=>{if(e.name!=="tokenKey"&&e.type!=="autodate"&&e.name!=="id")return e}),t.params.id==="users"&&s.splice(1,0,{name:"passwordConfirm",label:"Password Confirm",type:"password",required:!0,placeholder:"password confirm"}),s}async function A(a){a.preventDefault();const s=a.target,e=new FormData(s);let m=Object.fromEntries(e.entries());m=T(m);try{const d=await b.collection(t.params.id).create(m);console.log(d),q.fire({title:"Success!",text:"successfully create",icon:"success"}),C.push(`/settings/collection/${t.params.id}`)}catch(d){if(d.data.data){const _={};Object.entries(d.data.data).forEach(([F,L])=>{_[F]=L.message}),h.value=_}}}return(a,s)=>(l(),o(k,null,[p(O,{links:v.value},null,8,["links"]),u.value?(l(),o("div",z,[p(N)])):f("",!0),n.value!==null?(l(),o("div",K,[r("div",G,[r("div",H,[r("form",{novalidate:"",onSubmit:A},[r("legend",I," Add "+g(y(V)(y(t).params.id)),1),s[0]||(s[0]=r("div",{class:"is-flex is-flex-direction-row-reverse"},[r("button",{class:"button is-dark",type:"submit"}," Save ")],-1)),r("div",J,[(l(!0),o(k,null,E(x(n.value.fields),e=>(l(),o("div",{class:$(["column",e.type==="editor"?"is-12":"is-4"])},[p(P,{form:e,errors:h.value},null,8,["form","errors"])],2))),256))])],32)])])])):f("",!0),c.value!==null?(l(),o("div",M,[r("p",Q,g(c.value),1)])):f("",!0)],64))}};export{se as default};
