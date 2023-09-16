export type IBookFilterRequest = {
    searchTerm?: string;
    title?: string;
    author?: string;
    genre?: string;
    price?: number;
    publicationDate?: Date;
    categoryId?: string;
};
