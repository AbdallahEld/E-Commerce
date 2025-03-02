export interface allCategories {
    results: number;
    metadata: Metadata;
    data: Category[];
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}

