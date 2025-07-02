
import React from 'react';

const Carousel = () => {
  return (
    <div className="carousel-container">
      <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner rounded-4 shadow-lg">
          <div className="carousel-item active">
            <img src="/banner.jpg" className="d-block w-100 carousel-img" alt="Samsung" />
          </div>
          <div className="carousel-item">
            <img src="/banner2.jpg" className="d-block w-100 carousel-img" alt="Bed" />
          </div>
          <div className="carousel-item">
            <img src="/banner3.webp" className="d-block w-100 carousel-img" alt="Summer" />
          </div>
        </div>

        {/* Prev / Next buttons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      

      {/* Inline CSS */}
      <style>{`
        .carousel-container {
          max-width: 100%;
          margin: 30px auto;
          border-radius: 20px;
          overflow: hidden;
        }

        .carousel-img {
          height: 500px;
          object-fit: cover;
          transition: transform 0.5s ease-in-out;
          border-radius: 15px;
        }

        .carousel-img:hover {
          transform: scale(1.06);
        }

        .carousel-inner {
          border-radius: 20px;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: rgba(0, 0, 0, 0.6);
          padding: 15px;
          border-radius: 50%;
        }

        .carousel-control-prev:hover .carousel-control-prev-icon,
        .carousel-control-next:hover .carousel-control-next-icon {
          background-color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
};

export default Carousel;
