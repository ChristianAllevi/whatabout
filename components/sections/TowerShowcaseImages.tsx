import Image from "next/image";

/**
 * Torre + mano nel box crema (angolo in basso a destra).
 * Va dentro un contenitore `relative overflow-hidden`.
 * `towerTop` = distanza in px del bordo alto dell'immagine della torre dal bordo alto del box (desktop).
 */
export default function TowerShowcaseImages({ towerTop = 73 }: { towerTop?: number }) {
  return (
    <>
      <Image
        src="/images/torre-amicizia.png"
        alt="The Whatabout Tower"
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
      <div className="md:hidden relative flex flex-col items-center gap-4 pb-8 px-8">
        <Image
          src="/images/torre-amicizia.png"
          alt="The Whatabout Tower"
          width={300}
          height={300}
          className="w-[260px] h-auto"
        />
        <Image
          src="/images/mattoncino-mano.png"
          alt="Un mattoncino What About tenuto in mano"
          width={500}
          height={273}
          className="w-full max-w-[400px] h-auto"
        />
      </div>
    </>
  );
}
