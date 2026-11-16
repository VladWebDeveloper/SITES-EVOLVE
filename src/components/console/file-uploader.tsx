"use client";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {UploadCloud} from "lucide-react";
export default function FileUploader({clients,enabled}:{clients:{id:string;name:string}[];enabled:boolean}){
 const router=useRouter(),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 async function upload(e:React.FormEvent<HTMLFormElement>){
 e.preventDefault();if(!enabled)return;setBusy(true);setMessage("");
 const form=new FormData(e.currentTarget);
 try{const response=await fetch("/api/storage/upload",{method:"POST",body:form});
  const payload=await response.json();if(!response.ok)throw Error(payload.error||"Upload failed");
  setMessage("Document uploaded securely.");(e.target as HTMLFormElement).reset();router.refresh();
 }catch(error){setMessage(error instanceof Error?error.message:"Unable to upload");}finally{setBusy(false);}
 }
 return <div className="workspace-create"><div className="uploader-heading"><UploadCloud size={21}/><strong>Share a private document</strong></div><form onSubmit={upload} className="workspace-form"><div className="workspace-form-grid"><label className="workspace-field"><span>Client account</span><select required name="clientId" defaultValue=""><option value="" disabled>Select client</option>{clients.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label><label className="workspace-field"><span>Document (PDF, JPG, PNG, WebP or TXT, max 3 MB)</span><input type="file" name="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.txt" required/></label></div><button className="workspace-submit" type="submit" disabled={busy||!enabled}>{busy?"Uploading...":enabled?"Upload privately":"Connect private storage first"} <UploadCloud size={15}/></button>{message&&<p className="form-status" role="status">{message}</p>}</form></div>;
}
