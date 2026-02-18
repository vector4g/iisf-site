"use client";

import { useState } from "react";

export default function ContactSection() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    organization: "",
    subject: "",
    message: "",
  });

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setForm({ name: "", organization: "", subject: "", message: "" });
    } catch {
      setError("We couldn’t send your message. Please try again or email us.");
    }
  };

  return (
    <section
      id="contact"
      className="border-b border-slate-800 bg-[#0b0d10] py-12"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-serif text-slate-50 opacity-0 animate-fadeIn">
          Contact the Foundation
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Use this direct line for research partnerships, ethics inquiries, or
          governance questions. Press can indicate urgency in the subject line.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 grid gap-4 md:grid-cols-2 opacity-0 animate-fadeIn"
        >
          <div>
            <label htmlFor="name" className="block text-xs text-slate-400 mb-1">
              Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="organization" className="block text-xs text-slate-400 mb-1">
              Organization
            </label>
            <input
              id="organization"
              type="text"
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              className="w-full rounded border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none"
              placeholder="Optional"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="subject" className="block text-xs text-slate-400 mb-1">
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full rounded border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none"
              placeholder="What's this about?"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-xs text-slate-400 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none"
              placeholder="Your message to the Foundation..."
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded bg-slate-100 px-5 py-2 text-sm font-medium text-[#05060a] hover:bg-slate-200"
            >
              Send Message
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-3 text-xs text-red-400">
            {error}
          </p>
        )}

        <p className="mt-4 text-xs text-slate-500">
          Prefer email? Write to{" "}
          <a
            href="mailto:board@intersectionalsafety.org"
            className="text-slate-300 underline underline-offset-2"
          >
            board@intersectionalsafety.org
          </a>
          .
        </p>
      </div>
    </section>
  );
}
