"use client"; // it remembers whether the form was sent (useState), so it runs in the browser

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return sent ? (
    // After "sending", we swap the form for a thank-you message
    <div className="rounded-2xl bg-sand p-8">
      <p className="font-display text-2xl">Message sent.</p>
      <p className="mt-2 text-sm text-forest/80">We reply within one working day.</p>
    </div>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // stop the browser from reloading the page
        // DEMO ONLY: a real site would send the data to a backend or email service here.
        setSent(true);
      }}
      className="space-y-4"
    >
      {/* "required" makes the browser check the field for us, no extra code */}
      <input required name="name" placeholder="Your name" className="w-full rounded-xl border border-forest/30 bg-transparent px-4 py-3 text-sm outline-none focus:border-forest" />
      <input required type="email" name="email" placeholder="Email address" className="w-full rounded-xl border border-forest/30 bg-transparent px-4 py-3 text-sm outline-none focus:border-forest" />
      <textarea required name="message" rows={5} placeholder="How can we help?" className="w-full rounded-xl border border-forest/30 bg-transparent px-4 py-3 text-sm outline-none focus:border-forest" />
      <button className="rounded-full bg-forest px-6 py-3 text-sm text-cream hover:bg-forest/90">
        Send message
      </button>
    </form>
  );
}
