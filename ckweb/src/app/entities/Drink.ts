
/**
 * Represents a cocktail
 */
export interface Drink {
    id: string;
    name: string;
    description: string;
    verified: number; // @todo boolean?
    totalIngredients?: number;
    ownedIngredients?: number;
    steps?: any;
    ingredients?: any;
}
