import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BD Cosméticos',
    short_name: 'BD Cosm.',
    description: 'Catálogo Digital de Alta Perfumaria Importada da BD Cosméticos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F5',
    theme_color: '#FAF7F5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Em produção, você deve adicionar ícones de 192x192 e 512x512 aqui
      // Exemplo:
      // {
      //   src: '/icon-192x192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      // },
      // {
      //   src: '/icon-512x512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      // },
    ],
  }
}
