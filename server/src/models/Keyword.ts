import mongoose, { Document, Schema } from 'mongoose';

export interface IKeyword extends Document {
  userId: mongoose.Types.ObjectId;
  keyword: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const KeywordSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  keyword: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate keywords per user
KeywordSchema.index({ userId: 1, keyword: 1 }, { unique: true });

export default mongoose.model<IKeyword>('Keyword', KeywordSchema);