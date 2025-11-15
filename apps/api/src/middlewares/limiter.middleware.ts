import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: {
    status_code: 429,
    message: "Too many requests, please try again later.",
  },
});
