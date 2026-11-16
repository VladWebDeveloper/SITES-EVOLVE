import {handlers,authReady} from "@/auth";
import {NextRequest,NextResponse} from "next/server";
export const runtime="nodejs";
function unavailable(){return NextResponse.json({error:"Authentication requires platform setup."},{status:503,headers:{"Cache-Control":"no-store"}});}
export async function GET(request:NextRequest){if(!authReady())return unavailable();return handlers.GET(request);}
export async function POST(request:NextRequest){if(!authReady())return unavailable();return handlers.POST(request);}
