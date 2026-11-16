import { NextResponse } from "next/server";
export function GET(){return NextResponse.json({status:"ok",service:"SITES EVOLVE",version:"0.2.0"},{headers:{"Cache-Control":"no-store"}});}
