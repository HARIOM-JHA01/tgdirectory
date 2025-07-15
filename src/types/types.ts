export interface BannerItem {
  id: string;
  slider_banner_title: string;
  slider_banner_image: string;
  slider_banner_img_alt: string;
  banner_type: string;
  slider_link: string;
  is_slider: string;
  slider_banner_lan: string;
  status: string;
  created_date: string;
  modified_date: string | null;
}

export interface BannerResponse {
  status: boolean;
  message: string;
  slider: BannerItem[];
}

export interface BottomBannerItem {
  id: string;
  gallery_title: string;
  gallery_type: string;
  gallery_image: string;
  gallery_img_alt: string;
  gallery_link: string;
  gallery_lan: string;
  status: string;
  created_date: string;
  modified_date: string | null;
}

export interface BottomBannerResponse {
  status: boolean;
  message: string;
  slider: BottomBannerItem[];
}

export interface LanguageItem {
  id: string;
  name: string;
  l_key: string;
  image: string;
  sort_order: string;
  status: string;
  created_date: string;
  modified_date: string;
}

export interface LanguageSelectorProps {
  onLanguageSelect?: (language: LanguageItem) => void;
}

export interface SubmittedLink {
  id: string;
  type: 'Channel' | 'Group';
  title: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  link: string;
}

export interface FeatureListing {
  id: string;
  link: string;
  startDate: string | null;
  expireDate: string | null;
  days: number;
  country: string;
  type: 'Channel' | 'Group';
  title: string;
  status: 'Running' | 'Expired';
}

export interface Ticket {
  type: 'Diamond' | 'Platinum';
  quantity: number;
  price: number;
  iconType: 'star' | 'telegram';
}

export interface TicketHistoryItem {
  id: string;
  packageTitle: string;
  price: string;
  ticketQuantity: number;
  paymentMode: string;
  date: string;
  status: string;
}

export interface ChannelItem {
  id: string;
  name: string;
  icon: string;
  link: string;
}