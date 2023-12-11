const SHOW_DATA = [
    {
      id: 'e1', 
      title: 'INDIE CRUSH: INDIE POP DANCE PARTY', 
      date: '2024-01-02', 
      genre: 'DJ-Dance',
      location: 'at TV Eye',  
      price: '15.00', 
      isFeatured: true, 
      image:
        'https://d1htavafy9m5bl.cloudfront.net/eyJidWNrZXQiOiJwcm9kLXNpaC5zZWV0aWNrZXRzdXNhLnVzIiwia2V5IjoiZjM1NzZjNmYtOTJiZi00NTA0LWJmZjctYTlmNmMxZjVkNmUwIiwiZWRpdHMiOnt9fQ==',
      excerpt: "90's indie dance party"
    }, 
    {
      id: 'e2',
      title: 'Kenny Matucci, Semi Auto, Indigo Fuzz, The Tourniquet',
      date: '2023-12-02', 
      genre: 'Rock',
      location: 'at TV Eye',
      price: '15.00',
      isFeatured: false,
      image:
        'https://d1htavafy9m5bl.cloudfront.net/eyJidWNrZXQiOiJwcm9kLXNpaC5zZWV0aWNrZXRzdXNhLnVzIiwia2V5IjoiNDQ2MGY1ZWItMzc2Yi00ZDJmLWFlYzctNGVkNWI0ZTU4MzVlIiwiZWRpdHMiOnt9fQ==',
      excerpt: "some rock show"
    }, 
    {
      id: 'e3',
      title: 'Bodega, Big Bliss',
      date: '2023-12-06',
      genre: 'Post Punk',
      location: 'at TV Eye',
      price: '15.00',
      isFeatured: true,
      image:
        'https://d1htavafy9m5bl.cloudfront.net/eyJidWNrZXQiOiJwcm9kLXNpaC5zZWV0aWNrZXRzdXNhLnVzIiwia2V5IjoiM2Q3NjdjZWQtYmE4Ny00ZmUyLThhM2EtYmE3MjViZWU5OWQ5IiwiZWRpdHMiOnt9fQ==',
      excerpt: "some metal show"
    }
  
  ]


  export function getAllShows() {
    return SHOW_DATA
  }

  export function getFeaturedShows() {
    return SHOW_DATA.filter(show => show.isFeatured)
  }