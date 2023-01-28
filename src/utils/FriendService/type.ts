import { AxiosResponse } from "axios";

export type FriendResultTypes = {
  [key: string]: {
    student_id: string;
    full_name: string;
    generation_id: string;
    member_status: boolean;
    consent: string;
    can_view: boolean;
  };
};
export type PaginationMetadataTypes = {
  from: number;
  to: number;
  all: number;
};

export interface ISearchFriendsInterface {
  success: boolean;
  result: {
    data: FriendResultTypes;
    struct: PaginationMetadataTypes;
  };
}

export interface SystemInfo {
  student_id: string;
  member_id?: string;
  member_ref?: string;
  is_member: string;
  consent: string;
  consent_g1: string;
  consent_g2: string;
  consent_g3: string;
  consent_g4: string;
  consent_g5: string;
}

export interface GeneralInfo {
  tu_id: string;
  image_url: string;
  image_2_url: string;
  first_name: string;
  last_name: string;
  nick_name?: string;
  first_name_eng?: string;
  last_name_eng?: string;
  first_name_old?: string;
  last_name_old?: string;
  sex: string;
  prefix: string;
  job?: string;
  position?: string;
}

export interface ContactInfo {
  email?: string;
  mobile?: string;
  website?: string;
}

export interface EducationInfo {
  generation_id: string;
  m4_room_id?: string;
  m5_room_id?: string;
  m6_room_id?: string;
  education_detail?: string;
}

export interface AddressInfo {
  address1?: string;
  address2?: string;
  address_city?: string;
  address_district?: string;
  address_subdistrict?: string;
  address_phone?: string;
  address_postcode?: string;
  address_country?: string;
}

export interface OfficeInfo {
  office1?: string;
  office2?: string;
  office_city?: string;
  office_district?: string;
  office_subdistrict?: string;
  office_phone?: string;
  office_postcode?: string;
  office_country?: string;
}

export interface AvailableData {
  tu_id: string;
  image_url: string;
  image_2_url: string;
  first_name: string;
  last_name: string;
  sex: string;
  prefix: string;
  generation_id: string;
}

export interface ViewFriendResponse {
  system_info: SystemInfo;
  general_info: GeneralInfo;
  contact_info: ContactInfo;
  education_info: EducationInfo;
  address_info: AddressInfo;
  office_info: OfficeInfo;
  available_data: AvailableData;
}

export interface IViewFriendInterface {
  success: boolean;
  result: ViewFriendResponse;
}

export type SearchFriendsResponse = AxiosResponse<ISearchFriendsInterface, any>;
