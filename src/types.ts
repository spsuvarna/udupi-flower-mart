export interface Product { id:string; slug:string; name:string; productCode:string; categoryId:string; occasionIds:string[]; description:string; imagePath:string; additionalImagePaths:string[]; originalPrice:number; discountPrice:number; unit:string; minimumOrderQuantity:number; available:boolean; featured:boolean; sameDayDelivery:boolean; popularity:number }
export interface Category { id:string; name:string; description:string; emoji:string }
export interface Occasion { id:string; name:string; description:string }
export interface DeliveryArea { id:string; areaName:string; taluk:string; pinCodes:string[]; deliveryCharge:number; minimumOrderAmount:number; sameDayDelivery:boolean; estimatedDeliveryTime:string }
export interface Banner { id:string; title:string; subtitle:string; imagePath:string; ctaText:string; ctaLink:string }
export interface Testimonial { id:string; name:string; location:string; rating:number; quote:string }
export interface CartItem { productId:string; quantity:number }
export interface CustomerDetails { name:string; mobile:string; address:string; city:string; taluk:string; pinCode:string; landmark:string; deliveryDate:string; deliveryTime:string; occasion:string; instructions:string; paymentPreference:string }
export interface EnquiryDetails { name:string; mobile:string; functionType:string; functionDate:string; venue:string; requirements:string; expectedQuantity:string; budget:string; additionalInfo:string }
