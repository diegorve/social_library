import LibraryGrid from "@/components/LibraryGrid";
import SearchableLibrary from "@/components/SearchableLibrary";

type Link = {
  id: number;
  title: string;
  url: string;
  platform: string;
  saved_at: string;
};

async function getLinks(): Promise<Link[]> {
  const response = await fetch(
    "http://127.0.0.1:8000/links",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error cargando enlaces");
  }

  return response.json();
}

export default async function Home() {
  const links = await getLinks();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Mi Biblioteca
      </h1>

      <SearchableLibrary links={links} />

    </main>
  );
}