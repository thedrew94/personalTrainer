import { useEffect, useRef } from "react";
import { svgSelector } from "../utils/svgSelector";
import fitnessVideo from "../assets/fitness.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !video.play) return;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("autoplay", "true");
    video.setAttribute("loop", "true");
    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("tabindex", "-1");
    video.setAttribute("aria-description", "Video background of a fitness instructor demonstrating exercises in a gym setting.");
    video.setAttribute("aria-label", "Fitness instructor demonstrating exercises in a gym setting.");
    video.setAttribute("role", "presentation");
    video.setAttribute("aria-hidden", "true");

    async function playVideo() {
      try {
        await video!.play();
      } catch (err) {
        console.log("Autoplay prevented:", err);
      }
    }

    playVideo();
  }, []);

  return (
    <div className="hero">
      <div className="hero_bg_video">
        <video ref={videoRef} className="hero_bg_video" autoPlay muted loop playsInline>
          <source src={fitnessVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="hero_vertical">
        <div className="hero_info">
          <div className="hero_info_text">
            <h3>ISTRUTTORE FITNESS</h3>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quo ducimus quidem nostrum accusantium, sint doloribus nobis quasi repellat praesentium aperiam
              cupiditate alias deserunt recusandae debitis officiis quis aspernatur repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam non quos vero.
              <br />
              <br />
              Nemo, adipisci dicta tempora deleniti quo aperiam neque corrupti minima nihil sapiente atque tenetur dignissimos, nulla necessitatibus molestiae?
            </h4>

            <button className="hero_info_button">CONTACT ME {svgSelector({ svgName: "arrow", svgWidth: "24", svgHeight: "24", svgFill: "#fff" })}</button>
          </div>
        </div>
        <span className="hero_name">
          <h2>Alessandro Maurizi</h2>
        </span>
      </div>

      <span aria-disabled="true" aria-hidden="true" role="presentation" className="scroll_figure">
        {svgSelector({ svgName: "mouse", svgWidth: "32px", svgHeight: "32px", svgFill: "#fff" })}

        <span className="scroll_figure_text">SCORRI IN BASSO</span>
      </span>
    </div>
  );
}
