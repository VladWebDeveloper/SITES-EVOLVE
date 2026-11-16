import {NextResponse} from "next/server";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {randomUUID} from "node:crypto";
import {currentActor} from "@/lib/server/actor";
import {getDb} from "@/lib/server/db";
import {getStorage,storageReady} from "@/lib/server/storage";
import {guardSize,jsonError} from "@/lib/server/security";
const types=new Set(["application/pdf","image/jpeg","image/png","image/webp","text/plain"]);
const MAX=3000000;
export const runtime="nodejs";
export async function POST(req:Request){
 const user=await currentActor();
 if(!user||!["OWNER","STAFF"].includes(user.role))return jsonError("Forbidden",403);
 if(!storageReady())return jsonError("Private document storage is not yet configured",503);
 if(guardSize(req,MAX+30000))return jsonError("File too large. Maximum 3 MB.",413);
 let form:FormData;try{form=await req.formData()}catch{return jsonError("Invalid upload",400)}
 const file=form.get("file"),clientId=String(form.get("clientId")||""),projectId=String(form.get("projectId")||"")||undefined;
 if(!(file instanceof File)||file.size>MAX||file.size===0||!types.has(file.type)||!/^[a-z0-9]{15,50}$/.test(clientId))return jsonError("Invalid document or account.",400);
 const account=await getDb().client.findUnique({where:{id:clientId}});if(!account)return jsonError("Client not found",404);
 if(projectId){const project=await getDb().project.findFirst({where:{id:projectId,clientId}});if(!project)return jsonError("Invalid project",400)}
 const filename=file.name.replace(/[^a-zA-Z0-9. _-]/g,"").slice(0,150)||"document";
 const objectKey="clients/"+clientId+"/"+randomUUID();
 const {client,bucket}=getStorage();
 try{
  await client.send(new PutObjectCommand({Bucket:bucket,Key:objectKey,Body:Buffer.from(await file.arrayBuffer()),ContentType:file.type,ContentDisposition:`attachment; filename="${filename.replaceAll('"',"")}"`}));
  const doc=await getDb().document.create({data:{clientId,projectId,filename,mimeType:file.type,sizeBytes:file.size,objectKey,visibility:"CLIENT"}});
  await getDb().auditEvent.create({data:{userId:user.id,action:"UPLOAD",entity:"Document",entityId:doc.id}});
  return NextResponse.json({ok:true,id:doc.id});
 }catch{console.error("Private upload failed");return jsonError("Upload failed. Try again.",502);}
}
