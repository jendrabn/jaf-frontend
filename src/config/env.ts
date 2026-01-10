import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    APP_NAME: z.string(),
    APP_URL: z.string().url(),
    API_URL: z.string().url(),

    // Store
    STORE_ADDRESS: z.string(),
    STORE_PHONE: z.string(),
    STORE_WHATSAPP: z.string(),
    STORE_EMAIL: z.string().email(),
    STORE_LATITUDE: z.string().optional(),
    STORE_LONGITUDE: z.string().optional(),
    STORE_OPEN_HOURS: z.string(),

    // Social
    FACEBOOK_URL: z.string().optional().or(z.literal("")),
    INSTAGRAM_URL: z.string().optional().or(z.literal("")),
    TWITTER_URL: z.string().optional().or(z.literal("")),
    TIKTOK_URL: z.string().optional().or(z.literal("")),
    TELEGRAM_URL: z.string().optional().or(z.literal("")),
    YOUTUBE_URL: z.string().optional().or(z.literal("")),
    LINKEDIN_URL: z.string().optional().or(z.literal("")),

    // E-commerce
    SHOPEE_URL: z.string().optional().or(z.literal("")),
    TOKOPEDIA_URL: z.string().optional().or(z.literal("")),
    LAZADA_URL: z.string().optional().or(z.literal("")),
    BLIBLI_URL: z.string().optional().or(z.literal("")),

    // Feature flags
    FREE_SHIPPING_100K: z
      .string()
      .transform((val) => val === "true")
      .optional(),

    // Others
    GOOGLE_CLIENT_ID: z.string().optional(),
    FIREBASE_VAPID_KEY: z.string().optional(),
    MIDTRANS_ENV: z.string().optional(),
  });

  const envVars = {
    APP_NAME: import.meta.env.VITE_APP_NAME || "JAF Parfum's",
    APP_URL: import.meta.env.VITE_APP_URL || "https://www.jaf.co.id",
    API_URL: import.meta.env.VITE_API_URL || "https://api.jaf.co.id",

    STORE_ADDRESS: import.meta.env.VITE_STORE_ADDRESS,
    STORE_PHONE: import.meta.env.VITE_STORE_PHONE,
    STORE_WHATSAPP: import.meta.env.VITE_STORE_WHATSAPP,
    STORE_EMAIL: import.meta.env.VITE_STORE_EMAIL,
    STORE_LATITUDE: import.meta.env.VITE_STORE_LATITUDE,
    STORE_LONGITUDE: import.meta.env.VITE_STORE_LONGITUDE,
    STORE_OPEN_HOURS: import.meta.env.VITE_STORE_OPEN_HOURS,

    FACEBOOK_URL: import.meta.env.VITE_FACEBOOK_URL,
    INSTAGRAM_URL: import.meta.env.VITE_INSTAGRAM_URL,
    TWITTER_URL: import.meta.env.VITE_TWITTER_URL,
    TIKTOK_URL: import.meta.env.VITE_TIKTOK_URL,
    TELEGRAM_URL: import.meta.env.VITE_TELEGRAM_URL,
    YOUTUBE_URL: import.meta.env.VITE_YOUTUBE_URL,
    LINKEDIN_URL: import.meta.env.VITE_LINKEDIN_URL,

    SHOPEE_URL: import.meta.env.VITE_SHOPEE_URL,
    TOKOPEDIA_URL: import.meta.env.VITE_TOKOPEDIA_URL,
    LAZADA_URL: import.meta.env.VITE_LAZADA_URL,
    BLIBLI_URL: import.meta.env.VITE_BLIBLI_URL,

    FREE_SHIPPING_100K: import.meta.env.VITE_FREE_SHIPPING_100K,

    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    FIREBASE_VAPID_KEY: import.meta.env.VITE_FIREBASE_VAPID_KEY,

    MIDTRANS_ENV: import.meta.env.VITE_MIDTRANS_ENV,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}
`
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
