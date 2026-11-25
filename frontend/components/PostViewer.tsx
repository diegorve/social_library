import type { Link } from "@/types/link";
import { useEffect } from "react";

export default function PostViewer({
    link,
    onClose,
}: {
    link: Link;
    onClose: () => void;
}) {
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
            
            <div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-lg p-4 w-full max-w-lg"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    Cerrar
                </button>
                
                <iframe
                    src={link.url+"embed/"}
                    className="w-full h-[70vh]"
                    title={link.title}
                />
            </div>
        
        </div>
    );
}
