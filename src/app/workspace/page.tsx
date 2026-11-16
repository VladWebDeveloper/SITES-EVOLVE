import {redirect} from "next/navigation";
import {requireActor} from "@/lib/server/actor";
export default async function Workspace(){const actor=await requireActor();redirect(actor.role==="CLIENT"?"/portal":"/console");}
