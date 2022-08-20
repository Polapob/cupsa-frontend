import { AxiosResponse } from "axios";
import { types, flow } from "mobx-state-tree";
import authService from "../../services/AuthService";
import { ILoginResponse } from "../../utils/AuthService/type";
import { LoginFormDataTypes } from "../../utils/Login/type";
import { defaultUserData, LoadingStatus } from "./type";
import { persist } from "mst-persist";

const UserResultModel = types.model({
  student_id: types.string,
  tu_id: types.string,
  member_id: types.optional(types.string, ""),
  member_ref: types.optional(types.string, ""),
  is_member: types.string,
  first_name: types.string,
  last_name: types.string,
  nick_name: types.string,
  first_name_eng: types.optional(types.string, ""),
  last_name_eng: types.optional(types.string, ""),
  first_name_old: types.optional(types.string, ""),
  last_name_old: types.optional(types.string, ""),
  sex: types.string,
  prefix: types.string,
  prefix_eng: types.string,
  picture: types.optional(types.string, ""),
  picture_name: types.optional(types.string, ""),
  picture_type: types.optional(types.string, ""),
  generation_id: types.string,
  m4_room_id: types.string,
  m5_room_id: types.string,
  m6_room_id: types.string,
  education_detail: types.string,
  email: types.string,
  email2: types.optional(types.string, ""),
  mobile: types.string,
  website: types.optional(types.string, ""),
  address1: types.string,
  address2: types.optional(types.string, ""),
  address_city_id: types.optional(types.string, ""),
  address_district_id: types.optional(types.string, ""),
  address_subdistrict_id: types.optional(types.string, ""),
  address_city: types.string,
  address_district: types.string,
  address_subdistrict: types.string,
  address_phone: types.optional(types.string, ""),
  address_postcode: types.string,
  address_country: types.string,
  job: types.optional(types.string, ""),
  position: types.optional(types.string, ""),
  office1: types.string,
  office2: types.optional(types.string, ""),
  office_city_id: types.optional(types.string, ""),
  office_district_id: types.optional(types.string, ""),
  office_subdistrict_id: types.optional(types.string, ""),
  office_city: types.string,
  office_district: types.string,
  office_subdistrict: types.string,
  office_phone: types.optional(types.string, ""),
  office_postcode: types.string,
  office_country: types.string,
  consent: types.string,
  consent_g1: types.string,
  consent_g2: types.string,
  consent_g3: types.string,
  consent_g4: types.string,
  consent_g5: types.string,
  consent_details: types.optional(types.string, ""),
  active: types.string,
  student_type: types.string,
  student_type_number: types.string,
  comment: types.optional(types.string, ""),
  create_time: types.string,
  create_by: types.string,
  update_time: types.string,
  update_by: types.string,
});

const User = types
  .model("User", {
    userData: types.optional(UserResultModel, defaultUserData),
    loadingStatus: types.enumeration<LoadingStatus>(Object.values(LoadingStatus)),
    errorMessage: types.string,
  })
  .views((self) => {
    return {
      get checkMemberStatus() {
        return Boolean(parseInt(self.userData.is_member));
      },
      get getFirstName() {
        return self.userData.first_name;
      },
    };
  })
  .actions((self) => {
    const login = flow(function* (loginBody: LoginFormDataTypes) {
      self.loadingStatus = LoadingStatus.LOADING;
      try {
        const response = (yield authService.login(loginBody)) as AxiosResponse<ILoginResponse, any> | undefined;
        self.loadingStatus = LoadingStatus.FINISH;
        if (response) {
          console.log("pass-this");
          const {
            data: {
              token,
              success,
              result: { student_id, first_name, is_member },
            },
          } = response;

          self.userData = { ...self.userData, student_id, first_name, is_member };
          return { success, token };
        }
        return undefined;
      } catch (error) {
        self.loadingStatus = LoadingStatus.ERROR;
      }
    });
    return { login };
  });

const userStore = User.create({
  loadingStatus: LoadingStatus.IDLE,
  errorMessage: "",
});

await persist("userStore", userStore, {
  jsonify: true,
});

export default userStore;
