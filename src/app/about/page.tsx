import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: "Learn more about Surina Films, our team, and our cinematic vision.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <article className="space-y-12">
        {/* Hero Section */}
        <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-red-dim)] via-[var(--ink-raised)] to-[var(--color-surface-raised)] border border-[var(--color-border)] p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-red)/10,_transparent_50%)]" />
          <h1 className="relative font-display text-4xl font-semibold tracking-tight text-[var(--color-text)] sm:text-5xl">
            Surina Films
          </h1>
          <p className="relative mt-3 font-display text-lg italic text-[var(--color-gold)] sm:text-xl">
            Watch. Feel. Inspire.
          </p>
          <p className="relative mx-auto mt-6 max-w-2xl text-sm text-[var(--color-text-muted)] sm:text-base leading-relaxed">
            Welcome to the home of Surina Monish Film Productions. We are an independent film collective dedicated to crafting stories that challenge boundaries, evoke raw human emotions, and inspire change.
          </p>
        </header>

        {/* Cinematic Vision Section */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-2xl font-semibold text-[var(--color-text)]">
              Our Cinematic Vision
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              We believe cinema is more than passive entertainment; it is an immersive, transcendent experience. From Sarat Chandra Chattopadhyay’s classic tales of complex devotion (such as <em>Charitraheen</em> and <em>Debdas</em>) to bone-chilling supernatural folklores (like <em>Rudradeb Taranath</em> and <em>Khonra Bhairabir Math</em>), our films seek to redefine how regional stories are narrated and visualized.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-2xl font-semibold text-[var(--color-text)]">
              Our Journey
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              What started as a passionate group of independent creators under Surina Monish Film Productions has evolved into a dedicated cinematic hub. Through collaborations with visionary narrators and actors like Mir Afsar Ali, Sudipta, Deep Kaizar, and others, we produce original feature films, thought-provoking shorts, and high-energy trailers designed for the modern listener and viewer.
            </p>
          </div>
        </section>

        {/* Key Collaborators & Creators */}
        <section className="space-y-6">
          <h2 className="font-display text-3xl font-semibold text-center text-[var(--color-text)]">
            Our Creative Force
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center p-6 text-center rounded-xl bg-[var(--ink-raised)] border border-[var(--color-border)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-red-dim)]/30 text-[var(--color-red)] text-2xl font-semibold mb-4">
                SM
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Surina Monish</h3>
              <p className="text-xs uppercase tracking-wider text-[var(--color-gold)] font-medium mt-1">
                Founder, Producer & Director
              </p>
              <p className="mt-3 text-xs text-[var(--color-text-muted)] leading-relaxed">
                The driving visionary behind Surina Monish Film Productions. Surina directs and curates stories focused on self-discovery, human resilience, and relationships.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 text-center rounded-xl bg-[var(--ink-raised)] border border-[var(--color-border)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] text-2xl font-semibold mb-4">
                MA
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Mir Afsar Ali</h3>
              <p className="text-xs uppercase tracking-wider text-[var(--color-gold)] font-medium mt-1">
                Director, Narrator & Actor
              </p>
              <p className="mt-3 text-xs text-[var(--color-text-muted)] leading-relaxed">
                A legendary voice and artist in the creative landscape. Mir Afsar Ali directs, performs, and narrates landmark supernatural and romantic series, bringing characters to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact info or Call to Action */}
        <footer className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 text-center space-y-4">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
            Connect With Us
          </h2>
          <p className="mx-auto max-w-xl text-sm text-[var(--color-text-muted)]">
            Have questions, press inquiries, or collaboration ideas? Drop us a line or follow our journey on social media as we continue to push the boundaries of cinematic storytelling.
          </p>
          <div className="pt-2">
            <span className="text-xs font-mono bg-[var(--color-surface-raised)] border border-[var(--color-border)] px-4 py-2 rounded-md text-[var(--color-text)]">
              info@surinafilms.example
            </span>
          </div>
        </footer>
      </article>
    </div>
  );
}
