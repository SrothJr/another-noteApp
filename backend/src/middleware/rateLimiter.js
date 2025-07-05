import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success, reset } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({
        message: `Too many request. Try after ${Math.floor(
          (reset - Date.now()) / 1000
        )} seconds`,
      });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
