import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient.js";
import { trackEvent } from "../../lib/analytics.js";
import Button from "../ui/Button.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import { Input, Select, Label, Hint, FieldError } from "../ui/Field.jsx";

const REFERRAL_BOOST = 3;
const CHILD_STAGES = [
  "Expecting / due soon",
  "0–3 months",
  "3–6 months",
  "6–12 months",
  "1–2 years",
  "2–3 years",
  "3–5 years",
  "Still figuring it out",
];

/**
 * Waitlist flow (Supabase insert + queue position + referral link),
 * presented in the reference design system: an Off White panel at
 * `rounded` (30px), soft-cornered controls with Lavender Mist hairlines,
 * and one amber pill as the submit action per screen.
 */
export default function WaitlistDialogV3({ open, onClose }) {
  const [mode, setMode] = useState("join"); // join | lookup
  const [joinStep, setJoinStep] = useState("child"); // child | parent
  const [childStage, setChildStage] = useState("");
  const [childName, setChildName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lookupPhone, setLookupPhone] = useState("");
  const [status, setStatus] = useState("form"); // form | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setMode("join");
      setJoinStep("child");
      setChildStage("");
      setChildName("");
      setStatus("form");
      setName("");
      setPhone("");
      setEmail("");
      setLookupPhone("");
      setErrorMessage("");
      setCopied(false);
      return;
    }
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    // Move focus into the dialog when it opens.
    window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChildStep = (e) => {
    e.preventDefault();
    if (!childStage) return;
    setErrorMessage("");
    setJoinStep("parent");
    trackEvent("waitlist_child_step_completed", { child_stage: childStage });
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || status === "loading") return;

    if (!isSupabaseConfigured) {
      setStatus("error");
      setErrorMessage("The waitlist isn't connected yet. Please try again a little later.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const params = new URLSearchParams(window.location.search);
      const refId = params.get("ref");
      const trimmedEmail = email.trim().toLowerCase();
      const signup = {
        name: name.trim(),
        phone: phone.trim(),
        email: trimmedEmail || null,
        child_stage: childStage || null,
        child_name: childName.trim() || null,
        referred_by: refId ? Number(refId) : null,
      };

      let { data: inserted, error: insertError } = await supabase
        .from("waitlist")
        .insert(signup)
        .select("id, created_at")
        .single();

      if (insertError?.code === "PGRST204" || insertError?.message?.includes("child_")) {
        const { child_stage, child_name, ...legacySignup } = signup;
        const retry = await supabase
          .from("waitlist")
          .insert(legacySignup)
          .select("id, created_at")
          .single();
        inserted = retry.data;
        insertError = retry.error;
      }

      if (insertError) {
        if (insertError.code === "23505") {
          const isPhone = insertError.message?.includes("phone");
          setStatus("error");
          setErrorMessage(
            isPhone
              ? "Good news — that phone number is already on the waitlist."
              : "Good news — that email is already on the waitlist."
          );
          return;
        }
        throw insertError;
      }

      const [{ data: position }, { data: totalSignups }] = await Promise.all([
        supabase.rpc("get_queue_position", { signup_id: inserted.id }),
        supabase.rpc("get_total_signups"),
      ]);

      setResult({
        position: position ?? 1,
        referralLink: `${window.location.origin}${window.location.pathname}?ref=${inserted.id}`,
        totalSignups: totalSignups ?? 1,
      });
      setStatus("success");
      trackEvent("waitlist_signup_completed", {
        child_stage: childStage || null,
        has_email: Boolean(trimmedEmail),
        referred: Boolean(refId),
      });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong on our side. Please try again.");
    }
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupPhone.trim() || status === "loading") return;

    if (!isSupabaseConfigured) {
      setStatus("error");
      setErrorMessage("The waitlist isn't connected yet. Please try again a little later.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const { data, error } = await supabase.rpc("find_my_spot", {
        p_phone: lookupPhone.trim(),
      });
      if (error) throw error;

      const row = data?.[0];
      if (!row) {
        setStatus("error");
        setErrorMessage("We couldn't find a signup with that number.");
        return;
      }

      setResult({
        position: row.queue_position ?? 1,
        referralLink: `${window.location.origin}${window.location.pathname}?ref=${row.id}`,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong on our side. Please try again.");
    }
  };

  const shareText =
    "I just joined the waitlist for The Neighbourhood — the village, rebuilt. Join me:";

  const handleShare = async () => {
    if (!result) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The Neighbourhood",
          text: shareText,
          url: result.referralLink,
        });
        return;
      } catch {
        // user closed the share sheet — fall through to copy
      }
    }
    await navigator.clipboard.writeText(`${shareText} ${result.referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-lg"
      role="dialog"
      aria-modal="true"
      aria-label="Join the village"
    >
      <div
        className="absolute inset-0 bg-deep-purple/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="enter-up relative max-h-full w-full max-w-measure-sm overflow-y-auto rounded-rounded border border-lavender-mist bg-off-white p-2xl shadow-subtle-lift">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-lg top-lg text-warm-orange transition-colors hover:text-deep-purple"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {status !== "success" && mode === "join" && (
          <>
            <AccentLabel className="mb-md">
              Step {joinStep === "child" ? "1" : "2"} of 2
            </AccentLabel>

            {joinStep === "child" ? (
              <>
                <h3 className="type-sub-heading text-deep-purple">
                  Start with your child.
                </h3>
                <p className="type-body-regular mt-sm text-slate-blue">
                  A little context helps us shape the village around the stage
                  your family is in.
                </p>

                <form onSubmit={handleChildStep} className="mt-lg flex flex-col gap-md">
                  <div className="flex flex-col gap-xs">
                    <Label htmlFor="waitlist-child-stage">
                      What is your child&rsquo;s age or due date?
                    </Label>
                    <Select
                      id="waitlist-child-stage"
                      ref={inputRef}
                      required
                      value={childStage}
                      onChange={(e) => setChildStage(e.target.value)}
                    >
                      <option value="">Select a stage</option>
                      {CHILD_STAGES.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <Label htmlFor="waitlist-child-name">
                      Child&rsquo;s name or nickname{" "}
                      <span className="font-normal text-slate-blue">(optional)</span>
                    </Label>
                    <Input
                      id="waitlist-child-name"
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Child's name / nickname"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Continue
                  </Button>
                </form>
              </>
            ) : (
              <>
                <h3 className="type-sub-heading text-deep-purple">
                  Save your family&rsquo;s place.
                </h3>
                <p className="type-body-regular mt-sm text-slate-blue">
                  Be one of the founding families. What we build, we build with
                  you.
                </p>

                <form onSubmit={handleSubmit} className="mt-lg flex flex-col gap-md">
                  <div className="flex flex-col gap-xs">
                    <Label htmlFor="waitlist-name">Parent name</Label>
                    <Input
                      id="waitlist-name"
                      ref={inputRef}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Parent name"
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <Label htmlFor="waitlist-phone">Phone number</Label>
                    <Input
                      id="waitlist-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                    />
                    <Hint>
                      We&rsquo;ll only use this for your waitlist spot and
                      important launch updates. No spam, no selling your number.
                    </Hint>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <Label htmlFor="waitlist-email">
                      Email{" "}
                      <span className="font-normal text-slate-blue">(optional)</span>
                    </Label>
                    <Input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>

                  {status === "error" && <FieldError>{errorMessage}</FieldError>}

                  <Hint>
                    By joining, you agree to hear from The Neighbourhood about
                    your place in the village. You can opt out anytime.
                  </Hint>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full"
                  >
                    {status === "loading" ? "Saving your place…" : "Join the Village"}
                  </Button>

                  <p className="type-caption text-center font-normal text-slate-blue">
                    By continuing, you agree to our{" "}
                    <Link to="/terms-and-conditions" className="text-deep-purple underline underline-offset-2">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy-policy" className="text-deep-purple underline underline-offset-2">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>

                <Button
                  type="button"
                  variant="quiet"
                  onClick={() => {
                    setStatus("form");
                    setErrorMessage("");
                    setJoinStep("child");
                    window.setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  className="mt-md w-full"
                >
                  Back to child details
                </Button>
              </>
            )}

            <Button
              type="button"
              variant="quiet"
              onClick={() => {
                setMode("lookup");
                setJoinStep("child");
                setErrorMessage("");
                setStatus("form");
              }}
              className="mt-sm w-full"
            >
              Already joined? Find your spot
            </Button>
          </>
        )}

        {status !== "success" && mode === "lookup" && (
          <>
            <AccentLabel className="mb-md">Welcome back</AccentLabel>

            <h3 className="type-sub-heading text-deep-purple">Find your spot.</h3>
            <p className="type-body-regular mt-sm text-slate-blue">
              Enter the phone number you joined with, and we&rsquo;ll bring back
              your place in line and your referral link.
            </p>

            <form onSubmit={handleLookup} className="mt-lg flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <Label htmlFor="waitlist-lookup-phone">Phone number</Label>
                <Input
                  id="waitlist-lookup-phone"
                  ref={inputRef}
                  type="tel"
                  required
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value)}
                  placeholder="Phone number"
                />
              </div>

              {status === "error" && <FieldError>{errorMessage}</FieldError>}

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="w-full"
              >
                {status === "loading" ? "Looking…" : "Find my spot"}
              </Button>
            </form>

            <Button
              type="button"
              variant="quiet"
              onClick={() => {
                setMode("join");
                setErrorMessage("");
                setStatus("form");
              }}
              className="mt-md w-full"
            >
              Back to join the waitlist
            </Button>
          </>
        )}

        {status === "success" && result && (
          <div className="text-center">
            <AccentLabel className="mb-md">
              {mode === "lookup" ? "Welcome back, neighbour" : "Welcome, neighbour"}
            </AccentLabel>

            <h3 className="type-section-heading text-deep-purple">
              You&rsquo;re #{result.position} in line.
            </h3>

            <p className="type-body-regular mt-sm text-slate-blue">
              Know other parents who&rsquo;d want this? Each neighbour you invite
              moves you up {REFERRAL_BOOST} places.
            </p>

            <Button size="lg" onClick={handleShare} className="mt-lg w-full">
              <span className="material-symbols-outlined" aria-hidden="true">
                share
              </span>
              {copied ? "Link copied" : "Invite your neighbours"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
