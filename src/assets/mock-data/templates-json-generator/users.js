[
  '{{repeat(50, 100)}}',
  {
    id: '{{objectId()}}',
    userName: '{{surname()}}',
    firstName: '{{firstName()}}',
    lastName: '{{surname()}}',
    email: '{{email()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    location: {
      x: '{{floating(48.800001, 48.900001)}}',
      y: '{{floating(2.240001, 2.4199999)}}'
    },
    talent: [
      '{{repeat(1, 1)}}',
      {
        id: '{{objectId()}}',
        name: '{{random("Ménage","Baby-Sitting","Déménagement","Livraison","Bricolage","Cours à domicile/Coaching","Transport de colis","Cuisine", "Montage de meuble", "Coiffure/Soin/Beauté")}}'

      }
    ],
    phone: '+33 {{phone()}}',
    description: '{{lorem(1, "paragraphs")}}',
    create_time: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    age: '{{integer(20, 40)}}',
    picture: '{{random("1","2","3","4","5","6","7","8")}}',
    hourlyRate: '{{integer(10, 40)}}'
  }
]
