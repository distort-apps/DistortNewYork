/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO: 'danielgenedev:QILIi3U5vkaqoOZ2@gigz.9yoyfht.'
  },
  images: {
    remotePatterns: [
      {
        hostname: 'd1htavafy9m5bl.cloudfront.net',
      },
      {
        hostname: 'dice-media.imgix.net'
      },
      {
        hostname: 'd1htavafy9m5bl.cloudfront.neteyjidwnrzxqioijwcm9klxnpac5zzwv0awnrzxrzdxnhlnvziiwia2v5ijoim2q3njdjzwqtyme4ny00zmuylthhm2etyme3mjvizwu5owq5iiwizwrpdhmiont9fq=='
      }
    ],
  },
}

module.exports = nextConfig
