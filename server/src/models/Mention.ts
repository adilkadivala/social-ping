import mongoose, { Document, Schema } from 'mongoose';

export interface IMention extends Document {
  userId: mongoose.Types.ObjectId;
  keywordId: mongoose.Types.ObjectId;
  platform: 'twitter' | 'reddit';
  text: string;
  url: string;
  author: string;
  publishedAt: Date;
  isRead: boolean;
  sentiment?: 'positive' | 'negative' | 'neutral';
  createdAt: Date;
}

const MentionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  keywordId: {
    type: Schema.Types.ObjectId,
    ref: 'Keyword',
    required: true
  },
  platform: {
    type: String,
    enum: ['twitter', 'reddit'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedAt: {
    type: Date,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral'
  }
}, {
  timestamps: true
});

// Index for efficient querying
MentionSchema.index({ userId: 1, createdAt: -1 });
MentionSchema.index({ url: 1 }, { unique: true });

export default mongoose.model<IMention>('Mention', MentionSchema);