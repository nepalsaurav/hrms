import{B as r}from"./BreadCrumb-TF3kDMJB.js";import{c as m,d as a,a as e,w as s,u as c,o as d,e as l,R as i}from"./index-C7IYLqTz.js";import{L as p}from"./ListDisplay-DyhM4usD.js";import{_}from"./Status-B1a2wo_k.js";import"./LoadingSkeleton-DhLAkGpz.js";import"./forms-uoaoRhcW.js";import"./index.esm-CWnM2rkH.js";import"./sweetalert2.esm.all-DPo3DB14.js";import"./index-Cfw59jWj.js";const u={type:"time",value:"09:45:00"},h={check_in_time:u},f={class:"container"},b={class:"card"},k={class:"card-content"},x={class:"is-flex is-flex-direction-row-reverse"},y={class:"mt"},H={__name:"Attendance",setup(v){console.log(h);const n=[{name:"employee",label:"Employee",type:"expand",isCombinedField:!0,expandCollection:"employee",fields:["first_name","middle_name","last_name"]},{name:"date",label:"Date",type:"date"},{name:"check_in_time",label:"Check In",type:"text"},{name:"check_out_time",label:"Check Out",type:"text"},{name:"status",label:"Status",type:"custom_component",component:_}],o=[{name:"text_search",label:"Search",type:"text_search",fields:["employee.first_name","employee.middle_name","employee.last_name","date","check_in_time","check_out_time","status"],placeholder:"search"}];return(C,t)=>(d(),m("div",f,[a(r,{links:[{path:"/",label:"Dashboard",isActive:!1},{path:"/attendance",label:"Attendance",isActive:!0}]}),e("div",b,[e("div",k,[e("div",x,[a(c(i),{to:"/attendance/checkout",class:"button is-danger ml-2"},{default:s(()=>t[0]||(t[0]=[e("i",{class:"bi bi-plus-circle px-1"},null,-1),l("Check Out ")])),_:1}),a(c(i),{to:"/attendance/checkin",class:"button is-dark"},{default:s(()=>t[1]||(t[1]=[e("i",{class:"bi bi-plus-circle px-1"},null,-1),l("Check In ")])),_:1})]),e("div",y,[a(p,{listHeader:n,filter:o,expand:"employee",collection:"check_in"})])])])]))}};export{H as default};
