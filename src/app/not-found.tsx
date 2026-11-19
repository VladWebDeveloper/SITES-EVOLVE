import Link from "next/link";
import {BrandLogo} from "@/components/brand/logo";
export default function NotFound(){
 return <main id="main" className="evolve-branded-error">
  <div><Link href="/ro" aria-label="SITES EVOLVE home" className="evolve-branded-error-logo"><BrandLogo variant="footer" priority/></Link><span>404 / PAGE NOT FOUND</span><h1>Lost in the digital universe?</h1><p>The page you requested is unavailable. Return to the studio.</p><Link href="/ro" className="evolve-branded-error-action">Back to SITES EVOLVE ↗</Link></div>
 </main>;
}
