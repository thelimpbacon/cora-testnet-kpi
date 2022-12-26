import AuroraTestnet from "./component/AuroraTestnet";
import DegenscoreTestnet from "./component/DegenscoreTestnet";

export default function Home() {
  return (
    <main className="p-10">
      <div className="flex flex-col gap-20 w-screen justify-center">
        <AuroraTestnet />
        <DegenscoreTestnet />
      </div>
    </main>
  );
}
