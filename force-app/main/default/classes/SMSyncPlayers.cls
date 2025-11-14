public without sharing class SMSyncPlayers implements Queueable, Database.AllowsCallouts {
    
    Database.Cursor locator;
    private Integer position;

    private final Integer BATCH_SIZE = 1;
    private static Map<String, String> countryIdMap = new Map<String, String>();

    public SMSyncPlayers() {
        position = 0;
        locator = Database.getCursor('SELECT Id, Name, ExternalID__c FROM Country__c WHERE ExternalID__c != NULL');
    }

    public void execute(QueueableContext qc) {

        for (Country__c ctr : (List<Country__c>) locator.fetch(position, BATCH_SIZE)) {
            position++;
            countryIdMap.put(ctr.ExternalID__c, ctr.Id);
        }
        
        String countryExternalIds = String.join(countryIdMap.keySet(), ',').removeEnd(',');
        fetchPlayerRecords(countryExternalIds);
        enqueueThis();
    }

    private void fetchPlayerRecords(String countryExternalIds) {
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();

        String token = SportMonksApi__c.getOrgDefaults().Token__c;
        String calloutURL = 'Callout:SportMonks/players?api_token=' + token + '&filter[country_id]=' + countryExternalIds;

        req.setEndpoint(calloutURL);
        req.setMethod('GET');

        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            try {
                PlayerResponse response = (PlayerResponse) JSON.deserialize(res.getBody(), PlayerResponse.Class);
                upsertPlayers(response);
            } catch (Exception e) {
                System.debug('Error:' + e.getMessage());
            }
        }
    }

    private void upsertPlayers(PlayerResponse response) {
        
        List<Player__c> playerToUpsert = new List<Player__c>();

        for (Player ply : response.data) {
            Player__c plySObject = new Player__c();
            plySObject.Country__c = countryIdMap.get(String.valueOf(ply.country_id));
            plySObject.ExternalID__c = String.valueOf(ply.id);
            plySObject.FirstName__c = ply.firstname;
            plySObject.LastName__c = ply.lastname;
            plySObject.Gender__c = ply.gender;
            plySObject.Photo__c = ply.image_path;
            plySObject.BattingStyle__c = ply.battingstyle;
            plySObject.BowlingStyle__c = ply.bowlingstyle;

            if (ply.dateofbirth != '0000-00-00') {
                List<String> dateValues = ply.dateofbirth.split('-');
                plySObject.DateOfBirth__c = Date.newInstance(Integer.valueOf(dateValues[0]), Integer.valueOf(dateValues[1]), Integer.valueOf(dateValues[2]));
            }

            playerToUpsert.add(plySObject);
        }

        if (!playerToUpsert.isEmpty()) {
            Database.UpsertResult [] result = Database.upsert(playerToUpsert, Player__c.ExternalID__c, false);
            for (Database.UpsertResult res : result) {
                System.debug(res.getErrors());
            }
        }
    }

    private void enqueueThis() {
        if (position < locator.getNumRecords()) {
            System.enqueueJob(this);
        }
    }

    public class PlayerResponse {
        public List<Player> data;
    }

    public class Player {
        public String resoure;
        public Integer id;
        public Integer country_id;
        public String firstname;
        public String lastname;
        public String image_path;
        public String dateofbirth;
        public String gender;
        public String battingstyle;
        public String bowlingstyle;
        public Position positionInfo;
    }

    public class Position {
        public String name;
    }

}