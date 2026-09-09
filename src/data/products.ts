import type { Product } from '../types';
import { flowerPrices } from './prices';

export const products: Product[] = [
  {id:'p1',slug:'mallige-one-chendu',name:'Mallige — 1 Chendu',productCode:'UM-MLG-01',categoryId:'jasmine',occasionIds:['daily','festival','wedding','temple'],description:'One traditional Mallige chendu strand of fragrant Shankarapura jasmine. One chendu is ₹150; please order one day in advance.',imagePath:'/assets/products/mallige-chendu.png',additionalImagePaths:[],originalPrice:flowerPrices.malligeChendu.original,discountPrice:flowerPrices.malligeChendu.selling,unit:'chendu',minimumOrderQuantity:1,available:true,featured:true,sameDayDelivery:false,popularity:100},
  {id:'p2',slug:'jaaji-jasmine',name:'Jaaji (Jasmine)',productCode:'UM-JAJ-02',categoryId:'jasmine',occasionIds:['daily','festival','wedding','temple'],description:'Fresh, sweetly fragrant Jaaji flowers, traditionally tied for pooja, hair adornment and special occasions. Please order one day in advance.',imagePath:'/assets/products/jaaji.jpg',additionalImagePaths:[],originalPrice:flowerPrices.jaaji.original,discountPrice:flowerPrices.jaaji.selling,unit:'atte',minimumOrderQuantity:1,available:true,featured:true,sameDayDelivery:false,popularity:96},
  {id:'p3',slug:'mallige-one-atte-four-chendu',name:'Mallige — 1 Atte (4 Chendu)',productCode:'UM-MLG-04',categoryId:'jasmine',occasionIds:['daily','festival','wedding','temple'],description:'One full Mallige atte containing four traditional chendu strands. Today’s rate is ₹600; please order one day in advance.',imagePath:'/assets/products/mallige-atte.jpg',additionalImagePaths:[],originalPrice:flowerPrices.malligeAtte.original,discountPrice:flowerPrices.malligeAtte.selling,unit:'atte (4 chendu)',minimumOrderQuantity:1,available:true,featured:true,sameDayDelivery:false,popularity:98},
].map((product: Product) => ({
  ...product,
  imagePath: `${import.meta.env.BASE_URL}${product.imagePath.replace(/^\//, '')}`,
  additionalImagePaths: product.additionalImagePaths.map(path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`),
}));
