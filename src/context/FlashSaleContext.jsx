import React, { createContext, useState, useEffect } from "react";

export const FlashSaleContext = createContext();

const FlashSaleProvider = ({ children }) => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set Flash Sale End Time (e.g., 24 hours from now for demo)
    let savedEndTime = localStorage.getItem("flashSaleEnd");
    if (!savedEndTime) {
      const now = new Date();
      now.setHours(now.getHours() + 24);
      savedEndTime = now.getTime();
      localStorage.setItem("flashSaleEnd", savedEndTime);
    }
    setEndTime(Number(savedEndTime));

    // Fetch Sale Products
    fetch("http://127.0.0.1:8000/api/products")
      .then(res => res.json())
      .then(data => {
        // For demo, first 4 products are flash sale
        const saleItems = data.slice(0, 4).map((item, index) => ({
          id: item.id,
          discountPercent: [20, 30, 15, 25][index % 4]
        }));
        setFlashSaleProducts(saleItems);
      });
  }, []);

  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const isFlashSaleActive = () => {
    return endTime && endTime > new Date().getTime();
  };

  const getFlashSalePrice = (product) => {
    if (!isFlashSaleActive()) return null;
    const saleInfo = flashSaleProducts.find(p => p.id === product.id);
    if (!saleInfo) return null;

    const originalPrice = Number(product.price);
    const discountAmount = originalPrice * (saleInfo.discountPercent / 100);
    return {
      currentPrice: originalPrice - discountAmount,
      discountPercent: saleInfo.discountPercent,
      oldPrice: originalPrice
    };
  };

  return (
    <FlashSaleContext.Provider value={{ timeLeft, isFlashSaleActive, getFlashSalePrice, flashSaleProducts }}>
      {children}
    </FlashSaleContext.Provider>
  );
};

export default FlashSaleProvider;
