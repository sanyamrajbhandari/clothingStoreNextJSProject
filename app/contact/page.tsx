// The CONTACT page (the "/contact" route). The folder name = the URL.
// It's a server component, and only the form (which needs state) is a client component.

import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { STORE_NAME } from "@/lib/helpers";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: `Contact us | ${STORE_NAME}` };

// Keeping the details in an array means we write the layout once and loop over it.
const DETAILS = [
  { icon: Mail, label: "Email", value: "hello@marlowe.example" },
  { icon: Phone, label: "Phone", value: "+351 21 000 0000" },
  { icon: MapPin, label: "Studio", value: "12 Weaver Lane, Lisbon, Portugal" },
  { icon: Clock, label: "Hours", value: "Mon to Fri, 9am to 6pm" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 md:grid-cols-2">
      <div>
        <h1 className="font-display text-5xl leading-tight">Questions about an order or a fit?</h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/80">
          Send us a message and a real person will reply. For alterations and returns, include
          your order number.
        </p>

        <ul className="mt-10 space-y-5">
          {DETAILS.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                <Icon size={16} />
              </span>
              <div>
                <p className="font-mono text-[10px] text-forest/60">{label}</p>
                <p className="text-sm">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ContactForm />
    </div>
  );
}
