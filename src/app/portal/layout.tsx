import {cookies} from "next/headers";
import {requireActor} from "@/lib/server/actor";
import {isLocale} from "@/lib/site";
import {WorkspaceShell} from "@/components/console/shell";
export const metadata={robots:{index:false,follow:false}};
export default async function PortalLayout({children}:{children:React.ReactNode}){const actor=await requireActor();const cookieLocale=(await cookies()).get("se-workspace-lang")?.value;
 const locale=cookieLocale&&isLocale(cookieLocale)?cookieLocale:"ro";
 return <WorkspaceShell locale={locale} area="portal" actor={{name:actor.name||actor.email,email:actor.email,role:actor.role}}>{children}</WorkspaceShell>}
