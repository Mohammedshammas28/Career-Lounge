import mongoose from "mongoose";

const tickerItemSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => Date.now().toString(),
  },
  text: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: true,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
});

const tickerSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "global_ticker",
      unique: true,
    },
    items: [tickerItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Ticker || mongoose.model("Ticker", tickerSchema);
