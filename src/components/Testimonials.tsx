import trainer2Img from "../assets/trainer2.jpg";
import trainer3Img from "../assets/trainer3.jpg";

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials_title">
      <picture draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className="testimonials_img">
        <img src={trainer2Img} alt="Fitness" title="Fitness trainer man" draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
      </picture>

      <div className="testimonials_title_container">
        <h2 className="testimonials_title" id="testimonials_title">
          TESTIMONIALS
        </h2>
        <h3 className="testimonials_subtitle">Quello che dicono su di me</h3>
      </div>

      <div className="testimonials_content_img_container">
        <picture draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className="testimonials_content_img">
          <img src={trainer3Img} alt="Fitness" title="Fitness trainer man" draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
        </picture>

        <picture draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className="testimonials_content_img">
          <img src={trainer2Img} alt="Fitness" title="Fitness trainer man" draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
        </picture>
      </div>

      <div className="testimonials_content">
        <ul>
          <li>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius consequatur rerum commodi neque perspiciatis accusantium distinctio voluptates autem consectetur
              tenetur rem officia odit pariatur, molestiae laboriosam natus consequuntur ullam accusamus.
            </p>
            <span>John Doe 05/07/2026</span>
          </li>
        </ul>
      </div>

      <div className="testimonials_navigation">
        <button>Precedente</button>
        <div className="testimonials_pagination">
          <button className="selected"></button>
          <button></button>
          <button></button>
        </div>
        <button>Prossimo</button>
      </div>
    </section>
  );
}
