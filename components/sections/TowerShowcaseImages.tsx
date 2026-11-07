import Image from "next/image";

/**
 * Torre + mano nel box crema (angolo in basso a destra).
 * Va dentro un contenitore `relative overflow-hidden`.
 * `towerTop` = distanza in px del bordo alto dell'immagine della torre dal bordo alto del box (desktop).
 * `showTowerOnMobile` = su mobile la torre è mostrata solo in homepage; nella pagina del prodotto c'è solo la mano.
 *
 * Mobile: composizione assoluta ancorata a destra/in basso (misure dal mockup a 400px di larghezza),
 * torre e mano tagliate dai bordi del box. Il testo del box sta sopra (z-10).
 */
export default function TowerShowcaseImages({
  towerTop = 73,
  showTowerOnMobile = true,
}: {
  towerTop?: number;
  showTowerOnMobile?: boolean;
}) {
  return (
    <>
      {/* Desktop */}
      <Image
        src="/images/torre-amicizia.png"
        alt="The What About Tower"
        width={415}
        height={415}
        className="hidden md:block absolute left-[767px] w-[415px] h-[415px] object-contain"
        style={{ top: towerTop }}
      />
      <Image
        src="/images/mattoncino-mano.png"
        alt="Un mattoncino What About tenuto in mano"
        width={622}
        height={267}
        className="hidden md:block absolute right-0 bottom-0 w-[622px] h-[267px] object-cover"
      />

      {/* Mobile */}
      {showTowerOnMobile && (
        <Image
          src="/images/torre-amicizia.png"
          alt="The What About Tower"
          width={768}
          height={768}
          className="md:hidden absolute z-0 max-w-none w-[515px] h-[515px] right-[-114px] top-[189px] pointer-events-none"
        />
      )}
      <Image
        src="/images/mattoncino-mano.png"
        alt="Un mattoncino What About tenuto in mano"
        width={1024}
        height={559}
        className="md:hidden absolute z-[1] max-w-none w-[470px] h-auto right-0 bottom-0 pointer-events-none"
      />
    </>
  );
}
