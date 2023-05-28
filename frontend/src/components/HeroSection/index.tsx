import { content } from "./content";

export default function HeroSection() {
  const path : string = window.location.pathname;
  console.log(path)

  return (
    <div>
    <div style={{backgroundColor: "beige"}}
    className="row flex-lg-row-reverse align-items-center g-5 px-4 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src="https://c1.wallpaperflare.com/preview/492/305/286/spare-parts-auto-parts-cars.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div className="col-lg-6 px-4">
        <h1 className="display-5 fw-bold lh-1 mb-3">{content[path]? content[path].title: "Bienvenue"}</h1>
        <p className="lead">{content[path]? content[path].subtitle: "SITE VENTE PIECES VOITURE"}</p>
      </div>
    </div>
  </div>
  );
}
