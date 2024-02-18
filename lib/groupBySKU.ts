import { Product } from "@/typings/productTypings";

export function groupBySKU(products: Product[]): Record<string,Product[]> {
    return products.reduce((accumlator: Record<string,Product[]>, currentProduct: Product) => {
        const sku = currentProduct.meta.sku;

        if(!accumlator[sku]) {
            accumlator[sku] = [];
        }
        accumlator[sku].push(currentProduct);
        return accumlator;
    }, {});
}