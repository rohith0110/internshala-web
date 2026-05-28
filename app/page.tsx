import { Header } from "./components/Header";
import { SearchPage } from "./components/SearchPage";

export default function Home() {
  return (
    <>
      <Header />
      <SearchPage />
      <footer className="mt-10 border-t border-border bg-surface py-6 text-center text-xs text-muted">
        Unofficial replica of internshala.com/internships built with Next.js · UI
        practice project · data live from Internshala
      </footer>
    </>
  );
}
