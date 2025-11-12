public with sharing class VerifyPhoneCtrl {

    public static final String VERIFY_PHONE_NUMBER_FLOW = 'Verify_Phone_Number_ALF';

    @AuraEnabled(cacheable=true)
    public static VerifyPhoneOutputApexDefined verifyNumber(String country, String phoneNumber) {
        try {

            Map<String, Object> flowInputVars = new Map<String, Object>{ 'defaultCountry' => country, 'phoneNumber' => phoneNumber };
            Flow.Interview verifyPhoneNumberFlow = Flow.Interview.createInterview(VERIFY_PHONE_NUMBER_FLOW, flowInputVars);

            verifyPhoneNumberFlow.start();
            VerifyPhoneOutputApexDefined response = (VerifyPhoneOutputApexDefined) verifyPhoneNumberFlow.getVariableValue('CalloutResponse');

            if (response != null && response.error.status == 'error') {
                new AuraHandledException(response.error.message);
            } else {
                new AuraHandledException('Something went wrong.');
            }

            return response;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Country__c> getCountryCodes() {
        try {
            return [SELECT Id, Name, ISOCode__c, Prefix__c FROM Country__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}