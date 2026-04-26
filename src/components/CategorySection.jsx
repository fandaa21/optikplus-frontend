import { useNavigate } from "react-router-dom";

function CategorySection() {

  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Wanita", icon: "👓" },
    { id: 2, name: "Pria", icon: "🕶️" },
    { id: 3, name: "Anak", icon: "🧒" },
    { id: 4, name: "Lensa", icon: "🔍" },
    { id: 5, name: "Promo", icon: "🏷️" },
  ];

  const goToCategory = (name) => {

  if(name === "Promo"){
    navigate("/promo");
    return;
  }

  navigate(`/katalog?category=${name}`);
};

  return (
    <section className="category">

      <div className="category-header">

        <div className="header-content">

          <div className="category-wrapper">
            <div className="red-rect"></div>
            <span className="category-text">
              Categories
            </span>
          </div>

          <h2 className="section-title">
            Browse By Category
          </h2>

        </div>

        <div className="category-grid">

          {categories.map((category) => (

            <div
              className="category-card"
              key={category.id}
              onClick={() =>
                goToCategory(category.name)
              }
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <p className="category-name">
                {category.name}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default CategorySection;