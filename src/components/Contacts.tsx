import { gsap } from "gsap";
import { useRef } from "react";
import trainerImg from "../assets/trainerCompressed.jpg";
import { svgSelector } from "../utils/svgSelector";

export default function Contacts() {
  const whatsappLinkRef = useRef<HTMLAnchorElement | null>(null);
  const emailLinkRef = useRef<HTMLAnchorElement | null>(null);
  const mapRef = useRef<HTMLAnchorElement | null>(null);

  function handleMouseEnter(textClass: string) {
    let mediaQueryResize = gsap.matchMedia();

    mediaQueryResize.add("(min-width: 768px)", () => {
      gsap.to(`.${textClass}`, { bottom: "0%", duration: 0.3 });
      gsap.to(".text_default", { bottom: "-50%", duration: 0.3 });
    });

    mediaQueryResize.add("(max-width: 767px)", () => {
      gsap.to(`.${textClass}`, { bottom: "0%", duration: 0.3 });
      gsap.to(".text_default", { bottom: "-100%", duration: 0.3 });
    });
  }

  function handleMouseLeave(textClass: string) {
    let mediaQueryResize = gsap.matchMedia();

    mediaQueryResize.add("(min-width: 768px)", () => {
      gsap.to(`.${textClass}`, { bottom: "-50%", duration: 0.3 });
      gsap.to(".text_default", { bottom: "0%", duration: 0.3 });
    });

    mediaQueryResize.add("(max-width: 767px)", () => {
      gsap.to(`.${textClass}`, { bottom: "-150%", duration: 0.3 });
      gsap.to(".text_default", { bottom: "0%", duration: 0.3 });
    });
  }

  return (
    <section aria-labelledby="contacts_title" className="contacts" id="contacts">
      <picture draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className="contacts_img">
        <img src={trainerImg} alt="Fitness" title="Fitness trainer man" draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
      </picture>

      <div className="contacts_title_container">
        <h2 className="contacts_title" id="contacts_title">
          CONTATTI
        </h2>
        <h3 className="contacts_subtitle">Sblocca ora il tuo potenziale dentro di te</h3>
      </div>

      <ul className="contacts_list">
        <li
          onMouseEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleMouseEnter("text_first");
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleMouseLeave("text_first");
          }}
        >
          <a
            ref={whatsappLinkRef}
            href="https://wa.me/XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contattaci su WhatsApp"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {svgSelector({
              svgName: "whatsapp",
              svgWidth: "34px",
              svgHeight: "34px",
              svgFill: "#252525",
            })}
            <span className="divider"></span>
            <div className="contacts_list_text">
              <h6>Social</h6>
              <h5>Whatsapp</h5>
            </div>
          </a>
        </li>

        <li
          onMouseEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleMouseEnter("text_second");
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleMouseLeave("text_second");
          }}
        >
          <a
            ref={emailLinkRef}
            href="mailto:example@example.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contattaci via Email"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {svgSelector({
              svgName: "email",
              svgWidth: "34px",
              svgHeight: "34px",
              svgFill: "#252525",
            })}
            <span className="divider"></span>
            <div className="contacts_list_text">
              <h6>Social</h6>
              <h5>Email</h5>
            </div>
          </a>
        </li>

        <li
          onMouseEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleMouseEnter("text_third");
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleMouseLeave("text_third");
          }}
        >
          <a
            ref={mapRef}
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contattaci sulla mappa"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {svgSelector({
              svgName: "map",
              svgWidth: "34px",
              svgHeight: "34px",
              svgFill: "#252525",
            })}
            <span className="divider"></span>
            <div className="contacts_list_text">
              <h6>Area</h6>
              <h5>Mappa</h5>
            </div>
          </a>
        </li>
      </ul>

      <span className="bg_text_selection text_default" aria-disabled="true" aria-hidden="true">
        SOCIAL
      </span>
      <span className="bg_text_selection text_first" aria-disabled="true" aria-hidden="true">
        WHATSAPP
      </span>
      <span className="bg_text_selection text_second" aria-disabled="true" aria-hidden="true">
        EMAIL
      </span>
      <span className="bg_text_selection text_third" aria-disabled="true" aria-hidden="true">
        MAPPA
      </span>
    </section>
  );
}
