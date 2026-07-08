import { gsap } from "gsap";
import { useRef, useState } from "react";

interface Props {
  assets: Array<{ path: string; alt: string }>;
}

export default function Testimonials({ assets }: Props) {
  const [activeImgIndex, setActiveImgIndex] = useState<number>(1);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const img1Ref = useRef<HTMLPictureElement | null>(null);
  const img2Ref = useRef<HTMLPictureElement | null>(null);
  const img3Ref = useRef<HTMLPictureElement | null>(null);
  const testimonialsContent = [
    {
      imgPath: assets[0].path,
      imgAlt: assets[0].alt,
      imgTitle: "Trainer 1",
      bodyContent:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius consequatur rerum commodi neque perspiciatis accusantium distinctio voluptates autem consectetur tenetur rem officia odit pariatur, molestiae laboriosam natus consequuntur ullam accusamus.",
      author: "Trainer 1",
    },
    {
      imgPath: assets[1].path,
      imgAlt: assets[0].alt,
      imgTitle: "Trainer 1",
      bodyContent:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius consequatur rerum commodi neque perspiciatis accusantium distinctio voluptates autem consectetur tenetur rem officia odit pariatur, molestiae laboriosam natus consequuntur ullam accusamus.",
      author: "Trainer 2",
    },
    {
      imgPath: assets[2].path,
      imgAlt: assets[0].alt,
      imgTitle: "Trainer 1",
      bodyContent:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius consequatur rerum commodi neque perspiciatis accusantium distinctio voluptates autem consectetur tenetur rem officia odit pariatur, molestiae laboriosam natus consequuntur ullam accusamus.",
      author: "Trainer 3",
    },
  ];

  function handleSliderNavigation({ direction, index }: { direction: "prev" | "next" | "goto"; index?: number }) {
    const bgImg = bgImgRef.current;
    if (!bgImg) return;

    if (direction === "prev") {
      setActiveImgIndex((prevIndex) => (prevIndex === 1 ? 3 : prevIndex - 1));
      bgImg.src = activeImgIndex === 1 ? testimonialsContent[2].imgPath : activeImgIndex === 2 ? testimonialsContent[0].imgPath : testimonialsContent[1].imgPath;
    } else if (direction === "next") {
      setActiveImgIndex((prevIndex) => (prevIndex === 3 ? 1 : prevIndex + 1));
      bgImg.src = activeImgIndex === 1 ? testimonialsContent[1].imgPath : activeImgIndex === 2 ? testimonialsContent[2].imgPath : testimonialsContent[0].imgPath;
    } else if (direction === "goto" && index !== undefined) {
      setActiveImgIndex(index);
      bgImg.src = testimonialsContent[index - 1].imgPath;
    }

    gsap.fromTo(
      bgImg,
      {
        opacity: 0,
        filter: "saturate(1) brightness(1) contrast(1)",
        scale: 1.28,
      },
      {
        ease: "power2.out",
        opacity: 1,
        duration: 2.75,
        filter: "saturate(0.25) brightness(0.55) contrast(1.1)",
        scale: 1,
      },
    );
  }

  return (
    <section className="testimonials" aria-labelledby="testimonials_title" aria-describedby="testimonials_subtitle">
      <picture draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className="testimonials_img">
        <img
          ref={bgImgRef}
          src={testimonialsContent[activeImgIndex - 1].imgPath}
          alt={testimonialsContent[activeImgIndex - 1].imgAlt}
          title={testimonialsContent[activeImgIndex - 1].imgTitle}
          aria-hidden="true"
          loading="eager"
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />
      </picture>

      <div className="testimonials_title_container">
        <h2 className="testimonials_title" id="testimonials_title">
          TESTIMONIALS
        </h2>
        <h3 className="testimonials_subtitle" id="testimonials_subtitle">
          Quello che dicono su di me
        </h3>
      </div>

      <div className="testimonials_content_img_container">
        {testimonialsContent.map((testimonial, index) => {
          return (
            <picture
              key={`testimonial_${index}`}
              ref={index === 0 ? img1Ref : index === 1 ? img2Ref : index === 2 ? img3Ref : null}
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              aria-hidden={activeImgIndex === index + 1 ? "false" : "true"}
              className={`testimonials_content_img ${activeImgIndex === index + 1 ? "active" : ""}`}
            >
              <img
                src={testimonial.imgPath}
                alt={testimonial.imgAlt}
                title={testimonial.imgTitle}
                loading="eager"
                draggable="false"
                aria-hidden={activeImgIndex === index + 1 ? "false" : "true"}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </picture>
          );
        })}
      </div>

      <div className="testimonials_content">
        <ul>
          <li>
            <p>{testimonialsContent[activeImgIndex - 1].bodyContent || "No testimonial available."}</p>
            <span>{testimonialsContent[activeImgIndex - 1].author || "No author available"}</span>
          </li>
        </ul>
      </div>

      <div className="testimonials_navigation">
        <button type="button" role="button" aria-roledescription="Previous testimonial" title="Previous testimonial" onClick={() => handleSliderNavigation({ direction: "prev" })}>
          Precedente
        </button>
        <div className="testimonials_pagination">
          {testimonialsContent.map((_, index) => {
            return (
              <button
                key={`testimonial_pagination_${index}`}
                type="button"
                role="button"
                aria-roledescription={`Testimonial ${index + 1}`}
                aria-label={`Testimonial ${index + 1}`}
                aria-selected={activeImgIndex === index + 1 ? "true" : "false"}
                className={activeImgIndex === index + 1 ? "selected" : ""}
                onClick={() => handleSliderNavigation({ direction: "goto", index: index + 1 })}
              ></button>
            );
          })}
        </div>
        <button type="button" role="button" aria-roledescription="Next testimonial" title="Next testimonial" onClick={() => handleSliderNavigation({ direction: "next" })}>
          Prossimo
        </button>
      </div>
    </section>
  );
}
