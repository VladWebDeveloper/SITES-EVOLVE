import {notFound} from "next/navigation";
import {PortalSection} from "@/components/console/portal";
export const dynamic="force-dynamic";
const known=new Set(["projects","tickets","documents","billing","websites"]);
export default async function ClientSection({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!known.has(section))notFound();return <PortalSection section={section}/>;}
