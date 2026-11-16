import {GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {NextResponse} from "next/server";
import {currentActor,requireClientAccess} from "@/lib/server/actor";
import {getDb} from "@/lib/server/db";
import {getStorage,storageReady} from "@/lib/server/storage";
import {jsonError} from "@/lib/server/security";
export const runtime="nodejs";
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){
 const actor=await currentActor();if(!actor)return jsonError("Authentication required",401);
 if(!storageReady())return jsonError("Private storage unavailable",503);
 const {id}=await params;if(!/^[a-z0-9]{15,50}$/.test(id))return jsonError("Not found",404);
 const doc=await getDb().document.findUnique({where:{id}});if(!doc)return jsonError("Not found",404);
 try{await requireClientAccess(doc.clientId,actor);}catch{return jsonError("Not found",404);}
 if(doc.visibility==="INTERNAL"&&actor.role==="CLIENT")return jsonError("Not found",404);
 const {client,bucket}=getStorage();
 const url=await getSignedUrl(client,new GetObjectCommand({Bucket:bucket,Key:doc.objectKey,ResponseContentDisposition:"attachment; filename*=UTF-8''"+encodeURIComponent(doc.filename),ResponseContentType:"application/octet-stream"}),{expiresIn:60});
 return NextResponse.redirect(url,{status:302,headers:{"Cache-Control":"no-store"}});
}
