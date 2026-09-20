import { useState } from "react";
import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import useScrollReveal from "../useScrollReveal.js";
import FAQS from "../../data/faqs.js";

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-lavender-mist">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-lg py-lg text-left"
      >
        <span className="type-sub-heading text-deep-purple transition-colors duration-200 group-hover:text-warm-orange">
          {item.q}
        </span>
        <span
          className={`material-symbols-outlined shrink-0 text-warm-orange transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          add
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="type-body-regular max-w-measure-xl pb-lg text-slate-blue">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <Section id="faq">
      <SectionHeading
        as="h1"
        label="Questions"
        title="You're right to ask."
        align="center"
      />

      <div
        ref={ref}
        className={`reveal ${inView ? "in-view" : ""} mx-auto mt-2xl max-w-measure-xl border-t border-lavender-mist`}
      >
        {FAQS.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </Section>
  );
}
