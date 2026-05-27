import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { Loader2, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

// Single hard-coded admin. UI accepts username "root" / password "root".
// Internally mapped to a fixed Supabase account.
const ADMIN_USERNAME = "root";
const ADMIN_PASSWORD = "root";
const INTERNAL_EMAIL = "root@admin.local";
const INTERNAL_PASSWORD = "rootroot";

function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      toast.error("Invalid credentials");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: INTERNAL_EMAIL,
      password: INTERNAL_PASSWORD,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in");
    navigate({ to: "/" });
  };

  return (
    <div className="max-w-md mx-auto px-6 pt-24">
      <Link to="/" className="text-sm text-muted-foreground hover:text-mint">← Back home</Link>
      <h1 className="mt-6 text-4xl font-display font-bold">Admin sign in</h1>
      <p className="mt-2 text-muted-foreground text-sm">
        Restricted area. Only the site owner can sign in.
      </p>

      <form onSubmit={submit} className="mt-8 p-6 rounded-2xl bg-surface border border-border/60 flex flex-col gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            maxLength={64}
            className="mt-2 w-full bg-muted/40 border border-border/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint/60"
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            maxLength={64}
            className="mt-2 w-full bg-muted/40 border border-border/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint/60"
            required
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[image:var(--gradient-mint)] text-primary-foreground font-medium hover:shadow-[var(--shadow-glow)] transition-shadow disabled:opacity-60"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
          Sign in
        </button>
      </form>
    </div>
  );
}
