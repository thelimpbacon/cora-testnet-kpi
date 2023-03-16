import Link from "next/link";
import MoonbaseAlpha from "../component/MoonbaseAlpha";

export default function Home() {
  return (
    <main className="p-10">
      <Link href="/">
        <button className="absolute rounded bg-green-600 text-white p-4">
          Go to Görli Testnet
        </button>
      </Link>
      <div className="flex flex-col gap-20 w-screen justify-center">
        <MoonbaseAlpha />
      </div>
    </main>
  );
}
