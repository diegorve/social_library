import LibraryCard from "./LibraryCard";

type Link = {
  id: number;
  url: string;
  platform: string;
  title: string;
  tags: string[];
  saved_at: string;
};

export default function LibraryGrid({
  links,
}: {
  links: Link[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link) => (
        <LibraryCard
          key={link.id}
          link={link}
        />
      ))}
    </div>
  );
}