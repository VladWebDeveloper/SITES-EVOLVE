import "server-only";
import {redirect} from "next/navigation";
import {auth,authReady} from "@/auth";
import {getDb} from "./db";
import type {User} from "@/generated/prisma/client";

export type Actor=Pick<User,"id"|"email"|"name"|"role"|"active">;
export async function currentActor():Promise<Actor|null>{
 if(!authReady())return null;
 const session=await auth();
 const email=session?.user?.email?.trim().toLowerCase();
 if(!email)return null;
 const person=await getDb().user.findUnique({where:{email},select:{id:true,email:true,name:true,role:true,active:true}});
 return person?.active?person:null;
}
export async function requireActor():Promise<Actor>{
 if(!authReady())redirect("/setup");
 const actor=await currentActor();
 if(!actor)redirect("/login");
 return actor;
}
export async function requireStaff():Promise<Actor>{
 const actor=await requireActor();
 if(actor.role!=="OWNER"&&actor.role!=="STAFF")redirect("/portal");
 return actor;
}
export async function requireClientAccess(clientId:string,actor?:Actor){
 const person=actor||await requireActor();
 if(person.role==="OWNER"||person.role==="STAFF")return person;
 const belongs=await getDb().clientMember.findUnique({where:{clientId_userId:{clientId,userId:person.id}},select:{id:true}});
 if(!belongs)throw new Error("Access denied");
 return person;
}
export async function clientIdsFor(actor:Actor){
 if(actor.role==="OWNER"||actor.role==="STAFF")return null;
 const rows=await getDb().clientMember.findMany({where:{userId:actor.id},select:{clientId:true}});
 return rows.map(x=>x.clientId);
}
