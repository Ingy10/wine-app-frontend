import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaticService {
  wineStyles = ['Red', 'White', 'Rose', 'Orange'];
  countries = [
    'Argentina',
    'Canada',
    'France',
    'Italy',
    'Portugal',
    'Spain',
    'USA',
  ];
  provincesCanada = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
  ];
  statesUSA = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  provincesArgentina = [
    'Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán',
  ];
  provincesItaly = [
    'Abruzzo',
    'Basilicata',
    'Calabria',
    'Campania',
    'Emilia-Romagna',
    'Friuli Venezia Giulia',
    'Lazio',
    'Liguria',
    'Lombardia',
    'Marche',
    'Molise',
    'Piemonte',
    'Puglia',
    'Sardegna',
    'Sicilia',
    'Toscana',
    'Trentino-Alto Adige',
    'Umbria',
    "Valle d'Aosta",
    'Veneto',
  ];
  provincesFrance = [
    'Auvergne-Rhône-Alpes',
    'Bourgogne-Franche-Comté',
    'Bretagne',
    'Centre-Val de Loire',
    'Corse',
    'Grand Est',
    'Hauts-de-France',
    'Île-de-France',
    'Normandie',
    'Nouvelle-Aquitaine',
    'Occitanie',
    'Pays de la Loire',
    "Provence-Alpes-Côte d'Azur",
  ];
  provincesPortugal = [
    'Alentejo',
    'Algarve',
    'Centro',
    'Lisboa',
    'Madeira',
    'Norte',
    'Açores',
  ];
  provincesSpain = [
    'Andalucía',
    'Aragón',
    'Asturias',
    'Baleares',
    'Canarias',
    'Cantabria',
    'Castilla-La Mancha',
    'Castilla y León',
    'Cataluña',
    'Comunidad de Madrid',
    'Comunidad Valenciana',
    'Extremadura',
    'Galicia',
    'La Rioja',
    'Navarra',
    'País Vasco',
    'Región de Murcia',
    'Ceuta',
    'Melilla',
  ];
  body = ['Light', 'Medium', 'Full'];
  sugar = ['Dry', 'Off Dry', 'Semi Sweet', 'Sweet'];
  acidity = ['Low', 'Medium', 'High'];
  tanins = ['None', 'Soft', 'Moderate', 'Firm'];
  characteristics = [
    'Fruity',
    'Earthy',
    'Floral',
    'Spicy',
    'Oaky',
    'Buttery',
    'Crisp',
    'Rich',
    'Bold',
    'Smooth',
    'Velvety',
    'Tannic',
    'Citrusy',
    'Jammy',
    'Mineral',
    'Elegant',
    'Complex',
    'Herbaceous',
    'Smoky',
    'Nutty',
    'Zesty',
    'Refreshing',
    'Aromatic',
    'Structured',
    'Lush',
    'Age-Worthy',
  ];
  sampleWines = [
    {
      id: 4,
      wineName: 'Cruisy Cab',
      winery: 'Napa Winery',
      vintage: '2018',
      wineStyle: 'Red',
      varietal: 'Cabernet Sauvignon',
      region: 'Napa Valley',
      subRegion: 'Sonoma',
      country: 'USA',
      provinceState: 'California',
      price: 45.99,
      body: 'Full',
      sugar: 'Dry',
      alcoholContent: 14.5,
      acidity: 'Medium',
      tannins: 'Firm',
      tastingNotes: 'Blackcurrant, Cedar, Jam, Plum, Stone',
      characteristics: '',
      servingTemp: '15-18°C',
      foodPairings: 'Steak, Lamb, Hard Cheeses',
    },
    {
      id: 5,
      wineName: 'Velvet Merlot',
      winery: 'Sonoma Estates',
      vintage: '2020',
      wineStyle: 'Red',
      varietal: 'Merlot',
      region: 'Sonoma Valley',
      subRegion: 'Dry Creek',
      country: 'USA',
      provinceState: 'California',
      price: 38.5,
      body: 'Medium',
      sugar: 'Dry',
      alcoholContent: 13.8,
      acidity: 'Medium-High',
      tannins: 'Soft',
      tastingNotes: 'Cherry, Vanilla, Cocoa, Blackberry, Cedar',
      characteristics: '',
      servingTemp: '15-18°C',
      foodPairings: 'Roast Chicken, Pasta, Soft Cheeses',
    },
    {
      id: 6,
      wineName: 'Golden Chardonnay',
      winery: 'Coastal Vineyards',
      vintage: '2019',
      wineStyle: 'White',
      varietal: 'Chardonnay',
      region: 'Central Coast',
      subRegion: 'Santa Barbara',
      country: 'USA',
      provinceState: 'California',
      price: 29.99,
      body: 'Full',
      sugar: 'Dry',
      alcoholContent: 13.5,
      acidity: 'Medium',
      tannins: 'None',
      tastingNotes: 'Buttery, Citrus, Vanilla, Peach, Oak',
      characteristics: '',
      servingTemp: '10-12°C',
      foodPairings: 'Grilled Fish, Creamy Pasta, Brie Cheese',
    },
    {
      id: 7,
      wineName: 'Zesty Zinfandel',
      winery: 'Old Vine Cellars',
      vintage: '2021',
      wineStyle: 'Red',
      varietal: 'Zinfandel',
      region: 'Lodi',
      subRegion: 'Mokelumne River',
      country: 'USA',
      provinceState: 'California',
      price: 32.75,
      body: 'Full',
      sugar: 'Off-Dry',
      alcoholContent: 15.2,
      acidity: 'Medium',
      tannins: 'Moderate',
      tastingNotes: 'Raspberry, Spice, Pepper, Jammy, Tobacco',
      characteristics: '',
      servingTemp: '16-18°C',
      foodPairings: 'BBQ Ribs, Spicy Sausages, Aged Cheddar',
    },
    {
      id: 8,
      wineName: 'Douro Delight',
      winery: 'Quinta das Vinhas',
      vintage: '2019',
      wineStyle: 'Red',
      varietal: 'Touriga Nacional',
      region: 'Douro Valley',
      subRegion: 'Cima Corgo',
      country: 'Portugal',
      provinceState: 'Algarve',
      price: 45.0,
      body: 'Full',
      sugar: 'Dry',
      alcoholContent: 14.5,
      acidity: 'High',
      tannins: 'Firm',
      tastingNotes: 'Blackberry, Plum, Violet, Chocolate, Oak',
      characteristics: '',
      servingTemp: '16-18°C',
      foodPairings: 'Grilled Lamb, Aged Manchego, Beef Stew',
    },
    {
      id: 9,
      wineName: 'Malbec Majesty',
      winery: 'Bodega Los Andes',
      vintage: '2020',
      wineStyle: 'Red',
      varietal: 'Malbec',
      region: 'Mendoza',
      subRegion: 'Luján de Cuyo',
      country: 'Argentina',
      provinceState: 'La Pampa',
      price: 38.5,
      body: 'Full',
      sugar: 'Dry',
      alcoholContent: 14.0,
      acidity: 'Medium',
      tannins: 'Smooth',
      tastingNotes: 'Black Cherry, Cocoa, Vanilla, Leather, Smoke',
      characteristics: '',
      servingTemp: '16-18°C',
      foodPairings: 'Grilled Steak, Blue Cheese, Dark Chocolate',
    },
    {
      id: 10,
      wineName: 'Okanagan Elegance',
      winery: 'Silver Peak Vineyards',
      vintage: '2022',
      wineStyle: 'White',
      varietal: 'Riesling',
      region: 'Okanagan Valley',
      subRegion: 'Naramata Bench',
      country: 'Canada',
      provinceState: 'British Columbia',
      price: 27.99,
      body: 'Light',
      sugar: 'Off-Dry',
      alcoholContent: 12.5,
      acidity: 'High',
      tannins: 'Low',
      tastingNotes: 'Green Apple, Citrus, Honey, Mineral, Floral',
      characteristics: '',
      servingTemp: '8-10°C',
      foodPairings: 'Spicy Thai Cuisine, Roast Chicken, Goat Cheese',
    },
  ];
}
