import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { databaseConfigured, getDb } from "@/lib/server/db";

export const authReady=()=>Boolean(process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET && databaseConfigured());
const admins=()=>new Set((process.env.ADMIN_EMAILS||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean));
export const {handlers,auth,signIn,signOut}=NextAuth({
  providers:authReady()?[Google({authorization:{params:{prompt:"select_account"}}})]:[],
  session:{strategy:"jwt",maxAge:12*60*60},
  pages:{signIn:"/login"},
  trustHost:process.env.NODE_ENV==="development",
  callbacks:{
    async signIn({user,profile}){
      const email=user.email?.toLowerCase();
      if(!email || !databaseConfigured() || !authReady() || profile?.email_verified!==true)return false;
      try{
        const db=getDb();
        if(admins().has(email)){
          const existing=await db.user.findUnique({where:{email}});
          if(existing&&!existing.active)return false;
          await db.user.upsert({where:{email},update:{name:user.name||undefined},create:{email,name:user.name,role:"OWNER"}});
          return true;
        }
        const invited=await db.user.findUnique({where:{email},select:{active:true}});
        return invited?.active===true;
      }catch{return false;}
    },
    async session({session}){
      if(session.user?.email)session.user.email=session.user.email.toLowerCase();
      return session;
    }
  }
});
