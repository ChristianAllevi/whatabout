import Link from "next/link";

export default function TopBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-accent py-2 px-4 text-center">
      <p
        className="text-bg-light uppercase"
        style={{ fontFamily: "Funnel Display", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em" }}
      >
        <span className="font-bold">The What About Tower</span>
        {" "}il nostro primo prodotto in pre vendita dal 21 novembre{" "}
        <Link href="/tower" className="underline underline-offset-2 hover:opacity-80 transition-opacity font-bold">
          Iscriviti alla waiting list
        </Link>
      </p>
    </div>
  );
}
