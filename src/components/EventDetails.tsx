import { CalendarDays, MapPin } from "lucide-react";

type EventDetailsProps = { date: string; dateSuffix?: string; venue: string; mapsUrl?: string };

export function EventDetails({ date, dateSuffix, venue, mapsUrl }: EventDetailsProps) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-foreground sm:text-base">
      <p className="flex items-start gap-2.5">
        <CalendarDays aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
          <span className="whitespace-nowrap">{date}</span>
          {dateSuffix && <span className="whitespace-nowrap font-medium text-gold">{dateSuffix}</span>}
        </span>
      </p>
      <p className="flex items-start gap-2.5">
        <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        {mapsUrl ? (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 font-semibold text-gold underline decoration-gold/50 underline-offset-4 hover:text-gold-soft"
          >
            {venue}
          </a>
        ) : (
          <span className="min-w-0 font-semibold text-gold">{venue}</span>
        )}
      </p>
    </div>
  );
}
