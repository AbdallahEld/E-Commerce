
export interface CartDetails {
    status: string;
    numOfCartItems: number;
    cartId: string;
    data: Cart;
}

export interface Cart {
    _id: string;
    cartOwner: string;
    products: CartProducts[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}

export interface CartProducts {
    count: number;
    _id: string;
    product: CartProduct;
    price: number;
}

export interface CartProduct {
    subcategory: Subcategory[];
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Category;
    ratingsAverage: number;
    id: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

