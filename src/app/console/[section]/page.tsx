import {notFound} from "next/navigation";
import {ConsoleSection} from "@/components/console/sections";
import {ConsoleExtraSection} from "@/components/console/studio-extras";
export const dynamic="force-dynamic";
const known=new Set(["leads","clients","projects","tickets","documents","content","finance","websites","appointments","automation","settings","tasks","briefs","privacy","experiments","status","referrals"]);
export default async function AdminSection({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!known.has(section))notFound();return ["tasks","briefs","privacy","experiments","status","referrals"].includes(section)?<ConsoleExtraSection section={section}/>:<ConsoleSection section={section}/>;}
