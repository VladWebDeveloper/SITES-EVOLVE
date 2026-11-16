import "server-only";
import {S3Client} from "@aws-sdk/client-s3";
const keys=["R2_ACCOUNT_ID","R2_ACCESS_KEY_ID","R2_SECRET_ACCESS_KEY","R2_BUCKET"] as const;
export function storageReady(){return keys.every(k=>Boolean(process.env[k]));}
export function getStorage(){if(!storageReady())throw new Error("Private storage not configured");return {client:new S3Client({region:"auto",endpoint:"https://"+process.env.R2_ACCOUNT_ID+".r2.cloudflarestorage.com",credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID!,secretAccessKey:process.env.R2_SECRET_ACCESS_KEY!}}),bucket:process.env.R2_BUCKET!};}
