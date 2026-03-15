const images = ["carousel_images/C1.jpeg", "carousel_images/C2.jpeg", "carousel_images/C3.jpeg", "carousel_images/C4.jpeg"];

const Carousel = () => {

  return (
    <div className = "container carousel-container">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <ol className="carousel-indicators">
                {images.map((_, index) => (
                <li key={index} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""}></li>
                ))}
            </ol>
            <div className="carousel-inner">
                {images.map((src, index) => (
                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                    <img src={src} className="d-block w-100" alt={`Slide ${index + 1}`} />
                </div>
                ))}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </a>
        </div>
    </div>
    
  );
};

export default Carousel;
