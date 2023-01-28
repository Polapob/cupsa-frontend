import { ViewFriendResponse } from "../FriendService/type";
import filterDefineValue from "./filterDefineValue";

const friendDataAdapter = (friend: ViewFriendResponse) => {
  const {
    system_info: { consent_g1, consent_g2, consent_g3, consent_g4, consent_g5 },
    general_info,
    contact_info,
    education_info,
    address_info,
    office_info,
    available_data: availableData,
  } = friend;
  return {
    isShowGeneral: consent_g1 === "1",
    isShowContact: consent_g2 === "1",
    isShowEducation: consent_g3 === "1",
    isShowAddress: consent_g4 === "1",
    isShowOffice: consent_g5 === "1",
    generalInfo: filterDefineValue(general_info),
    contactInfo: filterDefineValue(contact_info),
    educationInfo: filterDefineValue(education_info),
    addressInfo: filterDefineValue(address_info),
    officeInfo: filterDefineValue(office_info),
    availableData,
  };
};

export type FriendDataAdapterResult = ReturnType<typeof friendDataAdapter>;

export default friendDataAdapter;
