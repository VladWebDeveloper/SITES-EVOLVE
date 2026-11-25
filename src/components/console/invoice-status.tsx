"use client";
import {useActionState} from "react";
import {saveInvoiceStatus} from "@/lib/server/actions";
import {LocalizedText} from "./workspace-i18n";

const initial={ok:false,message:""};
export function InvoiceStatusForm({id,status,simulated,legalReady}:{
 id:string;status:string;simulated:boolean;legalReady:boolean;
}){
 const [result,formAction,pending]=useActionState(saveInvoiceStatus,initial);
 const values=simulated?
  [{value:"DRAFT",label:"DRAFT"},{value:"SIMULATED_PAID",label:"PAID (simulation)"},{value:"VOID",label:"VOID"}]:
  ["DRAFT","ISSUED","PAID","OVERDUE","VOID"].map(value=>({value,label:value}));
 return <div className="invoice-status-editor">
  <form action={formAction} className="inline-status-form">
   <input type="hidden" name="id" value={id}/>
   <select name="status" defaultValue={status} key={status} aria-label="Change invoice status">
    {values.map(v=><option key={v.value} value={v.value}><LocalizedText value={v.label}/></option>)}
   </select>
   <button type="submit" disabled={pending}><LocalizedText value={pending?"Saving...":"Save"}/></button>
  </form>
  {simulated&&<small><LocalizedText value="Test record — never counted as real revenue"/></small>}
  {!simulated&&!legalReady&&<small><LocalizedText value="Configure legal billing before issuing or marking as paid"/></small>}
  {result.message&&<small role="status" aria-live="polite" style={{color:result.ok?"inherit":"#f59e85"}}>
   <LocalizedText value={result.message}/>
  </small>}
 </div>;
}
