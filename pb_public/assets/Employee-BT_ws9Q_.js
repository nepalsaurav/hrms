import{i as n,c as o,b as a,a as e,u as l,w as c,d as m,o as s,e as p,R as _}from"./index-DhUzF4e6.js";import{L as b}from"./ListDisplay-B9BmHlNl.js";import{B as u}from"./BreadCrumb-QusY3eB5.js";import"./index-Dh1WwN9N.js";import"./forms-Lc3CRwVw.js";import"./index.esm-DyswK6GF.js";import"./sweetalert2.esm.all-CIewtpap.js";const f={class:"container"},v={class:"card"},h={class:"card-content"},y={key:0,class:"is-flex is-flex-direction-row-reverse"},x={class:"mt-5"},N={__name:"Employee",setup(w){const t=n({type:"add"});let r=[{name:"full_name",label:"Full Name",type:"combined",link:!0,combinedField:["first_name","middle_name","last_name"]},{name:"gender",label:"Gender",type:"text"},{name:"date_of_birth_ad",label:"Date of birth (AD)",type:"date"},{name:"action",label:"Action",type:"action"}];const d=[{name:"text_search",label:"Search",type:"text_search",fields:["first_name","middle_name","last_name"],placeholder:"search"},{name:"gender",label:"Gender",type:"select",options:[{label:"Select Gender",value:""},{label:"Male",value:"Male"},{label:"Female",value:"Female"},{label:"Other",value:"Other"}]},{name:"marital_status",label:"Marital Status",type:"select",options:[{label:"Select Maritial Status",value:""},{label:"Single",value:"Single"},{label:"Married",value:"Married"},{label:"Divorced",value:"Divorced"},{label:"Widowed",value:"Widowed"}]},{name:"department",label:"Department",type:"relational_field_select",collection:"department",labelField:"name",firstOption:"Select Department"}];return(k,i)=>(s(),o("div",f,[a(u,{links:[{label:"Dashboard",path:"/",isActive:!1},{label:"Employee",path:"/employee",isActive:!0}]}),e("div",v,[e("div",h,[l(t)?(s(),o("div",y,[a(l(_),{to:"/employee/add",class:"button is-dark"},{default:c(()=>i[0]||(i[0]=[e("i",{class:"bi bi-plus-circle px-1"},null,-1),p("Add Employee ")])),_:1})])):m("",!0),e("div",x,[a(b,{listHeader:l(r),collection:"employee",filter:d,detailViewLink:"/employee/view",checkBoxAllowed:l(t)},null,8,["listHeader","checkBoxAllowed"])])])])]))}};export{N as default};
