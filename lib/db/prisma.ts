import "dotenv/config";
import { PrismaClient } from "../../app/generated/prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

const prisma =
  globalThis.__prisma__ ??
  new PrismaClient({
    accelerateUrl: process.env.ACCELERATE_URL!,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma__ = prisma;
}

export { prisma };
export default prisma;
