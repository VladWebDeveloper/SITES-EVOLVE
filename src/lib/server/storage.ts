import "server-only";
import {S3Client} from "@aws-sdk/client-s3";
const r2Keys=["R2_ACCOUNT_ID","R2_ACCESS_KEY_ID","R2_SECRET_ACCESS_KEY","R2_BUCKET"] as const;
const s3Keys=["S3_ENDPOINT","S3_REGION","S3_ACCESS_KEY_ID","S3_SECRET_ACCESS_KEY","S3_BUCKET"] as const;
const configured=(keys:readonly string[])=>keys.every(k=>Boolean(process.env[k]?.trim()));
export function storageReady(){return configured(s3Keys)||configured(r2Keys);}
export function getStorage(){
 if(configured(s3Keys)){
  const raw=process.env.S3_ENDPOINT!;
  const url=new URL(raw.startsWith("https://")?raw:"https://"+raw);
  if(url.protocol!=="https:"||url.username||url.password)throw new Error("Invalid S3 endpoint");
  return {client:new S3Client({region:process.env.S3_REGION!,endpoint:url.origin,forcePathStyle:process.env.S3_FORCE_PATH_STYLE==="true",credentials:{accessKeyId:process.env.S3_ACCESS_KEY_ID!,secretAccessKey:process.env.S3_SECRET_ACCESS_KEY!}}),bucket:process.env.S3_BUCKET!};
 }
 if(configured(r2Keys))return {client:new S3Client({region:"auto",endpoint:"https://"+process.env.R2_ACCOUNT_ID+".r2.cloudflarestorage.com",credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID!,secretAccessKey:process.env.R2_SECRET_ACCESS_KEY!}}),bucket:process.env.R2_BUCKET!};
 throw new Error("Private storage is not configured");
}
