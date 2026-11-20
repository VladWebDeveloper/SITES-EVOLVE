import Image from "next/image";

type LogoVariant = "header" | "footer" | "workspace" | "auth" | "mark" | "orb";
type Props = {variant?: LogoVariant; className?: string; priority?: boolean; decorative?: boolean};

export function BrandLogo({variant="header",className="",priority=false,decorative=false}:Props){
 const isMark=variant==="mark",isOrb=variant==="orb";
 const isFooter=variant==="footer";
 const image=isMark?{src:"/icons/icon-192.png",w:192,h:192}:isOrb?{src:"/brand/symbol-neon.png",w:1024,h:1024}:isFooter?{src:"/brand/logo-horizontal.png",w:2200,h:490}:{src:"/brand/logo-header.png",w:1700,h:490};
 const sizes=isOrb?"(max-width: 700px) 255px, (max-width: 1100px) 390px, 480px":isFooter?"(max-width: 700px) 260px, 360px":isMark?"72px":"(max-width: 700px) 170px, (max-width: 1100px) 210px, 240px";
 return <Image src={image.src} alt={decorative?"":isMark?"SITES EVOLVE symbol":"SITES EVOLVE"} width={image.w} height={image.h} sizes={sizes} priority={priority} className={"evolve-brand-logo evolve-brand-"+variant+(className?" "+className:"")} draggable={false}/>;
}
