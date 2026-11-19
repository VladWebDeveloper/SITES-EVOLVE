import Link from "next/link";
import {redirect} from "next/navigation";
import {BrandLogo} from "@/components/brand/logo";
import {signIn,authReady} from "@/auth";
import {currentActor} from "@/lib/server/actor";
import {ArrowUpRight,LockKeyhole,ShieldCheck} from "lucide-react";

export const metadata={title:"Create account or sign in | SITES EVOLVE",robots:{index:false,follow:false}};
const messages={
 ro:{eyebrow:"CONT CLIENT / ACCES GRATUIT",title:"Spațiul tău.",accent:"Proiectele tale.",description:"Creează-ți gratuit contul cu Google sau autentifică-te. Portalul tău privat se deschide imediat, chiar dacă nu ai încă un proiect.",button:"Continuă cu Google",note:"Fără parolă nouă. Google îți verifică identitatea; nimeni nu îți poate vedea proiectele sau documentele.",foot:"Înapoi la site"},
 en:{eyebrow:"CLIENT ACCOUNT / FREE ACCESS",title:"Your space.",accent:"Your projects.",description:"Create your free account with Google or sign in. Your private portal is available immediately, even before you have a project.",button:"Continue with Google",note:"No new password. Google verifies your identity and your projects and files stay private.",foot:"Back to website"},
 ru:{eyebrow:"КАБИНЕТ КЛИЕНТА / БЕСПЛАТНО",title:"Ваш кабинет.",accent:"Ваши проекты.",description:"Создайте бесплатный аккаунт через Google или войдите. Личный кабинет доступен сразу, даже если у вас ещё нет проекта.",button:"Продолжить через Google",note:"Новый пароль не нужен. Google проверяет личность, а проекты и файлы остаются закрытыми.",foot:"На сайт"}
};
export default async function Login({searchParams}:{searchParams:Promise<{lang?:string}>}){
 const current=await currentActor();
 if(current)redirect("/workspace");
 const params=await searchParams;
 const locale=params.lang==="ro"||params.lang==="ru"?params.lang:"en";
 const t=messages[locale];
 return <main className="auth-screen" lang={locale}><div className="auth-card">
  <Link className="brand evolve-auth-brand" href={"/"+locale} aria-label="SITES EVOLVE public website"><BrandLogo variant="auth" priority/></Link>
  <div className="auth-symbol"><LockKeyhole size={33}/></div>
  <span className="eyebrow">{t.eyebrow}</span>
  <h1>{t.title}<br/><em>{t.accent}</em></h1>
  <p>{t.description}</p>
  {authReady()?<form action={async()=>{"use server";await signIn("google",{redirectTo:"/workspace"});}}><button type="submit" className="action action-primary auth-button">{t.button} <ArrowUpRight size={18}/></button></form>:
  <div className="setup-warning">Google sign-in is temporarily unavailable. Contact support@sitesevolve.com.</div>}
  <p className="auth-privacy-note"><ShieldCheck size={17}/>{t.note}</p>
  <Link className="text-link" href={"/"+locale}>← {t.foot}</Link>
 </div></main>;
}