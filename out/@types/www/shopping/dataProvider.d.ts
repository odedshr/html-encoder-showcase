export declare type ProductData = {
    id: string;
    name: string;
    image: string;
    cost: number;
    inStock: boolean;
};
export declare type Results = {
    count: number;
    items: ProductData[];
};
export declare function get(): Promise<Results>;
