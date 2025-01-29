import { Inter } from "next/font/google";
import Header from "./components/Header";
import CandidateList from "./components/CandidateList";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`p-24 ${inter.className}`}>
      <div className="flex w-full">
        <Header />
      </div>
      <div className="flex">
        <CandidateList />
      </div>
    </main>
  );
}
