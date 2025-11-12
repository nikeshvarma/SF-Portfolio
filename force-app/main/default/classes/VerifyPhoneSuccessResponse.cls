public class VerifyPhoneSuccessResponse {
    @AuraEnabled public String status;
    @AuraEnabled public String phone;
    @AuraEnabled public Boolean phone_valid;
    @AuraEnabled public String phone_type;
    @AuraEnabled public String phone_region;
    @AuraEnabled public String country;
    @AuraEnabled public String country_code;
    @AuraEnabled public String country_prefix;
    @AuraEnabled public String international_number;
    @AuraEnabled public String local_number;
    @AuraEnabled public String e164;
    @AuraEnabled public String carrier;
}