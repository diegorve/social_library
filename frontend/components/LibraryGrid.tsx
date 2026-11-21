import LibraryCard from "./LibraryCard";
import type { Link } from "@/types/link";

export default function LibraryGrid({
  links,
}: {
  links: Link[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {links.map((link) => (
        <LibraryCard
          key={link.id}
          link={link}
        />
      ))}
    </div>
  );
}