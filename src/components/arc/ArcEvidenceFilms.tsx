"use client";

import type { TourFilm } from "@/content/tours/types";
import { TourVideo } from "@/components/case/ProductMedia";

export function ArcEvidenceFilms({ films }: { films: TourFilm[] }) {
  return (
    <details
      onToggle={(event) => {
        if (!event.currentTarget.open)
          event.currentTarget
            .querySelectorAll("video")
            .forEach((video) => video.pause());
      }}
    >
      <summary>
        Watch this workflow in Arc <span aria-hidden="true">↗</span>
      </summary>
      {films.map((film) => (
        <TourVideo key={film.id} film={film} />
      ))}
    </details>
  );
}
