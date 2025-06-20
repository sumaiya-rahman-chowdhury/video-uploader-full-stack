import mongoose, { model, Schema, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  heigth: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  videoUrl: string;
  thumbUrl: string;
  controls: boolean;
  description: string;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbUrl: { type: String, required: true },
    controls: { type: Boolean, required: true },
    transformation: {
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      height: { type: Number, default: VIDEO_DIMENSIONS.heigth },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video;
