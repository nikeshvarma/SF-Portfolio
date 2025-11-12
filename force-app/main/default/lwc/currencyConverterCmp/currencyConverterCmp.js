import { LightningElement, wire, track } from "lwc";
import { reduceErrors } from "c/ldsUtils";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getCurrencies from "@salesforce/apex/CurrencyRateService.getCurrencies";
import getConversion from "@salesforce/apex/CurrencyRateService.getConversion";

export default class CurrencyConverterCmp extends LightningElement {
    
    isLoading = false;
    amount = 100;
    fromCurrencyValue = "";
    toCurrencyValue = "";
    result = null;
    currencies;

    @track showCurrencyList = { from: false, to: false };
    @track currencySearchResult = { from: [], to: [] };

    @wire(getCurrencies)
    handleCurrencies({ error, data }) {
        if (error) {
            reduceErrors(error).forEach((err) => this.displayToastMessage("Error", err, "error"));
        } else if (data) {
            this.currencies = data;
            this.currencySearchResult = { from: data.slice(0, 5), to: data.slice(0, 5) };
        }
    }

    get currencyRecords() {
        return this.currencies || [];
    }

    get computeSldsIsOpenFrom() {
        return this.getComboboxClass("from");
    }

    get computeSldsIsOpenTo() {
        return this.getComboboxClass("to");
    }

    getComboboxClass(type) {
        return `slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${this.showCurrencyList[type] ? "slds-is-open" : ""}`;
    }

    toggleCurrencyDropdown(event) {
        const type = event.target.dataset.type;
        this.showCurrencyList = { ...this.showCurrencyList, [type]: !this.showCurrencyList[type] };
    }

    searchCurrency(event) {
        const type = event.target.dataset.type;
        const query = event.target.value.toLowerCase();

        if (type === "from") {
            this.fromCurrencyValue = event.target.value;
        } else {
            this.toCurrencyValue = event.target.value;
        }

        this.currencySearchResult = {
            ...this.currencySearchResult,
            [type]: this.currencyRecords.filter(function (item) {
                return item.Name.toLowerCase().includes(query) || item.ISOCode__c.toLowerCase().includes(query);
            })
        };
    }

    handleSelectedCurrency(event) {
        const { type, value } = event.currentTarget.dataset;

        if (type === "from") {
            this.fromCurrencyValue = value;
        } else {
            this.toCurrencyValue = value;
        }

        this.showCurrencyList = { ...this.showCurrencyList, [type]: false };
    }

    handleAmountChange(event) {
        this.amount = event.detail.value;
    }

    async handleConvert() {
        try {
            this.isLoading = true;
            this.result = await getConversion({ base: this.fromCurrencyValue, target: this.toCurrencyValue, amount: this.amount });
        } catch (error) {
            reduceErrors(error).forEach((err) => this.displayToastMessage("Error", err, "error"));
        } finally {
            this.isLoading = false;
        }
        console.log("Conversion:", this.result);
    }

    handleSwap() {
        [this.toCurrencyValue, this.fromCurrencyValue] = [this.fromCurrencyValue, this.toCurrencyValue];
        this.handleConvert();
    }

    displayToastMessage(title, message, type) {
        const event = new ShowToastEvent({ title: title, message: message, variant: type });
        this.dispatchEvent(event);
    }
}