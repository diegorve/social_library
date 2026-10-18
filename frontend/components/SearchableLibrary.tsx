"use client";

import { useState } from "react";
import LibraryGrid from "./LibraryGrid";

type Link = {
  id: number;
  title: string;
  url: string;
  platform: string;
  saved_at: string;
};

export default function SearchableLibrary({
  links,
}: {
  links: Link[];
}) {
  const [search, setSearch] = useState("");

  const filteredLinks = links.filter((link) =>
    link.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
        <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg p-3 mb-6"
        />
        <p className="mb-4, text-gray-500"
>           {filteredLinks.length} resultados
        </p>
        <LibraryGrid links={filteredLinks} />
    </>
  );
}