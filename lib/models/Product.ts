import mongoose, { Schema, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    name:            { type: String, required: true },
    slug:            { type: String, required: true, unique: true },
    description:     { type: String, required: true },
    category:        { type: String, required: true },
    images:          [{ type: String }],
    price:           { type: Number, required: true },
    originalPrice:   { type: Number },
    discountPercent: { type: Number },
    sizes:           [{ type: String }],
    colors: [{
      name: { type: String },
      hex:  { type: String },
    }],
    stock:        { type: Number, default: 0 },
    rating:       { type: Number, default: 0 },
    reviewCount:  { type: Number, default: 0 },
    isFeatured:   { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isTrending:   { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

/**
 * Guard against model re-registration during Next.js hot reload.
 * Use the existing model if it has already been compiled.
 */
export const ProductModel =
  models.Product ?? mongoose.model('Product', ProductSchema);
