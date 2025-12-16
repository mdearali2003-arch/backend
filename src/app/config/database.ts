// import mongoose from "mongoose";

// const connectDB = async (mongoUri: string) => {
//   if (!mongoUri) throw new Error("MONGO_URI is not provided");
//   await mongoose.connect(mongoUri, {
//     // options if needed
//   });
//   console.log("MongoDB connected");
// };

// export default connectDB;

import mongoose from "mongoose";

declare global {
  // allow global var in typescript
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const connectDB = async (mongoUri: string) => {
  if (!mongoUri) throw new Error("MONGO_URI is not provided");

  if (!global._mongoose) {
    global._mongoose = { conn: null, promise: null };
  }

  if (global._mongoose.conn) {
    // already connected
    return global._mongoose.conn;
  }

  if (!global._mongoose.promise) {
    global._mongoose.promise = mongoose
      .connect(mongoUri)
      .then((mongooseInstance) => mongooseInstance);
  }

  global._mongoose.conn = await global._mongoose.promise;
  console.log("MongoDB connected (cached)");
  return global._mongoose.conn;
};

export default connectDB;
