import {notFound} from "next/navigation";
import {ConsoleSection} from "@/components/console/sections";
import {ConsoleExtraSection} from "@/components/console/studio-extras";
import {ChatArchive} from "@/components/console/chat-archive";
export const dynamic="force-dynamic";
const known=new Set(["leads","clients","projects","tickets","documents","content","finance","websites","appointments","automation","settings","tasks","briefs","privacy","experiments","status","referrals","conversations"]);
export default async function AdminSection({params,searchParams}:{params:Promise<{section:string}>;searchParams:Promise<{page?:string;q?:string}>}){const {section}=await params;if(!known.has(section))notFound();if(section==="conversations"){const qs=await searchParams;const n=Number(qs.page||"1");return <ChatArchive page={Number.isFinite(n)?Math.min(1000,Math.max(1,Math.floor(n))):1} query={qs.q||""}/>;}return ["tasks","briefs","privacy","experiments","status","referrals"].includes(section)?<ConsoleExtraSection section={section}/>:<ConsoleSection section={section}/>;}
