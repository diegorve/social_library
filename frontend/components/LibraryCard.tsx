import type { Link } from "@/types/link";

export default function LibraryCard({
  link,
  onClick,
}: {
  link: Link;
  onClick: () => void;
}) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white cursor-pointer" onClick={onClick}>

        <div className="h-40 bg-gray-200 flex items-center justify-center">
            {link.thumbnail_url ? (
                <img
                    src={link.thumbnail_url}
                    alt={link.title}
                    className="object-cover w-full h-full"
                />
            ) : (
                <span className="text-5xl">📷</span>
            )}
        </div>

        <div className="p-4">
            <h2 className="font-semibold text-lg line-clamp-1">
                {link.title}
            </h2>

            {link.description && (
                <p className="text-gray-500 line-clamp-3 text-sm">
                    {link.description}
                </p>
            )}

            <div className="flex flex-wrap gap-1">
                {link.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <p className="text-gray-500">
                {link.platform}
            </p>

            <p className="text-sm text-gray-400">
                {new Date(link.saved_at).toLocaleDateString()}
            </p>
        </div>

    </div>
    );
}