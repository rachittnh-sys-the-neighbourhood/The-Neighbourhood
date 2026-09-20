/**
 * Reusable byline strip for content pages — author, reviewer, source and
 * last-updated date. Every field is optional and simply omitted when not
 * supplied, rather than defaulted to a placeholder name: per this
 * project's own editorial rule (see /editorial-policy), a Person is only
 * ever named here when a real one exists. A page with no named author or
 * reviewer yet — most of them, today — just shows source and date.
 */
export default function ContentPageMeta({
  author,
  reviewer,
  source,
  lastUpdated,
  className = "",
}) {
  const hasAnything = author || reviewer || source || lastUpdated;
  if (!hasAnything) return null;

  return (
    <div
      className={`flex flex-col gap-xs border-y border-lavender-mist py-md text-center ${className}`}
    >
      {author && (
        <p className="type-caption font-normal text-slate-blue">
          Written by <span className="text-deep-purple">{author}</span>
        </p>
      )}
      {reviewer && (
        <p className="type-caption font-normal text-slate-blue">
          Reviewed by <span className="text-deep-purple">{reviewer}</span>
        </p>
      )}
      {source && <p className="type-caption font-normal text-slate-blue">{source}</p>}
      {lastUpdated && (
        <p className="type-caption font-normal text-slate-blue">
          Last updated{" "}
          <time dateTime={lastUpdated}>
            {new Date(lastUpdated).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>
      )}
    </div>
  );
}
