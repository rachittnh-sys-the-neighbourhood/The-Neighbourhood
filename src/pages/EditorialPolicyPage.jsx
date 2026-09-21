import { useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/LazyWaitlistDialog.jsx";
import { Container } from "../components/ui/Section.jsx";
import AccentLabel from "../components/ui/AccentLabel.jsx";
import Seo from "../components/seo/Seo.jsx";
import ContentPageMeta from "../components/content/ContentPageMeta.jsx";

const DESCRIPTION =
  "How The Neighbourhood researches, reviews, and keeps its parenting-related content up to date, and what to do if you think something needs a closer look.";

export default function EditorialPolicyPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream-peach">
      <Seo title="Editorial policy" description={DESCRIPTION} path="/editorial-policy" />

      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-3xl">
        <Container className="py-2xl md:py-3xl">
          <div className="mx-auto max-w-measure-xl text-center">
            <AccentLabel>Editorial policy</AccentLabel>
            <h1 className="type-hero-display mt-md text-deep-purple">
              How we research, review, and update this content.
            </h1>
            <p className="type-body-large mt-lg text-slate-blue">{DESCRIPTION}</p>
          </div>

          <ContentPageMeta className="mx-auto mt-xl max-w-measure-xl" lastUpdated="2026-09-20" />

          <div className="type-body-regular mx-auto mt-3xl flex max-w-measure-xl flex-col gap-2xl text-slate-blue">
            <section>
              <h2 className="type-card-heading text-deep-purple">Where our content comes from</h2>
              <p className="mt-sm">
                Developmental milestones on this site are drawn from published frameworks —
                the World Health Organization's child growth and development standards, and
                the Indian Academy of Pediatrics' guidance — rather than from internet
                consensus or any single source's opinion. Activity ideas are built by our own
                team alongside the educators in our preschools, who work with children in
                these age bands every day.
              </p>
              <p className="mt-sm">
                {/* TODO(founders): name the specific published editions/years of the WHO and
                    IAP frameworks used, so this can cite them precisely rather than generally. */}
                We are actively working on citing the specific published editions of these
                frameworks directly on each content page; until then, this policy names the
                two organisations whose frameworks we draw from.
              </p>
            </section>

            <section>
              <h2 className="type-card-heading text-deep-purple">How content is reviewed</h2>
              <p className="mt-sm">
                Before anything goes live, it's read against the source framework it's drawn
                from and checked by someone on our team other than whoever wrote it.
              </p>
              <p className="mt-sm">
                {/* TODO(founders): describe the actual review process — who reviews, what
                    their background is (only if you want to name a real, qualified person —
                    per our own policy we won't publish a reviewer's name or credentials
                    unless you confirm them), and how a piece is signed off before publishing. */}
                TODO: founders to confirm the specific review process and any named reviewer(s)
                and their qualifications, to be added here and to each content page's byline.
              </p>
            </section>

            <section>
              <h2 className="type-card-heading text-deep-purple">Honest limits</h2>
              <p className="mt-sm">
                We are not a substitute for your paediatrician, and we say so wherever it
                matters. Where a milestone note suggests speaking to a doctor, that's a
                genuine flag from the source framework, not a way of hedging — and where we
                don't know something yet, including pricing and exact opening details for our
                physical spaces, we say that plainly instead of guessing.
              </p>
            </section>

            <section>
              <h2 className="type-card-heading text-deep-purple">Keeping content current</h2>
              <p className="mt-sm">
                {/* TODO(founders): confirm the actual review cadence (e.g. annually,
                    or whenever the source framework updates) once decided. */}
                TODO: founders to confirm how often published content is re-checked against
                its source and updated. Each content page's "Last updated" date reflects when
                it was last reviewed, not just when it was first published.
              </p>
            </section>

            <section>
              <h2 className="type-card-heading text-deep-purple">
                Something look wrong?
              </h2>
              <p className="mt-sm">
                If you spot something on this site that seems out of date or doesn't match
                what you're seeing with your own child, we'd genuinely like to know — write to{" "}
                <a
                  href="mailto:founders@theneighbourhood.co.in"
                  className="underline hover:text-warm-orange"
                >
                  founders@theneighbourhood.co.in
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
