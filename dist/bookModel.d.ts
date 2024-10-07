declare module './bookModel.js' {
    import { Document } from 'mongoose';

    export interface BookType extends Document {
        imageSrc?: string;
        ratingConverted: number;
        titleName: string;
        priceValue: number;
        signOfGBP?: string;
        fullLink?: string;
        description?: string;
        UPC?: string;
        stock?: number;
        genre?: string;
        wordsNumber?: number;
    }

    export const Book: mongoose.Model<BookType>;
}