import { LightningElement } from "lwc";

export default class PortfolioSkills extends LightningElement {
    
    skills = [
        {
            name: "Lightning Web Components",
            level: 90,
            icon: "custom:custom63",
            tags: ["Lifecycle Hooks", "Lightning Data Service", "Lightning Message Service", "SLDS",],
            widthStyle: "width: 90%;"
        },
        {
            name: "Apex",
            level: 90,
            icon: "standard:apex",
            tags: ["Triggers", "Batch Apex", "Queueable", "Future Methods", "Governor Limits"],
            widthStyle: "width: 90%;"
        },
        {
            name: "Salesforce Flows",
            level: 85,
            icon: "standard:flow",
            tags: ["Record-Triggered", "Scheduled Flows", "Auto-Launched Flows", "Flow's Best Practices"],
            widthStyle: "width: 85%;"
        },
        {
            name: "Integration",
            level: 80,
            icon: "standard:data_integration_hub",
            tags: ["REST", "Apex Callouts", "Platform Events", "Async Apex", "OAuth"],
            widthStyle: "width: 80%;"
        }
    ];
}