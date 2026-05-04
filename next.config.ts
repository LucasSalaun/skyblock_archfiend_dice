/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Génère un dossier 'out' au lieu d'un build classique
  images: {
    unoptimized: true, // Requis car GitHub Pages ne supporte pas l'optimisation d'image native de Next.js
  },
  // À ajouter UNIQUEMENT si ton site est déployé sur une URL du type username.github.io/nom-du-repo/
  basePath: '/skyblock_archfiend_dice', 
};

export default nextConfig;
