export const bookFilterableFields: string[] = [
    'title',
    'author',
    'genre',
];

export const bookSearchableFields: string[] = [
    'title',
    'author',
    'genre',
    'id'
];

export const bookRelationalFields: string[] = [
    'category',
    'reviewAndRatings'
];

export const bookRelationalFieldsMapper: { [key: string]: string } = {
    category: 'category',
    reviewAndRatings: 'reviewAndRatings',
};
