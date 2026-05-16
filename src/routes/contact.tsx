import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Eydokimos Petrakis" },
      { name: "description", content: "Get in touch with Eydokimos Petrakis for full-stack development projects." },
      { property: "og:title", content: "Contact — Eydokimos Petrakis" },
      { property: "og:description", content: "Open for new projects and collaborations." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { icon: Github, label: "GitHub", value: "github.com/eydokimos", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", value: "Eydokimos Petrakis", href: "https://linkedin.com" },
];

function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 sm:pt-24">
      <span className="text-xs uppercase tracking-widest text-mint font-medium">Contact</span>
      <h1 className="mt-3 text-5xl sm:text-7xl font-display font-bold leading-[0.95]">
        Let's build<br />something <span className="text-mint">good.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Have a project in mind, an idea you want to test, or just want to say hi?
        Pick a channel — I usually reply within a day.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group p-6 rounded-2xl bg-surface border border-border/60 hover:border-mint/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <c.icon className="w-5 h-5 text-mint" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-mint group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-6 text-sm text-muted-foreground">{c.label}</div>
            <div className="font-display text-lg font-semibold">{c.value}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
