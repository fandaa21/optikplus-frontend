function Services(){

  const services = [
    {
      id:1,
      icon:"🚚",
      title:"FREE DELIVERY",
      desc:"Free delivery for all orders"
    },
    {
      id:2,
      icon:"🎧",
      title:"24/7 CUSTOMER SERVICE",
      desc:"Friendly customer support"
    },
    {
      id:3,
      icon:"🔒",
      title:"SECURE PAYMENT",
      desc:"Safe and secure payment"
    }
  ]

  return(

    <section className="services">

      {services.map(service =>(

        <div className="service-card" key={service.id}>

          <div className="service-icon">
            {service.icon}
          </div>

          <h3>{service.title}</h3>
          <p>{service.desc}</p>

        </div>

      ))}

    </section>

  )

}

export default Services