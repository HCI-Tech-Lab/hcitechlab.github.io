import baguetteBox from 'baguettebox.js';
import { useEffect } from 'react';

export default function GalleryCarousel({ images, id, title }) {
    useEffect(() => {
        baguetteBox.run('.gallery');
    }, []);

    return (
        <div className="col-md-6 col-lg-6 text-center mb-3">
            <div id={`carousel${id}`} className="carousel slide">
                <ol className="carousel-indicators">
                    {images.map((_, index) => (
                        <li key={index} data-bs-target={`#carousel${id}`} data-bs-slide-to={index} className={index === 0 ? "active" : ""}></li>
                    ))}
                </ol>
                <div className="carousel-inner">
                    <div className = "gallery">
                        {images.map((src, index) => (
                            <a key={index} href={src} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <img src={src} alt={`Slide ${index + 1}`} style={{ height: "200px" }} />
                            </a>
                        ))}
                    </div>
                </div>
                <figcaption className="figure-caption "><h4>{title}</h4></figcaption>
                {
                    images.length > 1 ? 
                    <a className="carousel-control-prev" href={`#carousel${id}`} role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a> 
                    : null
                }
                {
                    images.length > 1 ? 
                    <a className="carousel-control-next" href={`#carousel${id}`} role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                    : null
                }
                
            </div>
        </div>
    );
}
