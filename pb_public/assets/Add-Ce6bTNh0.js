import{r as d,c as s,d as p,a as e,F as c,f as u,o as r,n as b,t as w,g as x,v as A,u as E,h as F}from"./index-7R5MiFNN.js";import{t as k,v as B,g as C,f as _,a as j}from"./forms-CzZlnoB6.js";import{R as T}from"./RenderForms-DhWJMHO2.js";import{c as O,B as R}from"./BreadCrumb-DXLpQOAS.js";import{S as h}from"./sweetalert2.esm.all-CIewtpap.js";import"./_commonjsHelpers-CqkleIqs.js";const N={class:"card"},P={class:"card-content"},V={class:"tabs"},z=["onClick"],I={class:"columns is-multiline"},K={__name:"Add",setup(J){const y=F(),f=d([{name:"personal_details",label:"Personal Details"},{name:"contact_details",label:"Contact Details"},{name:"job_details",label:"Job Details"},{name:"payroll_and_benifits",label:"Payroll and Benefits"},{name:"additional_information",label:"Additional Information"}]),n=d("personal_details"),v=d({});function g(i){n.value=i}async function S(i){i.preventDefault();const l=i.target,a=new FormData(l);let t=Object.fromEntries(a.entries());t=k(t);const m=await B(t,j);if(m!=!0){v.value=m;const o=C(n.value,_,m);o!=null&&(n.value=o);return}try{const o=await O.collection("employee").create(t);console.log(o),h.fire({title:"Success!",text:"Successfully create employee",icon:"success"}),y.push("/employee")}catch(o){const D=o.data.message;h.fire({title:"Error!",text:D,icon:"error"})}}return(i,l)=>(r(),s(c,null,[p(R,{links:[{label:"Dashboard",path:"/",isActive:!1},{label:"Employee",path:"/employee",isActive:!1},{label:"Add",path:"/employee/add",isActive:!0}]}),e("div",N,[e("div",P,[e("form",{novalidate:"",onSubmit:S},[l[0]||(l[0]=e("legend",{class:"has-text-weight-bold"},"Add Employee",-1)),l[1]||(l[1]=e("div",{class:"is-flex is-flex-direction-row-reverse"},[e("button",{class:"button is-dark",type:"submit"},"Save")],-1)),e("div",V,[e("ul",null,[(r(!0),s(c,null,u(f.value,a=>(r(),s("li",{class:b(a.name===n.value&&"is-active")},[e("a",{onClick:t=>g(a.name)},w(a.label),9,z)],2))),256))])]),(r(!0),s(c,null,u(f.value,a=>(r(),s("div",null,[x(e("div",I,[(r(!0),s(c,null,u(E(_)[a.name],t=>(r(),s("div",{class:b(["column",t.type==="rich_text"?"is-12":"is-4"])},[p(T,{form:t,errors:v.value},null,8,["form","errors"])],2))),256))],512),[[A,a.name===n.value]])]))),256))],32)])])],64))}};export{K as default};