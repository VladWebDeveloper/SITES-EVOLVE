import {Mail, MessageCircle, PhoneCall, Send} from "lucide-react";
import {
  contactEmail,
  contactPhone,
  contactPhoneDisplay,
  telegramUrl,
  whatsappUrl,
  type Locale,
} from "@/lib/site";

type ContactMethodsProps = {
  locale: Locale;
  variant?: "footer" | "page";
};

const labels = {
  ro: {email: "Email",phone: "Telefon", call: "Sună", whatsapp: "WhatsApp", telegram: "Telegram"},
  en: {email: "Email",phone: "Phone", call: "Call", whatsapp: "WhatsApp", telegram: "Telegram"},
  ru: {email: "Email",phone: "Телефон", call: "Позвонить", whatsapp: "WhatsApp", telegram: "Telegram"},
} as const;

export default function ContactMethods({locale, variant = "footer"}: ContactMethodsProps) {
  const t = labels[locale];
  const methods = [
    {label: t.email, detail: contactEmail, href: `mailto:${contactEmail}`, icon: Mail, external: false},
    {label: t.phone, detail: contactPhoneDisplay, href: `tel:${contactPhone}`, icon: PhoneCall, external: false},
    {label: t.whatsapp, detail: t.call === "Sună" ? "Scrie-ne" : t.call === "Позвонить" ? "Написать" : "Message us", href: whatsappUrl, icon: MessageCircle, external: true},
    {label: t.telegram, detail: "@Goa7ik", href: telegramUrl, icon: Send, external: true},
  ];
  return (
    <div className={`contact-methods contact-methods--${variant}`} aria-label={locale === "ro" ? "Metode de contact" : locale === "ru" ? "Способы связи" : "Contact methods"}>
      {methods.map(({label, detail, href, icon: Icon, external}) => (
        <a
          key={label}
          className="contact-method-link"
          href={href}
          aria-label={`${label}: ${detail}`}
          {...(external ? {target: "_blank", rel: "noopener noreferrer"} : {})}
        >
          <span className="contact-method-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.8}/></span>
          <span className="contact-method-copy"><strong>{label}</strong><span>{detail}</span></span>
        </a>
      ))}
    </div>
  );
}
