import { useEffect } from "react";
import type { AssetInterface } from "../types/interfaces";

interface Props {
  selectedImg: AssetInterface;
  setOpenPhotoGalleryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PhotoGalleryModal({ selectedImg, setOpenPhotoGalleryModal }: Props) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".photo_gallery_modal_content")) setOpenPhotoGalleryModal(false);
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPhotoGalleryModal(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setOpenPhotoGalleryModal]);

  return (
    <div className="photo_gallery_modal">
      <div className="photo_gallery_modal_content">
        <button type="button" role="button" onClick={() => setOpenPhotoGalleryModal(false)}>
          CHIUDI
        </button>
        <picture draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className="photo_gallery_modal_img">
          <img
            src={selectedImg.path}
            alt={selectedImg.alt}
            title={selectedImg.alt}
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </picture>
      </div>
    </div>
  );
}
