import { fetchAllShows } from '@/helpers/api-util'

const EXTERNAL_DATA_URL = 'https://distortnewyork.com/shows'

function generateSiteMap (posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://distortnewyork.com/shows</loc>
       <changefreq>daily</changefreq>
     </url>
     <url>
     <loc>https://distortnewyork.com/</loc>
     <changefreq>daily</changefreq>
     </url>
     <url>
       <loc>https://distortnewyork.com/contact</loc>
     </url>
     ${posts
       .map(({ id, createdAt }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
           <lastmod>${createdAt}</lastmod>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap () {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps ({ res }) {
  // We make an API call to gather the URLs for our site
  const posts = await fetchAllShows()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap
