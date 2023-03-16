import Link from "next/link";
import AlphaTest from "../component/AlphaTest";

export default function Home() {
  return (
    <main className="p-10">
      <Link href="/moonbase">
        <button className="absolute rounded bg-green-600 text-white p-4">
          Go to Moonbase Testnet
        </button>
      </Link>
      <div className="flex flex-col gap-20 w-screen justify-center">
        <AlphaTest />
      </div>
    </main>
  );
}
