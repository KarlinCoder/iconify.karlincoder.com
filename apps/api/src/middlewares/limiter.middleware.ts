import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});
