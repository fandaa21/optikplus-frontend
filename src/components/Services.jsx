import { Truck, Headphones, ShieldCheck } from "lucide-react";

function Services() {
  const services = [
    {
      id: 1,
      icon: <Truck size={40} />,
      title: "FREE DELIVERY",
      desc: "Free delivery for all orders in Langkawi"
    },
    {
      id: 2,
      icon: <Headphones size={40} />,
      title: "24/7 CUSTOMER SERVICE",
      desc: "Friendly 24/7 customer support"
    },
    {
      id: 3,
      icon: <ShieldCheck size={40} />,
      title: "SECURE PAYMENT",
      desc: "Safe and secure payment methods"
    }
  ];

  return (
    <section className="section-container py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((service) => (
          <div className="flex flex-col items-center text-center group" key={service.id}>
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold mb-2 tracking-tight">{service.title}</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;