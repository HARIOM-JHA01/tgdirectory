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

export type ApiChannel = {
  sl_title: string;
  sl_description: string;
  sl_link: string;
  sl_avtar: string;
  sl_tag_1: string;
  sl_tag_2: string;
  sl_tag_3: string;
  sl_tag_4: string;
  sl_tag_5: string;
  sl_tag_6: string;
  sl_status: string;
  sl_type: string;
  sl_modified_date: string;
};