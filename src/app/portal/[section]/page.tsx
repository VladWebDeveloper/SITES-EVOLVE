import {notFound} from "next/navigation";
import {PortalSection} from "@/components/console/portal";
import {PortalExtraSection} from "@/components/console/portal-extras";
export const dynamic="force-dynamic";
const known=new Set(["requests","projects","tickets","documents","billing","websites","onboarding","notifications","privacy","referrals"]);
export default async function ClientSection({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!known.has(section))notFound();return ["onboarding","notifications","privacy","referrals"].includes(section)?<PortalExtraSection section={section}/>:<PortalSection section={section}/>;}
