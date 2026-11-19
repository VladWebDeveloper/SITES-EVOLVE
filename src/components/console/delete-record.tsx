"use client";
export default function DeleteRecordButton({label="Delete"}:{label?:string}){
 return <button type="submit" className="small-link" style={{color:"var(--color-error, #b42318)"}} onClick={event=>{if(!window.confirm("Permanently delete this record? This cannot be undone from the CRM."))event.preventDefault()}}>{label}</button>;
}