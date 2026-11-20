"use client";

import { useState } from "react";
import LibraryGrid from "./LibraryGrid";

type Link = {
  id: number;
  url: string;
  platform: string;
  title: string;
  tags: string[];
  saved_at: string;
};

export default function SearchableLibrary({
  links,
}: {
  links: Link[];
}) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(links.flatMap((link) => link.tags))
  ).sort();

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );
  }
  
  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(search.toLowerCase())

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => link.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

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
        
        <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={
                        selectedTags.includes(tag)
                        ? "px-3 py-1 rounded-full bg-blue-600 text-white"
                        : "px-3 py-1 rounded-full bg-gray-200"
                    }
                >
                    {tag}
                </button>
            ))}
        </div>

        <LibraryGrid links={filteredLinks} />
    </>
  );
}