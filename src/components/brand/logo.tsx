import Image from "next/image";

type LogoVariant = "header" | "footer" | "workspace" | "auth" | "mark" | "orb";
type Props = {variant?: LogoVariant; className?: string; priority?: boolean; decorative?: boolean};

export function BrandLogo({variant="header",className="",priority=false,decorative=false}:Props){
 const isMark=variant==="mark",isOrb=variant==="orb";
 const isFooter=variant==="footer";
 const image=isMark?{src:"/icons/icon-192.png",w:192,h:192}:isOrb?{src:"/brand/symbol-neon.png",w:1024,h:1024}:isFooter?{src:"/brand/logo-horizontal.png",w:2200,h:490}:{src:"/brand/logo-header.png",w:1700,h:490};
 return <Image src={image.src} alt={decorative?"":isMark?"SITES EVOLVE symbol":"SITES EVOLVE"} width={image.w} height={image.h} priority={priority} className={"evolve-brand-logo evolve-brand-"+variant+(className?" "+className:"")} draggable={false}/>;
}
