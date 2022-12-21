import AuroraTestnet from "./component/AuroraTestnet";
import DegenscoreTestnet from "./component/DegenscoreTestnet";

export default function Home() {
  return (
    <main className="p-10">
      <div className="flex flex-row gap-20 w-screen">
        <AuroraTestnet />
        <DegenscoreTestnet />
      </div>
    </main>
  );
}
