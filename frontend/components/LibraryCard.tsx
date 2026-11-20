type Link = {
  id: number;
  url: string;
  platform: string;
  title: string;
  tags: string[];
  saved_at: string;
};

export default function LibraryCard({
  link,
}: {
  link: Link;
}) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">

        <div className="h-40 bg-gray-200 flex items-center justify-center">
        <span className="text-5xl">
            📷
        </span>
        </div>

        <div className="p-4">
        <h2 className="font-semibold text-lg">
            {link.title}
        </h2>

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