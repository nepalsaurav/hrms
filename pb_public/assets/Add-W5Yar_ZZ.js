import{r as m,c as r,b as p,a,F as d,f as u,g as x,o as l,n as _,t as k,h as A,v as E,u as F,j,k as B}from"./index-DhUzF4e6.js";import{t as C,v as T,g as I,f as b,a as N}from"./forms-Lc3CRwVw.js";import{B as O}from"./BreadCrumb-QusY3eB5.js";import{S as h}from"./sweetalert2.esm.all-CIewtpap.js";import"./index.esm-DyswK6GF.js";const P={class:"container"},R={class:"card"},V={class:"card-content"},z={class:"tabs"},J=["onClick"],L={class:"columns is-multiline"},Q={__name:"Add",setup(M){const y=B(),f=m([{name:"personal_details",label:"Personal Details"},{name:"contact_details",label:"Contact Details"},{name:"job_details",label:"Job Details"},{name:"payroll_and_benifits",label:"Payroll and Benefits"},{name:"insurance_information",label:"Insurance Information"},{name:"additional_information",label:"Additional Information"}]),n=m("personal_details"),v=m({});function g(i){n.value=i}async function S(i){i.preventDefault();const o=i.target,t=new FormData(o);let e=Object.fromEntries(t.entries());const D=[e.first_name,e.middle_name,e.last_name].filter(s=>s!=="").join(" ");t.append("full_name",D),e=C(e);const c=await T(e,N);if(c!=!0){v.value=c;const s=I(n.value,b,c);s!=null&&(n.value=s);return}try{const s=await x.collection("employee").create(e);h.fire({title:"Success!",text:"Successfully create employee",icon:"success"}),y.push("/employee")}catch(s){const w=s.data.message;h.fire({title:"Error!",text:w,icon:"error"})}}return(i,o)=>(l(),r("div",P,[p(O,{links:[{label:"Dashboard",path:"/",isActive:!1},{label:"Employee",path:"/employee",isActive:!1},{label:"Add",path:"/employee/add",isActive:!0}]}),a("div",R,[a("div",V,[a("form",{novalidate:"",onSubmit:S},[o[0]||(o[0]=a("legend",{class:"has-text-weight-bold"},"Add Employee",-1)),o[1]||(o[1]=a("div",{class:"is-flex is-flex-direction-row-reverse"},[a("button",{class:"button is-dark",type:"submit"}," Save ")],-1)),a("div",z,[a("ul",null,[(l(!0),r(d,null,u(f.value,t=>(l(),r("li",{class:_(t.name===n.value&&"is-active")},[a("a",{onClick:e=>g(t.name)},k(t.label),9,J)],2))),256))])]),(l(!0),r(d,null,u(f.value,t=>(l(),r("div",null,[A(a("div",L,[(l(!0),r(d,null,u(F(b)[t.name],e=>(l(),r("div",{class:_(["column",e.type==="rich_text"?"is-12":"is-4"])},[p(j,{form:e,errors:v.value},null,8,["form","errors"])],2))),256))],512),[[E,t.name===n.value]])]))),256))],32)])])]))}};export{Q as default};
