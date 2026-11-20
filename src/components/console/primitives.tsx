import {LocalizedText} from "@/components/console/workspace-i18n";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {readableStatus,shortDate,money} from "@/lib/server/format";
export function PageTitle({eyebrow,title,description,actions}:{eyebrow:string;title:string;description:string;actions?:React.ReactNode}){return <div className="console-heading"><div><span className="console-kicker"><LocalizedText value={eyebrow}/></span><h1><LocalizedText value={title}/><span>.</span></h1><p><LocalizedText value={description}/></p></div>{actions&&<div>{actions}</div>}</div>}
export function Metric({label,value,note,icon:Icon}:{label:string;value:string|number;note?:string;icon?:React.ComponentType<{size?:number}>}){return <div className="metric-card"><div className="metric-top"><span><LocalizedText value={label}/></span>{Icon&&<Icon size={19}/>}</div><strong>{value}</strong><small><LocalizedText value={note||"Current workspace"}/></small></div>}
export function SectionPanel({title,description,children}:{title:string;description?:string;children:React.ReactNode}){return <section className="console-panel"><div className="panel-title"><h2><LocalizedText value={title}/></h2>{description&&<p><LocalizedText value={description}/></p>}</div>{children}</section>}
export function Empty({title,description,action}:{title:string;description:string;action?:React.ReactNode}){return <div className="console-empty"><span className="empty-symbol">✳</span><strong><LocalizedText value={title}/></strong><p><LocalizedText value={description}/></p>{action}</div>}
export function Status({value}:{value:string}){return <span className={"status-tag status-"+value.toLowerCase().replaceAll("_","-")}><LocalizedText value={readableStatus(value)}/></span>}
export function DataTable({headers,rows}:{headers:string[];rows:React.ReactNode[][]}){return <div className="table-scroll"><table className="data-table"><thead><tr>{headers.map((h,i)=><th key={i} scope="col"><LocalizedText value={h}/></th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
export function SmallLink({href,children}:{href:string;children:React.ReactNode}){return <Link href={href} className="small-link">{children} <ArrowUpRight size={14}/></Link>}
export {shortDate,money,readableStatus};
