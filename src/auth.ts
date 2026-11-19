import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {databaseConfigured,getDb} from "@/lib/server/db";

export const authReady=()=>Boolean(process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET && databaseConfigured());
const admins=()=>new Set((process.env.ADMIN_EMAILS||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean));

/** Only verified Google identities can register. Each new client gets a private
 * workspace immediately, without being linked to any existing customer data. */
async function provisionVerifiedGoogleUser(email:string,name:string|null):Promise<boolean>{
 const db=getDb();
 const displayName=name?.trim().slice(0,100)||email.split("@")[0];
 if(admins().has(email)){
  const existing=await db.user.findUnique({where:{email}});
  if(existing&&!existing.active)return false;
  // Do not promote an existing client implicitly: a previously assigned role
  // remains unchanged, and administrative permissions require explicit setup.
  if(existing){
   await db.user.update({where:{email},data:{name:displayName}});
  }else{
   await db.user.create({data:{email,name:displayName,role:"OWNER"}});
  }
  return true;
 }
 const person=await db.user.upsert({
  where:{email},
  update:{name:displayName},
  create:{
   email,name:displayName,role:"CLIENT",
   memberships:{create:{client:{create:{name:displayName,email}}}}
  },
  select:{id:true,active:true,role:true,memberships:{select:{id:true}}}
 });
 if(!person.active)return false;
 // Previously invited (but unassigned) verified client accounts should also
 // receive an empty personal workspace. Existing membership is never changed.
 if(person.role==="CLIENT"&&person.memberships.length===0){
  await db.client.create({data:{
   name:displayName,email,
   memberships:{create:{userId:person.id}}
  }});
 }
 return true;
}
export const {handlers,auth,signIn,signOut}=NextAuth({
 providers:authReady()?[Google({authorization:{params:{prompt:"select_account"}}})]:[],
 session:{strategy:"jwt",maxAge:12*60*60},
 pages:{signIn:"/login"},
 trustHost:process.env.AUTH_TRUST_HOST==="true" || process.env.NODE_ENV==="development",
 callbacks:{
  async signIn({user,profile}){
   const email=user.email?.trim().toLowerCase();
   if(!email||!databaseConfigured()||!authReady()||profile?.email_verified!==true)return false;
   try{return await provisionVerifiedGoogleUser(email,user.name||null)}
   catch(err){console.error("Google sign-in provisioning failed",err);return false}
  },
  async session({session}){
   if(session.user?.email)session.user.email=session.user.email.toLowerCase();
   return session;
  }
 }
});