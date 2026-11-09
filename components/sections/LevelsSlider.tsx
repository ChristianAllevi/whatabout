"use client";

import Image from "next/image";
import { useRef } from "react";

type Level = {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  bg: string;
  titleColor: string;
  subtitleColor: string;
  textColor: string;
};

const levels: Level[] = [
  {
    id: 1,
    title: "Livello I",
    subtitle: "Il rompighiaccio",
    text: "Leggerezza, ricordi divertenti, situazioni assurde: riconoscere se stessi attraverso gli occhi degli altri e quello che avete vissuto insieme fino ad oggi.",
    bg: "#5FF4D4",
    titleColor: "#1D2855",
    subtitleColor: "#FFFFFF",
    textColor: "#1D2855",
  },
  {
    id: 2,
    title: "Livello II",
    subtitle: "Il confronto",
    text: "Sarà l’occasione per condividere opinioni, aspettative e dinamiche che non avevate il coraggio o non avete ancora avuto modo di affrontare.",
    bg: "#214BFF",
    titleColor: "#5FF4D4",
    subtitleColor: "#FFFFFF",
    textColor: "#FFFFFF",
  },
  {
    id: 3,
    title: "Livello III",
    subtitle: "L’accettazione",
    text: "Riscopri il vostro legame: spunti e argomenti per parlare dei vostri desideri e per chiudere il gioco con l’obiettivo di sentirsi più vicini che mai.",
    bg: "#1D2855",
    titleColor: "#214BFF",
    subtitleColor: "#FFFFFF",
    textColor: "#FFFFFF",
  },
  {
    id: 4,
    title: "Bonus",
    subtitle: "Challenge finale",
    text: "I mattoncini d’oro si estraggono a gioco finito. Piccole challenge per consolidare i legami, momenti che restano, anche dopo che la torre è crollata.",
    bg: "#FF2EB3",
    titleColor: "#FFF8E6",
    subtitleColor: "#FFFFFF",
    textColor: "#1D2855",
  },
];

const displayFont = { fontFamily: "DX Playhigh Expanded" } as const;

export default function LevelsSlider() {
  const trackRef = useRef<HTMLUListElement>(null);

  const drag = useRef<{ x: number; left: number } | null>(null);

  // Touch: scroll nativo. Mouse: drag con il puntatore.
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };

  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current) return;
    drag.current = null;
    el.releasePointerCapture(e.pointerId);
    el.style.scrollSnapType = "";
    el.style.cursor = "";
  };

  return (
    <div>
      <ul
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
        aria-label="I livelli del gioco"
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-pl-5 md:scroll-pl-[159px] pl-5 md:pl-[159px] pr-5 pb-1 cursor-grab select-none[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {levels.map((lv) => (
          <li
            key={lv.id}
            className="snap-start shrink-0 w-[min(347px,78vw)] md:w-[347px] list-none"
          >
            <article
              className="relative overflow-hidden rounded-card aspect-[347/400] p-5 flex flex-col justify-between"
              style={{ backgroundColor: lv.bg }}
            >
              <Image
                src={`/images/livelli/mattoncino-${lv.id}.png`}
                alt=""
                width={867}
                height={837}
                className="absolute max-w-none h-auto pointer-events-none select-none"
                style={{ left: "42.5%", top: "14.7%", width: "81.6%" }}
              />
              <Image
                src={`/images/livelli/lv${lv.id}.png`}
                alt={`Livello ${lv.id} della torre`}
                width={126}
                height={283}
                className="absolute right-5 top-[22px] w-[38px] h-auto pointer-events-none select-none"
              />

              <div className="relative z-10 uppercase" style={displayFont}>
                <h3 className="text-[44px] leading-[0.95]" style={{ color: lv.titleColor }}>
                  {lv.title}
                </h3>
                <p className="mt-3 text-[28px] leading-[0.95]" style={{ color: lv.subtitleColor }}>
                  {lv.subtitle}
                </p>
              </div>

              <p
                className="relative z-10 font-body font-light text-[16px] leading-5"
                style={{ color: lv.textColor }}
              >
                {lv.text}
              </p>
            </article>
          </li>
        ))}
      </ul>

    </div>
  );
}
