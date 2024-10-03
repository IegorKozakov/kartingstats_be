import { Schema, model, Document } from "mongoose";

export interface IRaceState extends Document {
  lastUpdatedTS: number; // Timestamp as a number
  teams: Map<string, any>; // Teams as a map of key-value pairs
  pitlane: Array<Map<string, any>>; // Pitlane is an array of maps
}
const raceStateSchema = new Schema<IRaceState>(
  {
    lastUpdatedTS: {
      type: Number,
      required: true,
    },
    teams: {
      type: Map,
      of: Schema.Types.Mixed, // Allows any type of value for the teams object
    },
    pitlane: [
      {
        type: Map,
        of: Schema.Types.Mixed, // Allows any type of value for the pitlane array
      },
    ],
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create and export the Mongoose model
export const RaceState = model<IRaceState>("RaceState", raceStateSchema);
