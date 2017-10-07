[
  '{{repeat(50, 100)}}',
  {
    id: '{{objectId()}}',
    owner: '{{objectId()}}',
    date:'{{date(new Date(2017, 0, 1), new Date(), "YYYY-MM-dd")}}',
    description: '{{lorem(1, "paragraphs")}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    location: {
      x: '{{floating(48.800001, 48.900001)}}',
      y: '{{floating(2.240001, 2.4199999)}}'
    },
    talent:
      {
        id: '{{objectId()}}',
        name: '{{random("Ménage","Baby-Sitting","Déménagement","Livraison","Bricolage","Cours à domicile/Coaching","Transport de colis","Cuisine", "Montage de meuble", "Coiffure/Soin/Beauté")}}'

      },
    created: '{{date(new Date(2016, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    picture: '{{random("1","2","3","4","5","6","7","8")}}'
  }
]
