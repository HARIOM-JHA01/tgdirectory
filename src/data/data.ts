import { SubmittedLink, FeatureListing, Ticket, TicketHistoryItem, ChannelItem } from '../types/types';

// Sample data for MySubmittedLinks component
export const submittedLinks: SubmittedLink[] = [
  {
    id: '1',
    type: 'Channel',
    title: 'this is a channel',
    status: 'Approved',
    link: 'https://t.me/technetium3'
  },
  {
    id: '2',
    type: 'Channel',
    title: 'tickets test',
    status: 'Approved',
    link: 'https://t.me/gaurav'
  },
  {
    id: '3',
    type: 'Channel',
    title: 'channel test',
    status: 'Approved',
    link: 'https://t.me/davy_woo'
  }
];

// Sample data for MyFeatureListing component
export const featureListings: FeatureListing[] = [
  {
    id: '1',
    link: 'https://t.me/technetium3',
    startDate: null,
    expireDate: null,
    days: 7,
    country: 'Global',
    type: 'Channel',
    title: 'this is a channel',
    status: 'Expired'
  },
  {
    id: '2',
    link: 'https://t.me/davy_woo',
    startDate: null,
    expireDate: null,
    days: 7,
    country: 'Armenia',
    type: 'Channel',
    title: 'channel test',
    status: 'Expired'
  },
  {
    id: '3',
    link: 'https://t.me/davy_woo',
    startDate: null,
    expireDate: null,
    days: 14,
    country: 'Andorra',
    type: 'Channel',
    title: 'channel test',
    status: 'Expired'
  },
  {
    id: '4',
    link: 'https://t.me/technetium3',
    startDate: null,
    expireDate: null,
    days: 14,
    country: 'Belgium',
    type: 'Channel',
    title: 'this is a channel',
    status: 'Expired'
  }
];

// Sample data for BuyTickets component
export const availableTickets = 192;

export const tickets: Ticket[] = [
  {
    type: 'Diamond',
    quantity: 200,
    price: 1500,
    iconType: 'star'
  },
  {
    type: 'Platinum',
    quantity: 100,
    price: 750,
    iconType: 'star'
  },
  {
    type: 'Diamond',
    quantity: 300,
    price: 3000,
    iconType: 'telegram'
  },
  {
    type: 'Platinum',
    quantity: 150,
    price: 1500,
    iconType: 'telegram'
  }
];

// Sample data for TicketHistory component
export const ticketHistory: TicketHistoryItem[] = [
  {
    id: '1',
    packageTitle: 'P Platinum',
    price: '150.00 Toncoin',
    ticketQuantity: 100,
    paymentMode: 'Toncoin',
    date: '23/02/2024',
    status: 'Pending'
  },
  {
    id: '2',
    packageTitle: 'P Diamond',
    price: '200.00 Toncoin',
    ticketQuantity: 200,
    paymentMode: 'Toncoin',
    date: '23/02/2024',
    status: 'Pending'
  },
  {
    id: '3',
    packageTitle: 'P Diamond',
    price: '500.00 Toncoin',
    ticketQuantity: 200,
    paymentMode: 'Toncoin',
    date: '20/12/2023',
    status: 'Pending'
  },
  {
    id: '4',
    packageTitle: 'P Platinum',
    price: '300.00 Toncoin',
    ticketQuantity: 100,
    paymentMode: 'Toncoin',
    date: '20/12/2023',
    status: 'Pending'
  },
  {
    id: '5',
    packageTitle: 'P Diamond',
    price: '500.00 Toncoin',
    ticketQuantity: 200,
    paymentMode: 'Toncoin',
    date: '20/12/2023',
    status: 'Pending'
  },
  {
    id: '6',
    packageTitle: 'P Diamond',
    price: 'US $ 1800.00',
    ticketQuantity: 200,
    paymentMode: 'Paypal',
    date: '19/12/2023',
    status: 'Pending'
  }
];

// Sample data for FeaturedChannels component
export const featuredChannels: ChannelItem[] = [
  {
    id: '1',
    name: 'Israel Jewish News',
    icon: 'IJN',
    link: 'https://t.me/israeljewishnews'
  },
  {
    id: '2',
    name: 'Movie box',
    icon: 'telegram',
    link: 'https://t.me/moviebox'
  },
  {
    id: '3',
    name: 'Binance Killers ®',
    icon: 'telegram',
    link: 'https://t.me/binancekillers'
  },
  {
    id: '4',
    name: '12BowTV',
    icon: 'BK',
    link: 'https://t.me/12bowtv'
  },
  {
    id: '5',
    name: 'BITE ME! | Recipes | Tips',
    icon: 'food',
    link: 'https://t.me/biteme'
  }
];