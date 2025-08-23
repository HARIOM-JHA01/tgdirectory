import WebApp from "@twa-dev/sdk";

const user = WebApp.initDataUnsafe?.user;
export const telegramId = user?.id;
