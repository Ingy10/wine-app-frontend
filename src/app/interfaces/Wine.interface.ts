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
    price: number;
    
    // Wine characteristics
    body: string;
    sugar: string;
    alcoholContent: number;
    acidity: string;
    tannins: string;
    
    // Tasting notes
    tastingNote1: string;
    tastingNote2?: string;
    tastingNote3?: string;
    tastingNote4?: string;
    tastingNote5?: string;
    
    servingTemp: string;
    foodPairings: string; // Comma-separated list of food pairings
  }