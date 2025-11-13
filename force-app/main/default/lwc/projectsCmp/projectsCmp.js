import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ProjectsCmp extends NavigationMixin(LightningElement) {

    navToCurrencyConverter() {
        this[NavigationMixin.Navigate]({ type: 'comm__namedPage', attributes: { name: 'Currency_Exchange__c' } });
    }

    navToPhoneVerify() {
        this[NavigationMixin.Navigate]({ type: 'comm__namedPage', attributes: { name: 'Verify_Phone_Number__c' } });
    }

}