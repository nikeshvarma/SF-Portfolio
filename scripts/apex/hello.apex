Http http = new Http();
HttpRequest req = new HttpRequest();
String countryList = 'india,australia';

String ENDPOINT_URL = 'Callout:SportMonks/countries?api_token=' + SportMonksApi__c.getOrgDefaults().Token__c  + '&filter[name]=' + countryList;

req.setEndpoint(ENDPOINT_URL);
req.setMethod('GET');

HttpResponse res = http.send(req);

if (res.getStatusCode() == 200) {
    
    System.debug(res.getBody());
    
    Map<String, Object> response = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
    List<Object> countries = (List<Object>) response.get('data');
    
    for (Object ctr : countries) {
        System.debug('Country: ' + ctr);
    }
}