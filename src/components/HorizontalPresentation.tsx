import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useRef } from "react";
import type { AssetInterface } from "../types/interfaces";

interface Props {
  assets: Array<AssetInterface>;
}

export default function HorizontalPresentation({ assets }: Props) {
  const imgsContainerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLPictureElement>(null);
  const img2Ref = useRef<HTMLPictureElement>(null);
  const img3Ref = useRef<HTMLPictureElement>(null);
  const wrapperOutRef = useRef<HTMLDivElement>(null);
  const wrapperInRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<SVGRectElement>(null);

  const imagesElements = assets
    .filter((asset) => asset.type === "image")
    .map((asset, idx) => {
      return (
        <picture
          key={idx}
          ref={idx === 0 ? img1Ref : idx === 1 ? img2Ref : idx === 2 ? img3Ref : null}
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <img src={asset.path} alt={asset.alt} draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} loading="eager" />
        </picture>
      );
    });

  useGSAP(() => {
    if (!wrapperInRef.current || !wrapperOutRef.current || !maskRef.current || !imgsContainerRef.current) return;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    const sections = wrapperInRef.current.querySelectorAll(".inner_section");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: wrapperOutRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    let animationTimeline: gsap.core.Timeline | null = null;
    let mediaQueryResize = gsap.matchMedia();

    animationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperOutRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 1,
      },
    });

    // DESKTOP TIMELINE
    mediaQueryResize.add("(min-width: 768px)", () => {
      animationTimeline
        .to(imgsContainerRef.current, {
          top: "17%",
          left: "10%",
          ease: "none",
          duration: 1,
          onUpdate: function () {
            const progress = this.progress();
            if (progress >= 0.9) {
              gsap.to(img2Ref.current, {
                y: "0%",
                ease: "none",
              });
              gsap.to(img1Ref.current, {
                y: "100%",
                ease: "none",
              });
            } else {
              gsap.to(img2Ref.current, {
                y: "100%",
                ease: "none",
              });
              gsap.to(img1Ref.current, {
                y: "0%",
                ease: "none",
              });
            }
          },
        })
        .to(imgsContainerRef.current, {
          top: "17%",
          left: "10%",
          ease: "none",
          duration: 1,
        })
        .to(imgsContainerRef.current, {
          top: "40%",
          left: "40%",
          ease: "none",
          duration: 1,
          onUpdate: function () {
            const progress = this.progress();
            if (progress >= 0.2) {
              gsap.to(img3Ref.current, {
                y: "0%",
                ease: "none",
              });
              gsap.to(img2Ref.current, {
                y: "100%",
                ease: "none",
              });
            } else {
              gsap.to(img3Ref.current, {
                y: "100%",
                ease: "none",
              });
              gsap.to(img2Ref.current, {
                y: "0%",
                ease: "none",
              });
            }
          },
        });
    });

    // MOBILE TIMELINE
    mediaQueryResize.add("(max-width: 767px)", () => {
      animationTimeline
        .fromTo(
          imgsContainerRef.current,
          {
            top: "50%",
            left: "10%",
          },
          {
            top: "10%",
            left: "10%",
            ease: "none",
            duration: 1,
            onUpdate: function () {
              const progress = this.progress();
              if (progress >= 0.9) {
                gsap.to(img2Ref.current, {
                  y: "0%",
                  ease: "none",
                });
                gsap.to(img1Ref.current, {
                  y: "100%",
                  ease: "none",
                });
              } else {
                gsap.to(img2Ref.current, {
                  y: "100%",
                  ease: "none",
                });
                gsap.to(img1Ref.current, {
                  y: "0%",
                  ease: "none",
                });
              }
            },
          },
        )
        .to(imgsContainerRef.current, {
          top: "10%",
          left: "10%",
          ease: "none",
          duration: 1,
        })
        .to(imgsContainerRef.current, {
          top: "50%",
          left: "10%",
          ease: "none",
          duration: 1,
          onUpdate: function () {
            const progress = this.progress();
            if (progress >= 0.2) {
              gsap.to(img3Ref.current, {
                y: "0%",
                ease: "none",
              });
              gsap.to(img2Ref.current, {
                y: "100%",
                ease: "none",
              });
            } else {
              gsap.to(img3Ref.current, {
                y: "100%",
                ease: "none",
              });
              gsap.to(img2Ref.current, {
                y: "0%",
                ease: "none",
              });
            }
          },
        });
    });

    gsap.to(maskRef.current, {
      width: "100%",
      scrollTrigger: {
        trigger: wrapperOutRef.current,
        start: "top left",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [wrapperInRef, wrapperOutRef, maskRef, imgsContainerRef, img1Ref, img2Ref, img3Ref]);

  return (
    <div ref={wrapperOutRef} className="horizontal_wrapper_out">
      <span className="sections_bg_text">CROSSFIT HYROX PERSONAL TRAINER CROSSFIT HYROX PERSONAL TRAINER CROSSFIT HYROX PERSONAL TRAINER</span>
      <div ref={imgsContainerRef} className="horizontal_wrapper_out_img">
        {imagesElements.map((imageElement, idx) => (
          <Fragment key={idx}>{imageElement}</Fragment>
        ))}
      </div>
      <div ref={wrapperInRef} className="horizontal_wrapper_in">
        <svg viewBox="0 0 900 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.89998 6C9.43671 8.28224 7.41896 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.41896 0 9.43671 1.71776 9.89998 4H445.1C445.563 1.71776 447.581 0 450 0C452.419 0 454.437 1.71776 454.9 4H890.1C890.563 1.71776 892.581 0 895 0C897.761 0 900 2.23858 900 5C900 7.76142 897.761 10 895 10C892.581 10 890.563 8.28224 890.1 6H454.9C454.437 8.28224 452.419 10 450 10C447.581 10 445.563 8.28224 445.1 6H9.89998Z"
            fill="#D9D9D9"
          />
          <mask id="mask0_0_1" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="10">
            <path
              d="M9.89998 6C9.43671 8.28224 7.41896 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.41896 0 9.43671 1.71776 9.89998 4H445.1C445.563 1.71776 447.581 0 450 0C452.419 0 454.437 1.71776 454.9 4H890.1C890.563 1.71776 892.581 0 895 0C897.761 0 900 2.23858 900 5C900 7.76142 897.761 10 895 10C892.581 10 890.563 8.28224 890.1 6H454.9C454.437 8.28224 452.419 10 450 10C447.581 10 445.563 8.28224 445.1 6H9.89998Z"
              fill="#D9D9D9"
            />
          </mask>
          <g mask="url(#mask0_0_1)">
            <rect ref={maskRef} className="mask" y="-49" height="99" fill="black" />
          </g>
        </svg>
        <section className="inner_section">
          <div className="inner_section_content">
            <span>Courses</span>
            <h1>Crossfit</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Egestas euismod nec sit sed massa turpis in. Sit praesent arcu leo lectus pellentesque. Ornare elit orci morbi volutpat. Ut
              fermentum lorem morbi quis risus amet urna. Urna egestas lorem.
            </p>
          </div>

          <div className="inner_section_empty_content" aria-disabled="true" aria-hidden="true"></div>
        </section>
        <section className="inner_section">
          <div className="inner_section_empty_content" aria-disabled="true" aria-hidden="true"></div>

          <div className="inner_section_content">
            <span>Courses</span>
            <h1>Hyrox</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Egestas euismod nec sit sed massa turpis in. Sit praesent arcu leo lectus pellentesque. Ornare elit orci morbi volutpat. Ut
              fermentum lorem morbi quis risus amet urna. Urna egestas lorem.
            </p>
          </div>
        </section>
        <section className="inner_section">
          <div className="inner_section_content">
            <span>Courses</span>
            <h1>Personal Training</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Egestas euismod nec sit sed massa turpis in. Sit praesent arcu leo lectus pellentesque. Ornare elit orci morbi volutpat. Ut
              fermentum lorem morbi quis risus amet urna. Urna egestas lorem.
            </p>
          </div>

          <div className="inner_section_empty_content" aria-disabled="true" aria-hidden="true"></div>
        </section>
      </div>
    </div>
  );
}
