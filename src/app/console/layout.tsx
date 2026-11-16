import {requireStaff} from "@/lib/server/actor";
import {WorkspaceShell} from "@/components/console/shell";
export const metadata={robots:{index:false,follow:false}};
export default async function ConsoleLayout({children}:{children:React.ReactNode}){const actor=await requireStaff();return <WorkspaceShell area="console" actor={{name:actor.name||actor.email,email:actor.email,role:actor.role}}>{children}</WorkspaceShell>}
