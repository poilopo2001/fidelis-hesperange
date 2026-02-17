# Structure SEO complète — ÉDITIONS Hesperange

## 📋 Schémas JSON-LD implémentés

### 1. RealEstateListing (Annonces immobilières) - AVANCÉ
Chaque bien immobilier possède un schéma **ENRICHIE** avec :
- ✅ Titre, description, images
- ✅ Prix et devise (EUR) avec validité
- ✅ Surface, nombre de pièces/chambres
- ✅ Adresse précise (section, Luxembourg)
- ✅ Type de bien (House/Apartment)
- ✅ Type d'offre (Sale/Lease)
- ✅ Caractéristiques (amenityFeature)
- ✅ **Agence (broker) complète**
- ✅ **Équipements à proximité** (écoles, gare, hôpital)
- ✅ **Place/Zone desservie**
- ✅ Prix au m² calculé automatiquement

### 2. RealEstateAgent (Agence immobilière)
Schéma de l'agence avec :
- Nom, logo, coordonnées
- Adresse complète (45 Rue de Luxembourg, L-1818 Hesperange)
- Coordonnées GPS (lat: 49.5753, lng: 6.1403)
- Horaires d'ouverture
- Zone desservie (Hesperange + sections)
- Réseaux sociaux

### 3. Place/City (Localités) - ENRICHIES
Schéma pour chaque section avec données JSON :
- Hesperange (type: City) avec population
- Alzingen, Fentange, Itzig, Howald (type: Place)
- Contenu dans Hesperange
- **Écoles listées (containsPlace)**
- **Gare incluse**
- **Commerces**
- Démographie (population)

### 4. Dataset (Données immobilières)
Schéma Dataset pour les pages villes :
- Prix moyen au m²
- Tendance du marché
- Population
- Source : ÉDITIONS Hesperange

### 5. FAQPage - AUTO-GÉNÉRÉ
Questions/réponses automatiques par ville :
- Prix moyen au m²
- Nombre d'habitants
- Transports disponibles
- Écoles à proximité
- Temps de trajet vers Luxembourg

### 6. Service
Schéma Service pour chaque type (achat/location) par ville

### 7. BreadcrumbList (Fil d'Ariane)
Sur chaque page pour le référencement local

## 🏗️ Structure des URLs enrichies

### Pages principales
| URL | Type | Données affichées |
|-----|------|-------------------|
| `/` | Accueil | - |
| `/achat` | Liste globale | - |
| `/location` | Liste globale | - |

### Pages sections (RICHES EN DONNÉES)
| URL | Prix m² | Transports | Écoles | Population | FAQ |
|-----|---------|------------|--------|------------|-----|
| `/achat/alzingen` | ✅ 9 450 €/m² | ✅ Bus | ✅ École fondamentale | ✅ 3 100 hab. | ✅ |
| `/achat/fentange` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/achat/itzig` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/achat/howald` | ✅ 8 800 €/m² | ✅ Tram T1 + Gare | ✅ | ✅ 5 200 hab. | ✅ |
| `/location/...` | Idem | Idem | Idem | Idem | ✅ |

### Pages biens (ENRICHIES)
| Élément | Description |
|---------|-------------|
| Prix au m² du bien | Calculé automatiquement |
| Comparaison prix m² ville | "Bon deal !" ou "Au-dessus de la moyenne" |
| École à proximité | Nom de l'école fondamentale |
| Gare proche | Distance si applicable |
| Temps Luxembourg | Voiture/Tram/Train/Bus |
| Infos ville | Population, code postal, lien vers section |

## 📱 Métadonnées Open Graph & Twitter

Toutes les pages ont :
- `og:title` optimisé avec ville et type
- `og:description` avec données démographiques
- `og:image` (bien ou default)
- `og:locale`: fr_LU
- Twitter Cards : summary_large_image

## 🔍 SEO On-Page avancé

### Titres dynamiques
```
Acheter à Alzingen — ÉDITIONS Hesperange
Maison à Alzingen — 1 250 000 € — ÉDITIONS Hesperange
```

### Descriptions dynamiques
Incluent : prix m², population, temps de trajet

### Keywords par ville
- `{acheter/louer} {ville}`
- `maison {ville}`
- `prix m2 {ville}`
- `ecole {ville}`
- `gare {ville}`

## 🤖 Données JSON utilisées

### Fichiers publics
- `public/hesperange.json` - Données chef-lieu
- `public/alzingen.json` - Données Alzingen
- `public/fentange.json` - Données Fentange
- `public/itzig.json` - Données Itzig
- `public/howald.json` - Données Howald

### Données exploitées
```typescript
- demographique.population
- demographique.note
- immobilier.prix_moyen_m2_vente
- immobilier.tendance
- immobilier.variation_annuelle_pourcent
- transports.bus.lignes_principales
- transports.tram.ligne
- transports.train.gare
- transports.distances.luxembourg_centre
- education.ecoles_fondamentales
- education.maisons_relais
- education.creches
- commerces_services.supermarches
- sante.hopital_proche
- points_forts[]
```

## 🎯 Rich Snippets Google

Les pages peuvent apparaître avec :
- ⭐ Prix au m²
- 📍 Localisation
- 🚌 Transports
- 🏫 Écoles à proximité
- 📊 Tendance du marché
- ❓ FAQ (accordéon)

## 📊 Sitemap.xml

Génère automatiquement :
- 24+ URLs
- Priorités hiérarchiques
- Dernière modification
- Toutes les sections

## 🚀 Performance SEO

### Temps de chargement
- Données JSON chargées côté serveur (async)
- Pas de flickering
- Images Next.js optimisées

### Accessibilité
- Breadcrumbs HTML5 sémantiques
- aria-label sur les liens
- Structure heading logique

### Mobile-First
- Grille responsive
- Cartes prix optimisées mobile
- Navigation tactile

## 🎯 Stratégie de contenu

### Pages pilier
1. `/achat/hesperange` - Données complètes commune
2. `/achat/alzingen` à `/howald` - Données section

### Contenu unique par page
- Prix m² spécifique
- Transports différents (Tram T1 à Howald uniquement)
- Écoles spécifiques
- Points forts uniques

### Maillage interne
- Breadcrumb hiérarchique
- Lien "Voir tous les biens à {ville}"
- Navigation sections

## 🔐 Sécurité & Bonnes pratiques

### Données
- Chargement server-side uniquement
- Fallback si JSON manquant
- Pas d'exposition de données sensibles

### URLs
- Toutes en lowercase
- Sans espaces (kebab-case)
- Canoniques définies

## 📈 Suivi recommandé

### Google Search Console
- Vérifier rich results
- Surveiller requêtes : "prix m2 alzingen", "acheter howald"
- Indexation des pages sections

### KPIs à suivre
- Trafic organique par section
- CTR sur rich snippets
- Temps passé sur pages villes
- Taux de conversion par section

## 🆕 Fonctionnalités récentes

### Composant CityInfo
Affiche automatiquement :
- Carte prix m² avec tendance
- Stats population / temps trajet / écoles
- Points forts (6 max)
- Transports (bus/tram/train)
- Distances (Luxembourg, Cloche d'Or, Kirchberg)
- Éducation (écoles + maisons relais + crèches)
- Commerces & Services

### Comparaison prix
Sur chaque fiche bien :
- Prix m² du bien calculé
- Prix m² moyen de la ville
- Badge "Bon deal !" si en dessous de la moyenne

### Schémas avancés
- `generateAdvancedRealEstateListingSchema()` - Avec équipements proximité
- `generateAdvancedCitySchema()` - Avec écoles et services
- `generateCityRealEstateDatasetSchema()` - Dataset structuré
- `generateCityFAQSchema()` - FAQ auto-générées

---

**Dernière mise à jour**: Février 2026
**Version**: 2.0 - Données JSON intégrées
