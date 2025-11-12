import { LightningElement, wire } from "lwc";
import { reduceErrors } from "c/ldsUtils";
import Toast from "lightning/toast";
import verifyNumber from "@salesforce/apex/VerifyPhoneCtrl.verifyNumber";
import getCountryCodes from "@salesforce/apex/VerifyPhoneCtrl.getCountryCodes";

const RESPONSE_BODY = {
    status: "",
    phone: "",
    phone_valid: "",
    phone_type: "",
    phone_region: "",
    country: "",
    country_code: "",
    country_prefix: "",
    international_number: "",
    local_number: "",
    e164: "",
    carrier: ""
};

const ERROR_BODY = {
    status: "",
    code: "",
    type: "",
    message: ""
};

export default class VerifyPhoneCmp extends LightningElement {

    isLoading = false;
    showCountryList = false;
    phoneNumber = "";
    selectedCountry = "";
    selectedPrefix = "";

    response = { ...RESPONSE_BODY };
    error = { ...ERROR_BODY };
    countryCodes = [];
    searchedCountryCodes = [];

    get isSuccess() {
        return this.response.status === "success";
    }

    get isError() {
        return this.error.status === "error";
    }

    get isValid() {
        return this.response?.phone_valid ? "Yes" : "No";
    }

    get computeSldsIsOpen() {
        return `slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${this.showCountryList ? "slds-is-open" : ""}`;
    }

    @wire(getCountryCodes)
    handleCountryCodes({ error, data }) {
        if (error) {
            reduceErrors(error).forEach((err) => this.displayToastMessage("Error", err, "error"));
        } else if (data) {
            this.countryCodes = data;
            this.searchedCountryCodes = this.countryCodes.slice(0, 5);
        }
    }

    toggleCountryDropdown() {
        this.showCountryList = !this.showCountryList;
    }

    searchCountry(event) {
        const query = event.target.value.toLowerCase();
        this.selectedPrefix = query;
        this.searchedCountryCodes = this.countryCodes.filter((item) => {
            return item.Name.toLowerCase().includes(query) || item.ISOCode__c.toLowerCase().includes(query) || item.Prefix__c.toLowerCase().includes(query);
        });
    }

    handleSelectedCountry(event) {
        this.selectedCountry = event.currentTarget.dataset.value;
        this.selectedPrefix = event.currentTarget.dataset.code;
        this.toggleCountryDropdown();
    }

    handleNumberChange(event) {
        this.phoneNumber = event.detail.value;
    }

    async handleVerify() {
        try {
            this.isLoading = true;
            const res = await verifyNumber({ country: this.selectedCountry, phoneNumber: this.phoneNumber });
            this.response = { ...this.response, ...res.response };
            console.log(structuredClone(this.response));
        } catch (error) {
            reduceErrors(error).forEach((err) => this.displayToastMessage("Error", err, "error"));
        } finally {
            this.isLoading = false;
        }
    }

    displayToastMessage(title, message, type) {
        Toast.show({ label: title, message: message, variant: type });
    }
}