import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function FlashSale() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const [products, setProducts] = useState([]);

  const [time, setTime] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } =
          prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 23;

              if (days > 0) days--;
            }
          }
        }

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const flashProducts = data
          .slice(0, 8)
          .map((item, index) => {
            const price =
              Number(item.price) || 0;

            const discount =
              [10, 15, 20, 25, 30][
                index % 5
              ];

            const oldPrice =
              Math.round(
                price /
                  (1 - discount / 100)
              );

            return {
              id: item.id,
              name:
                item.name ||
                item.brand +
                  " " +
                  item.model,
              currentPrice: price,
              oldPrice: oldPrice,
              discount: discount,
              rating: 5,
              reviews: 20 + index * 5,
              image:
                "/images/kacamata1.png",
            };
          });

        setProducts(flashProducts);
      })
      .catch((err) =>
        console.log(err)
      );
  }, []);

  const formatNumber = (num) =>
    String(num).padStart(2, "0");

  const slideLeft = () => {
    // Geser ke kiri: Lebar card (270) + Gap (30) = 300
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    // Geser ke kanan: Lebar card (270) + Gap (30) = 300
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="flashsale">
      <div className="flashsale-header">

        <div className="header-left">
          <div className="today-wrapper">
            <div className="red-rect"></div>

            <span className="today-text">
              Today's
            </span>
          </div>

          <h2 className="section-title">
            Flash Sales
          </h2>
        </div>

        <div className="timer-container">

          <div className="timer-unit">
            <span className="label">
              Days
            </span>

            <span className="value">
              {formatNumber(
                time.days
              )}
            </span>
          </div>

          <span className="separator">
            :
          </span>

          <div className="timer-unit">
            <span className="label">
              Hours
            </span>

            <span className="value">
              {formatNumber(
                time.hours
              )}
            </span>
          </div>

          <span className="separator">
            :
          </span>

          <div className="timer-unit">
            <span className="label">
              Minutes
            </span>

            <span className="value">
              {formatNumber(
                time.minutes
              )}
            </span>
          </div>

          <span className="separator">
            :
          </span>

          <div className="timer-unit">
            <span className="label">
              Seconds
            </span>

            <span className="value">
              {formatNumber(
                time.seconds
              )}
            </span>
          </div>
        </div>

        <div className="flash-nav">
          <button
            onClick={slideLeft}
          >
            ‹
          </button>

          <button
            onClick={slideRight}
          >
            ›
          </button>
        </div>

      </div>

      <div
        className="flashsale-products horizontal-scroll"
        ref={sliderRef}
      >
        {products.map((product) => (
          <div
            className="flash-item"
            key={product.id}
          >
            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FlashSale;