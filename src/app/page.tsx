import {
  clinic,
  dentists,
  services,
  formatPrice,
  fromPrice,
} from "@/config/clinic.config";

// Phase 0 placeholder. Phase 1 (/phase-1 in Claude Code) replaces this page.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-(--container-site) flex-1 flex-col gap-10 px-6 py-24">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          Phase 0 ready
        </p>
        <h1 className="mt-3 text-4xl font-bold text-primary md:text-6xl">
          {clinic.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{clinic.tagline}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dentists.map((d) => (
          <div key={d.slug} className="rounded-(--radius-card) bg-card p-5 shadow-sm">
            <p className="font-semibold text-ink">{d.name}</p>
            <p className="text-sm text-muted">{d.role}</p>
          </div>
        ))}
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {services.map((s) => (
          <li
            key={s.slug}
            className="flex justify-between rounded-xl border border-line bg-card px-4 py-3"
          >
            <span>{s.name}</span>
            <span className="font-semibold text-primary">from {formatPrice(fromPrice(s))}</span>
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted">
        Config loaded from <code>src/config/clinic.config.ts</code>. Run{" "}
        <code>/phase-1</code> in Claude Code to build the real site.
      </p>
    </main>
  );
}
