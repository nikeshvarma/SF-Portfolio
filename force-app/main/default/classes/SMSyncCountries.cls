public without sharing class SMSyncCountries implements Database.Batchable<SObject>, Database.AllowsCallouts {

    public class SMCountryResponse {
        public List<CountryData> data;
    }

    public class CountryData {
        public String name;
        public Integer id;
        public String image_path;
    }

    public Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator([SELECT Id, Name FROM Country__c]);
    }

    public void execute(Database.BatchableContext BC, List<Country__c> scope) {

        List<Country__c> countriesToUpdate = new List<Country__c>();
        Set<String> names = new Set<String>();
        Map<String, String> countryNameToIdMap = new Map<String, String>();
        Map<String, String> countryNameToImageMap = new Map<String, String>();

        for (Country__c ctr : scope) {
            names.add(ctr.Name);
        }

        List<SMCountryResponse> countries = callSMCountriesApi(names);

        for (SMCountryResponse response : countries) {
            for (CountryData ctr : response.data) {
                countryNameToIdMap.put(ctr.name, String.valueOf(ctr.id));
                countryNameToImageMap.put(ctr.name, ctr.image_path);
            }
        }

        for (Country__c ctr : scope) {
            if (countryNameToIdMap.containsKey(ctr.Name)) {
                ctr.ExternalID__c = countryNameToIdMap.get(ctr.Name);
                ctr.Image__c = countryNameToImageMap.get(ctr.Name);
                countriesToUpdate.add(ctr);
            }
        }

        if (!countriesToUpdate.isEmpty()) {
            try {
                update countriesToUpdate;
            } catch (Exception e) {
                System.debug('Error updating countries: ' + e.getMessage());
            }
        }
    }

    public void finish(Database.BatchableContext BC) {
    }

    private List<SMCountryResponse> callSMCountriesApi(Set<String> countryNames) {

        List<SMCountryResponse> countryList = new List<SMCountryResponse>();
        Http http = new Http();
        HttpRequest req = new HttpRequest();

        String token = SportMonksApi__c.getOrgDefaults().Token__c;
        String countryListStr = String.join(new List<String>(countryNames), ',');
        String endpoint = 'callout:SportMonks/countries?api_token=' + token + '&filter[name]=' + EncodingUtil.urlEncode(countryListStr, 'UTF-8');

        req.setEndpoint(endpoint);
        req.setMethod('GET');

        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            Map<String, Object> response = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            countryList.add((SMCountryResponse) JSON.deserialize(res.getBody(), SMCountryResponse.Class));
        } else {
            System.debug('API call failed with status: ' + res.getStatus());
        }
        return countryList;
    }
}