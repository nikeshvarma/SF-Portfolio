import { LightningElement } from "lwc";
import PROFILE_IMAGE from "@salesforce/resourceUrl/ProfileImage";

export default class PortfolioAbout extends LightningElement {
    
    profileImageUrl = PROFILE_IMAGE;
    fullName = "Nikesh Varma";
    intro = `Certified Salesforce Developer with 4 years of experience in Salesforce development and customization. Proficient in LWC, Apex, Async Apex,
Flows, Triggers, SOQL, Aura, and integrations. Adept at translating complex business requirements into scalable, functional solutions.
Experienced across multiple Salesforce Clouds, including Sales,
Experience, and Education, with a proven track record of delivering
high-quality solutions in dynamic environments.`;

    yearsExp = 4;
    projectsCount = 4;
    certCount = 5;
}