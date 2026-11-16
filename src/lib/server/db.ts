import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
const globalDb=globalThis as unknown as { prisma?:PrismaClient };
export function databaseConfigured(){return Boolean(process.env.DATABASE_URL);}
export function getDb():PrismaClient{
 if(!databaseConfigured())throw new Error("DATABASE_URL is not configured");
 if(!globalDb.prisma){
  const adapter=new PrismaPg({connectionString:process.env.DATABASE_URL!,max:5,connectionTimeoutMillis:5000});
  globalDb.prisma=new PrismaClient({adapter,log:process.env.NODE_ENV==="development"?["warn","error"]:["error"]});
 }
 return globalDb.prisma;
}
