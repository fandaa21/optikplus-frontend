import { useNavigate } from "react-router-dom";
import { User, Users, Baby, Scan, Tag } from "lucide-react";

function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Wanita", icon: <Users size={32} /> },
    { id: 2, name: "Pria", icon: <User size={32} /> },
    { id: 3, name: "Anak", icon: <Baby size={32} /> },
    { id: 4, name: "Lensa", icon: <Scan size={32} /> },
    { id: 5, name: "Promo", icon: <Tag size={32} /> },
  ];

  const goToCategory = (name) => {
    if (name === "Promo") {
      navigate("/promo");
      return;
    }
    navigate(`/katalog?category=${name}`);
  };

  return (
    <section className="section-container border-t border-gray-100">
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-5 h-10 bg-brand rounded-md"></div>
          <span className="text-brand font-bold text-sm uppercase tracking-widest">Categories</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold">Browse By Category</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => goToCategory(category.name)}
            className="group flex flex-col items-center justify-center p-8 rounded-xl border border-gray-100 hover:border-brand hover:bg-brand hover:text-white transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1"
          >
            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;