import SectionEyebrow from "./SectionEyebrow";
import GradientButton from "../../components/GradientButton";
import GhostButton from "../../components/GhostButton";

const FinalCta = () => {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-32">
      <div className="glass-strong relative overflow-hidden rounded-3xl px-8 py-20 text-center sm:px-16 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.55_0.14_165/0.6),transparent_70%)] blur-3xl" />

          <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />
        </div>

        <div className="relative">
          <SectionEyebrow>Get started</SectionEyebrow>

          <h2 className="text-gradient mx-auto mt-4 max-w-2xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            Your next offer starts in a{" "}
            <span className="text-gradient-violet font-display italic font-normal">
              room.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-[15.5px] text-muted-foreground">
            Free forever. No credit card. Invite a friend in ten seconds.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GradientButton size="lg">
              Start Coding Free
            </GradientButton>

            <GhostButton>
              Live Demo
            </GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;