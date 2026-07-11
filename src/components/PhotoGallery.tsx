import { useState } from "react";
import type { AssetInterface } from "../types/interfaces";
import PhotoGalleryModal from "./PhotoGalleryModal";

interface Props {
  assets: Array<AssetInterface>;
}

export default function PhotoGallery({ assets }: Props) {
  const [openPhotoGalleryModal, setOpenPhotoGalleryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const images = assets.filter((asset) => asset.type === "image");

  return (
    <>
      {openPhotoGalleryModal && <PhotoGalleryModal selectedImg={images[selectedImage]} setOpenPhotoGalleryModal={setOpenPhotoGalleryModal} />}

      <section className="photo_gallery">
        <h2 className="photo_gallery_title">PHOTO GALLERY</h2>

        <picture
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => {
            document.querySelectorAll(".photo_gallery_img").forEach((img) => {
              img.classList.remove("onfocus");
            });
            e.currentTarget.classList.add("onfocus");
          }}
          className="photo_gallery_img"
        >
          <img src={images[0].path} alt={images[0].alt} title={images[0].alt} draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

          <button
            type="button"
            role="button"
            onClick={() => {
              setSelectedImage(0);
              setOpenPhotoGalleryModal(true);
            }}
          >
            ESPANDI
          </button>
        </picture>

        <picture
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => {
            document.querySelectorAll(".photo_gallery_img").forEach((img) => {
              img.classList.remove("onfocus");
            });
            e.currentTarget.classList.add("onfocus");
          }}
          className="photo_gallery_img onfocus"
        >
          <img src={images[1].path} alt={images[1].alt} title={images[1].alt} draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

          <button
            type="button"
            role="button"
            onClick={() => {
              setSelectedImage(1);
              setOpenPhotoGalleryModal(true);
            }}
          >
            ESPANDI
          </button>
        </picture>

        <picture
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => {
            document.querySelectorAll(".photo_gallery_img").forEach((img) => {
              img.classList.remove("onfocus");
            });
            e.currentTarget.classList.add("onfocus");
          }}
          className="photo_gallery_img"
        >
          <img src={images[2].path} alt={images[2].alt} title={images[2].alt} draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

          <button
            type="button"
            role="button"
            onClick={() => {
              setSelectedImage(2);
              setOpenPhotoGalleryModal(true);
            }}
          >
            ESPANDI
          </button>
        </picture>

        <picture
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => {
            document.querySelectorAll(".photo_gallery_img").forEach((img) => {
              img.classList.remove("onfocus");
            });
            e.currentTarget.classList.add("onfocus");
          }}
          className="photo_gallery_img"
        >
          <img src={images[0].path} alt={images[0].alt} title={images[0].alt} draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />

          <button
            type="button"
            role="button"
            onClick={() => {
              setSelectedImage(0);
              setOpenPhotoGalleryModal(true);
            }}
          >
            ESPANDI
          </button>
        </picture>
      </section>
    </>
  );
}
