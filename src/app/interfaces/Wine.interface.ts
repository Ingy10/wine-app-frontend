export interface Wine {
    id?: number;
    wineName: string;
    winery: string;
    vintage: string;
    wineStyle: string;
    varietal: string;
    region: string;
    subRegion: string;
    country: string;
    provinceState: string;
    price: number | null;
    
    // Wine characteristics
    body: string;
    sugar: string;
    alcoholContent: number | null;
    acidity: string;
    tannins: string;
    tastingNotes: string;
    characteristics: any;
    
    servingTemp: string;
    foodPairings: string;
  }