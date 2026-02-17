// Donnees des articles de blog

export type ArticleCategory = 'vivre-a-hesperange' | 'gastronomie' | 'loisirs' | 'education' | 'immobilier' | 'transports'

export interface ArticleSection {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'tip'
  content: string
  items?: string[]
}

export interface ArticleData {
  slug: string
  title: string
  excerpt: string
  content: ArticleSection[]
  author: string
  date: string
  category: ArticleCategory
  tags: string[]
  readTime: number
  image: string
  imageAlt: string
  relatedSlugs: string[]
}

export const ARTICLE_CATEGORIES: Record<ArticleCategory, { label: string; description: string }> = {
  'vivre-a-hesperange': {
    label: 'Vivre a Hesperange',
    description: 'Tout savoir sur la vie quotidienne dans la commune de Hesperange.',
  },
  'gastronomie': {
    label: 'Gastronomie',
    description: 'Restaurants, cafes et bonnes tables de la commune.',
  },
  'loisirs': {
    label: 'Loisirs',
    description: 'Activites, sorties et detente dans la commune.',
  },
  'education': {
    label: 'Education',
    description: 'Ecoles, creches et structures d\'accueil pour les familles.',
  },
  'immobilier': {
    label: 'Immobilier',
    description: 'Marche immobilier, investissement et tendances a Hesperange.',
  },
  'transports': {
    label: 'Transports',
    description: 'Mobilite, tram, bus et pistes cyclables.',
  },
}

const articles: ArticleData[] = [
  // === ARTICLE 1 : Guide complet vivre a Hesperange ===
  {
    slug: 'guide-complet-vivre-hesperange',
    title: 'Vivre a Hesperange : le guide complet pour s\'installer',
    excerpt: 'Population cosmopolite, proximite de Luxembourg-ville, cadre verdoyant : decouvrez pourquoi Hesperange est l\'une des communes les plus recherchees du Grand-Duche.',
    author: 'L\'equipe Fidelis',
    date: '2026-01-15',
    category: 'vivre-a-hesperange',
    tags: ['hesperange', 'guide', 'installation', 'commune', 'luxembourg'],
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    imageAlt: 'Vue aerienne de la commune de Hesperange au Luxembourg',
    relatedSlugs: ['top-5-restaurants-hesperange', 'ecoles-creches-hesperange-guide-familles', 'prix-immobilier-hesperange-2026'],
    content: [
      { type: 'paragraph', content: 'Avec ses 17 150 habitants repartis sur cinq sections — Hesperange, Alzingen, Fentange, Itzig et Howald — la commune de Hesperange figure parmi les sept plus peuplees du Luxembourg. Sa position strategique au sud-est de Luxembourg-ville, a moins de dix minutes du centre, en fait un compromis ideal entre vie urbaine et tranquillite.' },
      { type: 'heading', content: 'Une commune cosmopolite' },
      { type: 'paragraph', content: 'Plus de 54 % des residents sont de nationalite etrangere, representant 129 nationalites differentes. Cette diversite se retrouve dans les ecoles, les commerces et les evenements culturels organises tout au long de l\'annee par la commune.' },
      { type: 'heading', content: 'Cinq sections, cinq ambiances' },
      { type: 'list', content: 'Chaque section de la commune a son caractere propre :', items: [
        'Hesperange (chef-lieu) : quartier du lac, parc communal de 11 hectares, ruines du chateau du XIVe siecle',
        'Alzingen : cadre champetre entre champs et forets, fermes luxembourgeoises renovees',
        'Fentange : plateau residentiel a proximite de la Cloche d\'Or, grandes maisons familiales',
        'Itzig : village a caractere rural avec commerces et restaurants, acces direct a Luxembourg-ville',
        'Howald : en pleine mutation urbaine, futur 2e pole multimodal du Grand-Duche avec l\'arrivee du tram',
      ]},
      { type: 'heading', content: 'Prix de l\'immobilier' },
      { type: 'paragraph', content: 'Les prix affiches a Hesperange oscillent entre 8 800 et 9 250 EUR/m2 selon les sections. Alzingen est actuellement la section la plus chere (9 250 EUR/m2), suivie d\'Itzig (9 050 EUR/m2). Fentange et Howald restent plus accessibles, en dessous de 8 800 EUR/m2.' },
      { type: 'heading', content: 'Transports et mobilite' },
      { type: 'paragraph', content: 'Les transports en commun sont entierement gratuits au Luxembourg depuis 2020. Plusieurs lignes de bus (3, 4, 5, 23, 24, 28, 29) desservent la commune. L\'arrivee du tramway a Howald, prevue pour le printemps 2026, transformera la mobilite locale avec un pole d\'echange multimodal reliant tram, train et bus.' },
      { type: 'tip', content: 'Depuis Hesperange, une piste cyclable longe l\'Alzette jusqu\'au Grund de Luxembourg-ville, en pleine nature. Le trajet prend environ 20 minutes a velo.' },
      { type: 'heading', content: 'Vie quotidienne et services' },
      { type: 'paragraph', content: 'La commune dispose de plusieurs supermarches (Cactus, Aldi), d\'un centre commercial a proximite (Cloche d\'Or), de cabinets medicaux, d\'une pharmacie et de multiples restaurants. Le Guide du Citoyen, publie chaque annee par la commune, recense l\'ensemble des services disponibles.' },
    ],
  },

  // === ARTICLE 2 : Top 5 restaurants ===
  {
    slug: 'top-5-restaurants-hesperange',
    title: 'Top 5 des restaurants a Hesperange et Howald',
    excerpt: 'De la table gastronomique a la trattoria familiale, decouvrez les meilleures adresses pour manger dans la commune de Hesperange.',
    author: 'L\'equipe Fidelis',
    date: '2026-01-22',
    category: 'gastronomie',
    tags: ['restaurants', 'hesperange', 'howald', 'gastronomie', 'sortir'],
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    imageAlt: 'Interieur elegant d\'un restaurant a Hesperange',
    relatedSlugs: ['guide-complet-vivre-hesperange', 'hesper-beach-club-ete-hesperange', 'howald-quartier-en-mutation'],
    content: [
      { type: 'paragraph', content: 'La commune de Hesperange compte une quarantaine de restaurants couvrant un large eventail de cuisines : francaise, italienne, portugaise, chinoise, japonaise. Voici notre selection des cinq meilleures adresses, testees et approuvees.' },
      { type: 'heading', content: '1. Artis — la table gastronomique' },
      { type: 'paragraph', content: 'Installe route de Thionville a Hesperange, Artis est la reference gastronomique de la commune. Le chef, passe par plusieurs etoiles Michelin en Europe et au Perou, propose une cuisine d\'auteur fusionnant traditions et influences mondiales. Le restaurant dispose egalement d\'un espace privatif pour 20 convives. Comptez 60 a 90 EUR par personne.' },
      { type: 'heading', content: '2. Le Set — le bistrot de Howald' },
      { type: 'paragraph', content: 'Classe numero un sur TripAdvisor a Howald, Le Set est un bistrot ou l\'on mange bien pour 33 a 44 EUR. Trois menus differents par semaine, une carte variee, un accueil sincere et une petite terrasse en ete. Les habitues saluent la qualite des suggestions fraiches et creatives du chef.' },
      { type: 'heading', content: '3. La Rusticana — l\'italienne authentique' },
      { type: 'paragraph', content: 'Route de Thionville a Howald, La Rusticana est une trattoria appreciee pour ses pizzas au feu de bois, ses pates fraiches et son ambiance conviviale. Grande terrasse en ete, plats a emporter et livraison disponibles. Note de 4.1/5 sur les principales plateformes.' },
      { type: 'heading', content: '4. Bei der Uelzecht — la brasserie locale' },
      { type: 'paragraph', content: 'Au coeur de Hesperange, Bei der Uelzecht est une brasserie de 45 a 50 places qui accueille aussi bien les dejeuners d\'affaires que les celebrations familiales. Cuisine de brasserie classique, portions genereuses et ambiance chaleureuse.' },
      { type: 'heading', content: '5. D&C Restaurant — la cuisine asiatique' },
      { type: 'paragraph', content: 'Pour les amateurs de cuisine chinoise et japonaise, D&C Restaurant a Howald propose une carte variee de sushis, ramens et plats cantonais. Ouvert du dimanche au vendredi, midi et soir. Un rapport qualite-prix interessant pour le secteur.' },
      { type: 'tip', content: 'Le site resto.lu propose des promotions regulieres dans les restaurants de Hesperange. Pensez a verifier avant de reserver.' },
    ],
  },

  // === ARTICLE 3 : Hesper Beach Club ===
  {
    slug: 'hesper-beach-club-ete-hesperange',
    title: 'Hesper Beach Club : l\'ete au bord de l\'eau a Hesperange',
    excerpt: 'Piscine, beach-volley, restaurant les pieds dans le sable : le Hesper Beach Club transforme le parc communal en station balneaire de juin a septembre.',
    author: 'L\'equipe Fidelis',
    date: '2026-02-01',
    category: 'loisirs',
    tags: ['hesper beach', 'piscine', 'ete', 'hesperange', 'loisirs', 'enfants'],
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
    imageAlt: 'Plage et piscine au Hesper Beach Club de Hesperange',
    relatedSlugs: ['parc-lac-hesperange-promenades-nature', 'guide-complet-vivre-hesperange', 'top-5-restaurants-hesperange'],
    content: [
      { type: 'paragraph', content: 'Chaque ete, le parc communal de Hesperange se transforme en veritable station balneaire. Le Hesper Beach Club, installe au 474 route de Thionville a Alzingen, accueille petits et grands de juin a septembre, 7 jours sur 7, de 11h a 20h. L\'acces est gratuit.' },
      { type: 'heading', content: 'Les equipements' },
      { type: 'list', content: 'Le site regroupe sur un meme espace :', items: [
        'Une piscine pour les enfants jusqu\'a 12 ans',
        'Un terrain de beach-volley',
        'Des pistes de petanque',
        'Une zone sablonneuse avec transats',
        'Un chalet-buvette et un restaurant avec terrasse',
      ]},
      { type: 'heading', content: 'La restauration' },
      { type: 'paragraph', content: 'Le restaurant du Beach Club propose une carte estivale : burgers, pizzas, salades, sandwichs et frites cote snack, ainsi qu\'un menu plus elabore avec des plats a partager cote restaurant. On commande les pieds dans le sable, face a l\'etang du parc.' },
      { type: 'heading', content: 'Les evenements' },
      { type: 'paragraph', content: 'En collaboration avec la commune, le Beach Club programme des soirees thematiques : retransmissions sportives sur grand ecran, concerts en plein air sur la scene du Kiopa, et animations pour enfants le week-end.' },
      { type: 'tip', content: 'Pour la saison 2026, les horaires d\'ouverture et le programme des evenements sont disponibles sur hesperpark.lu et sur le site de la commune hesperange.lu.' },
      { type: 'heading', content: 'Un atout pour les familles' },
      { type: 'paragraph', content: 'Pour les familles installees a Hesperange, le Beach Club est un avantage concret au quotidien. Pas besoin de prendre la voiture : le parc est accessible a pied ou a velo depuis toutes les sections de la commune. C\'est l\'un des arguments qui reviennent le plus souvent chez les acquereurs que nous accompagnons.' },
    ],
  },

  // === ARTICLE 4 : Parc et lac ===
  {
    slug: 'parc-lac-hesperange-promenades-nature',
    title: 'Le parc et le lac de Hesperange : promenades et nature',
    excerpt: '11 hectares de verdure, un etang, des sentiers entre Alzingen, Fentange et Hesperange : le parc communal est le poumon vert de la commune.',
    author: 'L\'equipe Fidelis',
    date: '2026-02-05',
    category: 'loisirs',
    tags: ['parc', 'lac', 'nature', 'promenade', 'hesperange', 'alzette'],
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    imageAlt: 'Sentier de promenade dans le parc communal de Hesperange',
    relatedSlugs: ['hesper-beach-club-ete-hesperange', 'guide-complet-vivre-hesperange', 'se-deplacer-hesperange-tram-bus-velo'],
    content: [
      { type: 'paragraph', content: 'Le parc communal de Hesperange s\'etend sur 11 hectares et relie trois sections de la commune : Alzingen, Fentange et Hesperange. Son etang, ses sentiers ombrages et ses installations sportives en font un lieu de vie central pour les residents.' },
      { type: 'heading', content: 'L\'etang et les promenades' },
      { type: 'paragraph', content: 'Au coeur du parc, l\'etang offre un cadre paisible pour la promenade. Des bancs sont disposes le long des berges, et plusieurs sentiers boucles permettent de varier les itineraires. Le tour complet du parc prend environ 30 minutes a pied.' },
      { type: 'heading', content: 'Les ruines du chateau' },
      { type: 'paragraph', content: 'Sur une colline dominant le parc, les ruines du chateau de Hesperange datent du XIVe siecle. Classees monument historique, elles offrent un point de vue panoramique sur la vallee de l\'Alzette. Un sentier interprete permet de decouvrir l\'histoire du site.' },
      { type: 'heading', content: 'La vallee de l\'Alzette a velo' },
      { type: 'paragraph', content: 'Depuis le parc, la piste cyclable PC1 longe l\'Alzette en pleine nature jusqu\'au quartier du Grund a Luxembourg-ville. Le parcours, essentiellement plat, traverse la reserve naturelle de la vallee de l\'Alzette. Comptez 20 a 25 minutes pour rejoindre le centre-ville a velo.' },
      { type: 'heading', content: 'Le Kiopa et les evenements culturels' },
      { type: 'paragraph', content: 'Le Kiopa est une scene en plein air situee dans le parc. De mai a septembre, elle accueille concerts, pieces de theatre et expositions organises par le syndicat d\'initiative de Hesperange. Le programme complet est publie sur visithesperange.lu.' },
      { type: 'heading', content: 'Activites sportives' },
      { type: 'list', content: 'Le parc dispose de plusieurs infrastructures sportives accessibles gratuitement :', items: [
        'Terrains de football et de basketball',
        'Terrain de beach-volley (Hesper Beach Club en ete)',
        'Pistes de petanque',
        'Piste de skateboard',
        'Parcours de cyclocross',
      ]},
      { type: 'paragraph', content: 'Pour les enfants, le parc de loisirs interieur YOYO est situe a proximite et propose des activites par tous les temps.' },
    ],
  },

  // === ARTICLE 5 : Ecoles et creches ===
  {
    slug: 'ecoles-creches-hesperange-guide-familles',
    title: 'Ecoles et creches a Hesperange : guide pour les familles',
    excerpt: 'Ecoles fondamentales, maisons relais, creches : tout ce que les familles doivent savoir pour inscrire leurs enfants dans la commune de Hesperange.',
    author: 'L\'equipe Fidelis',
    date: '2026-01-28',
    category: 'education',
    tags: ['ecoles', 'creches', 'maison relais', 'familles', 'enfants', 'hesperange'],
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    imageAlt: 'Ecole fondamentale dans la commune de Hesperange',
    relatedSlugs: ['guide-complet-vivre-hesperange', 'parc-lac-hesperange-promenades-nature', 'investir-hesperange-rendement-locatif'],
    content: [
      { type: 'paragraph', content: 'L\'offre scolaire et d\'accueil est l\'un des criteres les plus importants pour les familles qui s\'installent a Hesperange. La commune a considerablement etendu ses infrastructures ces dernieres annees pour faire face a la croissance demographique.' },
      { type: 'heading', content: 'Les ecoles fondamentales' },
      { type: 'paragraph', content: 'La commune dispose de plusieurs ecoles fondamentales reparties dans les differentes sections. Alzingen a recemment inaugure un nouveau batiment scolaire. Hesperange et Fentange partagent certaines infrastructures, notamment pour les cycles precoces et le cycle 1.' },
      { type: 'paragraph', content: 'L\'enseignement fondamental au Luxembourg est organise en quatre cycles de deux ans chacun (cycle 1 a 4). L\'alphabetisation se fait en allemand, le francais etant introduit a partir du cycle 2.2.' },
      { type: 'heading', content: 'Les maisons relais' },
      { type: 'list', content: 'Les maisons relais communales accueillent les enfants de 3 a 12 ans en dehors des heures de classe :', items: [
        'Maison Relais Heesprenger (Hesperange) — rue Gaessel',
        'Maison Relais Wissbei 2 (Howald) — 1, rue de la Redoute',
        'Ecole primaire Howald — Avenue Grand-Duc Jean',
        'Maison Relais Hesperange-Fentange — 75, rue de Bettembourg',
      ]},
      { type: 'heading', content: 'Les creches' },
      { type: 'paragraph', content: 'Pour les enfants de 3 mois a 4 ans, plusieurs creches sont implantees sur le territoire de la commune. La creche Jangeli (395 route de Thionville) et L\'Enfant Roi The Corner (pres du Cactus Howald) figurent parmi les plus connues.' },
      { type: 'heading', content: 'La Mini-Heesprenger' },
      { type: 'paragraph', content: 'Structure originale, la Mini-Heesprenger accueille les enfants de 3 a 6 ans inscrits au precoce ou au cycle 1 des ecoles de Hesperange et Fentange. Elle est integree au nouveau complexe scolaire, facilitant les transitions entre ecole et accueil.' },
      { type: 'tip', content: 'Les inscriptions aux maisons relais et creches communales se font aupres du Service Enfants et Jeunes de la commune. Anticipez : les places sont limitees et la demande forte.' },
    ],
  },

  // === ARTICLE 6 : Howald mutation urbaine ===
  {
    slug: 'howald-quartier-en-mutation',
    title: 'Howald : le quartier qui va tout changer a Hesperange',
    excerpt: 'Tram, pole multimodal, 45 000 m2 de projets mixtes : Howald se transforme en nouveau centre urbain aux portes de Luxembourg-ville.',
    author: 'L\'equipe Fidelis',
    date: '2026-02-10',
    category: 'immobilier',
    tags: ['howald', 'tram', 'urbanisme', 'investissement', 'developpement'],
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    imageAlt: 'Vue du quartier de Howald en developpement a Hesperange',
    relatedSlugs: ['prix-immobilier-hesperange-2026', 'se-deplacer-hesperange-tram-bus-velo', 'investir-hesperange-rendement-locatif'],
    content: [
      { type: 'paragraph', content: 'Howald est en train de vivre la transformation la plus importante de son histoire. D\'une zone commerciale et industrielle, cette section de la commune de Hesperange se metamorphose en quartier mixte, vert et multimodal. Un changement qui va redessiner l\'ensemble de la commune.' },
      { type: 'heading', content: 'Le tram arrive a Howald' },
      { type: 'paragraph', content: 'La station de tram Howald-Gare est deja en service sur des quais provisoires. L\'ouverture definitive du pole d\'echange est prevue pour le printemps 2026, apres les derniers tests de Luxtram. L\'extension vers la Cloche d\'Or est en cours. A terme, 24 000 passagers transiteront chaque jour par ce pole.' },
      { type: 'heading', content: 'Un pole multimodal de premier plan' },
      { type: 'paragraph', content: 'Autour de la gare de Howald, un terminal de bus, un arret de tram, un P+R et des velos en libre-service se combineront pour creer le deuxieme pole multimodal le mieux desservi du Grand-Duche, apres la Gare Centrale.' },
      { type: 'heading', content: '45 000 m2 de projets' },
      { type: 'paragraph', content: 'Le Plan d\'Amenagement General (PAG) adopte par la commune prevoit 45 000 m2 de developpement sur 37 hectares : 20 % de logements, le reste en commerces et bureaux. La particularite : une mixite integree ou chaque ilot combine residential, commercial et tertiaire.' },
      { type: 'list', content: 'Les equipements prevus incluent :', items: [
        'Un Cactus Shoppi supplementaire et des commerces de proximite',
        'Des creches et ecoles',
        'Des espaces de bureaux nouvelle generation',
        'Des pistes cyclables a revetement rouge (une premiere au Luxembourg)',
      ]},
      { type: 'heading', content: 'Impact sur l\'immobilier' },
      { type: 'paragraph', content: 'L\'arrivee du tram et le developpement urbain ont un effet direct sur les prix immobiliers a Howald, qui restent pour l\'instant en dessous de 8 800 EUR/m2, inferieurs a ceux du chef-lieu (9 150 EUR/m2). Pour les investisseurs, c\'est une fenetre d\'opportunite : acheter avant que la revalorisation liee aux nouvelles infrastructures ne se repercute pleinement sur les prix.' },
      { type: 'quote', content: 'Howald combine deux atouts rares sur le marche luxembourgeois : des prix encore contenus et une desserte en transports qui sera bientot parmi les meilleures du pays.' },
    ],
  },

  // === ARTICLE 7 : Prix immobilier 2026 ===
  {
    slug: 'prix-immobilier-hesperange-2026',
    title: 'Prix de l\'immobilier a Hesperange en 2026 : analyse par section',
    excerpt: 'D\'Alzingen a Howald, les prix au m2 varient de 8 800 a 9 250 EUR. Analyse detaillee du marche immobilier dans chaque section de la commune.',
    author: 'L\'equipe Fidelis',
    date: '2026-02-12',
    category: 'immobilier',
    tags: ['prix', 'immobilier', 'm2', 'hesperange', 'investissement', '2026'],
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    imageAlt: 'Maisons residentielles dans la commune de Hesperange',
    relatedSlugs: ['howald-quartier-en-mutation', 'investir-hesperange-rendement-locatif', 'guide-complet-vivre-hesperange'],
    content: [
      { type: 'paragraph', content: 'Apres la phase de correction de 2023-2024, le marche immobilier luxembourgeois entre dans une periode de stabilisation. A Hesperange, les prix restent superieurs a la moyenne nationale (8 322 EUR/m2 en decembre 2025), refletant l\'attractivite de la commune. Voici l\'etat du marche section par section.' },
      { type: 'heading', content: 'Alzingen : la plus prisee' },
      { type: 'paragraph', content: 'Avec des prix affiches superieurs a 9 250 EUR/m2, Alzingen est la section la plus chere de la commune. Son cadre champetre, la presence de fermes luxembourgeoises renovees et ses grandes parcelles attirent une clientele exigeante a la recherche de caractere et d\'espace.' },
      { type: 'heading', content: 'Hesperange (chef-lieu) : la valeur sure' },
      { type: 'paragraph', content: 'Le chef-lieu affiche des prix entre 9 150 et 9 200 EUR/m2. La proximite du lac, du parc communal et des commerces en fait la section la plus equilibree pour les familles. L\'offre est diversifiee : appartements en residence, maisons mitoyennes et quelques villas.' },
      { type: 'heading', content: 'Itzig : entre village et ville' },
      { type: 'paragraph', content: 'A 9 050-9 100 EUR/m2, Itzig offre un cadre de village avec un acces direct a Luxembourg-ville. La section attire les actifs qui veulent combiner calme residentiel et mobilite. Plusieurs residences neuves ont ete livrees recemment.' },
      { type: 'heading', content: 'Fentange : le plateau familial' },
      { type: 'paragraph', content: 'En dessous de 8 800 EUR/m2, Fentange reste plus accessible. Son plateau residentiel, a proximite immediate de la Cloche d\'Or, seduit les familles avec de grandes maisons et des jardins genereux. Un bon rapport qualite-espace pour le secteur.' },
      { type: 'heading', content: 'Howald : le potentiel' },
      { type: 'paragraph', content: 'Egalement sous la barre des 8 800 EUR/m2, Howald est la section ou le potentiel de revalorisation est le plus eleve. L\'arrivee du tram, le pole multimodal et les 45 000 m2 de projets mixtes vont transformer le quartier dans les deux a trois prochaines annees.' },
      { type: 'heading', content: 'Marche locatif' },
      { type: 'paragraph', content: 'Cote location, le loyer moyen au Luxembourg atteint 30,22 EUR/m2/mois (decembre 2025), en hausse de 5 % sur un an. A Hesperange, les rendements locatifs se situent autour de 3,5 a 4 %, portes par une demande constante de familles et de professionnels travaillant dans la capitale.' },
      { type: 'tip', content: 'Le credit d\'impot "Bellegen Akt Investisseur" offre jusqu\'a 20 000 EUR par personne pour les logements neufs destines a la location. Renseignez-vous aupres de votre notaire.' },
    ],
  },

  // === ARTICLE 8 : Transports ===
  {
    slug: 'se-deplacer-hesperange-tram-bus-velo',
    title: 'Se deplacer a Hesperange : tram, bus, velo et pistes cyclables',
    excerpt: 'Transports gratuits, tram a Howald, pistes cyclables le long de l\'Alzette : la mobilite est l\'un des atouts majeurs de Hesperange.',
    author: 'L\'equipe Fidelis',
    date: '2026-02-08',
    category: 'transports',
    tags: ['tram', 'bus', 'velo', 'piste cyclable', 'mobilite', 'hesperange'],
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
    imageAlt: 'Arret de bus dans la commune de Hesperange Luxembourg',
    relatedSlugs: ['howald-quartier-en-mutation', 'guide-complet-vivre-hesperange', 'parc-lac-hesperange-promenades-nature'],
    content: [
      { type: 'paragraph', content: 'Depuis mars 2020, tous les transports en commun du Luxembourg sont gratuits : bus, train et tram. Cette mesure, unique en Europe, profite particulierement aux residents de Hesperange qui se trouvent a quelques minutes de Luxembourg-ville.' },
      { type: 'heading', content: 'Le reseau de bus' },
      { type: 'paragraph', content: 'Plusieurs lignes de la Ville de Luxembourg (AVL) desservent la commune : les lignes 3, 4, 5, 23, 24, 28 et 29. Les bus RGTR completent le maillage pour les liaisons vers le reste du Grand-Duche. L\'application mobiliteit.lu permet de planifier tous les trajets.' },
      { type: 'heading', content: 'Le tram a Howald' },
      { type: 'paragraph', content: 'La station de tram Howald-Gare fonctionne deja sur des quais provisoires. L\'ouverture definitive du pole d\'echange est prevue pour le printemps 2026. Le tram relie Howald a la Cloche d\'Or et au centre de Luxembourg-ville en quelques minutes, gratuitement.' },
      { type: 'heading', content: 'La gare de Howald' },
      { type: 'paragraph', content: 'La gare CFL de Howald est desservie par les trains regionaux. Le futur pole d\'echange integrera la gare, le tram et un terminal de bus, creant une plateforme multimodale unique dans le sud du pays.' },
      { type: 'heading', content: 'Le velo et les pistes cyclables' },
      { type: 'list', content: 'La commune investit dans les mobilites douces :', items: [
        'Piste cyclable PC1 du Centre : Hesperange - Luxembourg Grund le long de l\'Alzette',
        'Piste cyclable d\'Itzig : liaison vers les quartiers est de la capitale',
        'Passerelle cyclable entre le P+R Sud et Gasperich (36,50 m de long)',
        'Pistes a revetement rouge entre Howald et la Cloche d\'Or (premiere au Luxembourg)',
        'Velos en libre-service et box securisees mBox aux arrets de transport',
      ]},
      { type: 'tip', content: 'Vous pouvez emmener gratuitement votre velo dans tous les transports en commun du Luxembourg : bus, train et tram.' },
      { type: 'heading', content: 'En voiture' },
      { type: 'paragraph', content: 'L\'autoroute A3 (Dudelange - Luxembourg) passe a proximite de Howald avec une bretelle d\'acces directe. Le centre de Luxembourg-ville est a 5-15 minutes en voiture selon la section et les conditions de trafic. Le P+R Howald offre des places de stationnement gratuites avec connexion tram.' },
    ],
  },

  // === ARTICLE 9 : Investissement locatif ===
  {
    slug: 'investir-hesperange-rendement-locatif',
    title: 'Investir a Hesperange : rendement locatif et fiscalite',
    excerpt: 'Rendements de 3,5 a 4,6 %, credit d\'impot investisseur, demande locative forte : pourquoi Hesperange est un choix strategique pour l\'investissement immobilier.',
    author: 'L\'equipe Fidelis',
    date: '2026-02-14',
    category: 'immobilier',
    tags: ['investissement', 'locatif', 'rendement', 'fiscalite', 'hesperange'],
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    imageAlt: 'Vue sur des residences a Hesperange Luxembourg',
    relatedSlugs: ['prix-immobilier-hesperange-2026', 'howald-quartier-en-mutation', 'guide-complet-vivre-hesperange'],
    content: [
      { type: 'paragraph', content: 'Le Luxembourg offre des rendements locatifs parmi les plus reguliers d\'Europe, autour de 4,6 % en moyenne nationale. A Hesperange, la proximite de Luxembourg-ville, la croissance demographique et les projets d\'infrastructure creent un cadre favorable a l\'investissement immobilier.' },
      { type: 'heading', content: 'Pourquoi Hesperange' },
      { type: 'list', content: 'Plusieurs facteurs rendent la commune attractive pour les investisseurs :', items: [
        'Demande locative constante : 54 % de population etrangere, renouvellement regulier des locataires',
        'Proximite de Luxembourg-ville : moins de 10 minutes du centre',
        'Infrastructures en developpement : tram, pole multimodal, nouveaux quartiers',
        'Cadre de vie recherche : parc, lac, ecoles, commerces',
        'Population en croissance : de 9 000 a 17 150 habitants en 30 ans',
      ]},
      { type: 'heading', content: 'Rendements par section' },
      { type: 'paragraph', content: 'Les rendements bruts varient selon les sections. Howald et Fentange, avec des prix d\'achat inferieurs, offrent des rendements bruts plus eleves (3,8 a 4,2 %). Hesperange et Alzingen, plus chers a l\'achat, se situent autour de 3,2 a 3,6 % mais avec un potentiel de plus-value superieur a moyen terme.' },
      { type: 'heading', content: 'Les incitations fiscales' },
      { type: 'list', content: 'Le Luxembourg propose plusieurs avantages fiscaux pour l\'investissement locatif :', items: [
        'Credit d\'impot "Bellegen Akt Investisseur" : jusqu\'a 20 000 EUR par personne pour les VEFA destinees a la location',
        'Amortissement accelere : 6 % par an pendant les 6 premieres annees',
        'Taxe sur les plus-values reduite a 10 % (au lieu de 20 %) sous conditions',
        'Deductibilite des interets d\'emprunt et des frais d\'entretien',
      ]},
      { type: 'heading', content: 'Le timing' },
      { type: 'paragraph', content: 'Apres la correction de 2023-2024, le marche luxembourgeois entre en phase de stabilisation. Les prix ont baisse de 5 a 8 % selon les segments, tandis que les loyers ont continue de progresser (+5 % sur un an). Ce decalage cree une fenetre d\'entree interessante pour les investisseurs a moyen-long terme.' },
      { type: 'quote', content: 'Pour un investisseur, la question n\'est pas de timer le point bas absolu du marche, mais de s\'assurer que les fondamentaux de la localisation — demande, transports, services — sont durablement solides. A Hesperange, c\'est le cas.' },
    ],
  },

  // === ARTICLE 10 : 10 raisons d'acheter ===
  {
    slug: '10-raisons-acheter-hesperange',
    title: '10 raisons d\'acheter a Hesperange plutot qu\'en ville',
    excerpt: 'Plus d\'espace, moins cher au m2, cadre verdoyant et meme temps de trajet : voici pourquoi de plus en plus de familles choisissent Hesperange.',
    author: 'L\'equipe Fidelis',
    date: '2026-02-16',
    category: 'vivre-a-hesperange',
    tags: ['acheter', 'hesperange', 'comparatif', 'luxembourg-ville', 'familles'],
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    imageAlt: 'Maison familiale avec jardin a Hesperange',
    relatedSlugs: ['guide-complet-vivre-hesperange', 'prix-immobilier-hesperange-2026', 'ecoles-creches-hesperange-guide-familles'],
    content: [
      { type: 'paragraph', content: 'Luxembourg-ville affiche des prix moyens de 10 645 EUR/m2. A Hesperange, on est entre 8 800 et 9 250 EUR/m2, soit 15 a 20 % de moins pour une commune situee a moins de 10 minutes du centre. Voici dix raisons concretes de franchir le pas.' },
      { type: 'heading', content: '1. Un prix au m2 plus accessible' },
      { type: 'paragraph', content: 'L\'ecart de prix avec Luxembourg-ville represente une economie de 150 000 a 300 000 EUR sur un bien de 100 m2. A surface egale, votre budget va plus loin a Hesperange.' },
      { type: 'heading', content: '2. Des jardins, de l\'espace' },
      { type: 'paragraph', content: 'A Hesperange, les maisons disposent de jardins de 300 a 1 000 m2 selon les sections. En ville, les exterieurs privatifs sont rares et petits.' },
      { type: 'heading', content: '3. Le lac et le parc au quotidien' },
      { type: 'paragraph', content: '11 hectares de verdure, un etang, le Hesper Beach Club en ete : un cadre de vie que Luxembourg-ville ne peut pas offrir.' },
      { type: 'heading', content: '4. Le tram arrive' },
      { type: 'paragraph', content: 'Avec le pole multimodal de Howald (printemps 2026), Hesperange sera connectee au reseau de tram. Le temps de trajet vers le centre-ville sera comparable a celui de nombreux quartiers de la capitale.' },
      { type: 'heading', content: '5. Les transports sont gratuits' },
      { type: 'paragraph', content: 'Bus, train, tram : tout est gratuit au Luxembourg. Pas de budget transport a prevoir, que vous habitiez en ville ou a Hesperange.' },
      { type: 'heading', content: '6. Des ecoles de qualite' },
      { type: 'paragraph', content: 'Ecoles fondamentales dans chaque section, maisons relais, creches : l\'offre scolaire est complete et les infrastructures ont ete agrandies recemment.' },
      { type: 'heading', content: '7. Une commune cosmopolite' },
      { type: 'paragraph', content: '129 nationalites, 54 % de residents etrangers : Hesperange offre le meme brassage culturel que la capitale, dans un cadre plus intime.' },
      { type: 'heading', content: '8. 20 minutes a velo du Grund' },
      { type: 'paragraph', content: 'La piste cyclable le long de l\'Alzette relie Hesperange au quartier du Grund en 20 minutes, en pleine nature. Mieux qu\'un trajet urbain.' },
      { type: 'heading', content: '9. Un potentiel de plus-value' },
      { type: 'paragraph', content: 'Les projets d\'infrastructure (tram, pole multimodal, nouveaux quartiers a Howald) vont valoriser l\'ensemble de la commune dans les annees a venir.' },
      { type: 'heading', content: '10. La qualite de vie' },
      { type: 'paragraph', content: 'Securite, proprete, espaces verts, proximite des services : Hesperange cumule les criteres qui comptent au quotidien, sans le bruit et la densite de la capitale.' },
    ],
  },
]

// === Fonctions utilitaires ===

export function getAllArticles(): ArticleData[] {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): ArticleData | undefined {
  return articles.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: ArticleCategory): ArticleData[] {
  return articles
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedArticles(article: ArticleData): ArticleData[] {
  return article.relatedSlugs
    .map(slug => articles.find(a => a.slug === slug))
    .filter((a): a is ArticleData => a !== undefined)
}

export function getAllArticleSlugs(): string[] {
  return articles.map(a => a.slug)
}
