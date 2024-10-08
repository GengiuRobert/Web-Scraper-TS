import mongoose, { Schema, Document } from 'mongoose';

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

const bookSchema = new Schema<BookType>({
    imageSrc: String,
    ratingConverted: { type: Number, required: true },
    titleName: { type: String, required: true },
    priceValue: { type: Number, required: true },
    signOfGBP: String,
    fullLink: String,
    description: String,
    UPC: String,
    stock: Number,
    genre: String,
    wordsNumber: Number
});

export const Book = mongoose.model<BookType>('Book', bookSchema);