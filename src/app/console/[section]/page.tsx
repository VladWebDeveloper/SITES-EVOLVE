import {notFound} from "next/navigation";
import {ConsoleSection} from "@/components/console/sections";
export const dynamic="force-dynamic";
const known=new Set(["leads","clients","projects","tickets","documents","content","finance","websites","appointments","automation","settings"]);
export default async function AdminSection({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!known.has(section))notFound();return <ConsoleSection section={section}/>;}
