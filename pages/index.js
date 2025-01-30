import { Inter } from "next/font/google";
import Header from "./components/Header";
import CandidateList from "./components/CandidateList";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`pl-24 pr-24 ${inter.className}`}>
      <div className="flex w-full" >
        <CandidateList />
      </div>
    </main>
  );
}
