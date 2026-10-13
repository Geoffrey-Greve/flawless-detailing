import Img from "@/components/shared/Img";

export default function About() {
  return (
    <section className="hv-sec hv-sec-tight" id="about">
      <div className="hw hv-about">
        <div>
          <div className="hv-eyebrow">About</div>
          <h2 className="hv-h2">
            Personal care. <em>From Chris.</em>
          </h2>
          <p>
            Based in Thornton since 2018, Chris helps Denver-area drivers restore and protect their
            vehicles with careful detailing and clear communication. With mobile service available
            throughout the metro area, you can get the same high level of care at your home or
            office. When you work with Flawless Detailing, your vehicle is treated like our own.
          </p>
        </div>
        <div className="hv-about-img">
          {/* TODO(client): replace with a real photo of Chris at work. */}
          <Img file="salon-a.jpg" alt="Detailer working inside a car interior" sizes="(max-width: 1000px) 100vw, 55vw" />
        </div>
      </div>
    </section>
  );
}
