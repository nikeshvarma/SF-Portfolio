import { LightningElement } from "lwc";

export default class PortfolioExperience extends LightningElement {
    experience = [
        {
            id: 1,
            title: "Associate Consultant",
            company: "Infosys Limited",
            start: "Jan 2025",
            end: "Present",
            responsibilities: [
                "Working on Salesforce Education Cloud implementation, tailoring solutions for higher education use cases.",
                "Developed multiple custom Lightning Web Components (LWCs) for student and faculty-facing features.",
                "Built advanced Salesforce Flows to automate admissions, enrollment and academic lifecycle processes.",
                "Leveraged Copado for deployment.",
                "Ensured best practices in Apex, LWC, and Flow development, focusing on performance and maintainability."
            ]
        },
        {
            id: 2,
            title: "Technical Support Engineer",
            company: "Salesforce India",
            start: "Aug 2024",
            end: "Dec 2025",
            responsibilities: [
                "Acted as the primary technical contact for enterprise customers, resolving high-priority platform issues.",
                "Investigated and reproduced customer-reported problems involving Apex, LWC, Flows, and integrations.",
                "Provided actionable recommendations to optimize performance, improve maintainability, and prevent recurrence.",
                "Delivered step-by-step technical guidance to reduce case resolution time and improve customer satisfaction."
            ]
        },
        {
            id: 3,
            title: "Salesforce Developer",
            company: "MindRuby Technologies",
            start: "Nov 2021",
            end: "Jun 2022",
            responsibilities: [
                "Contributed to the development of a community site utilizing Lightning Web Runtime, incorporating Lightning Web Components, Apex, and integration with external systems.",
                "Integrated the Smarty API service into Salesforce for automated address completion and geocode information gathering.",
                "Automated email processes using scheduled batch Apex and merge field email templates, resulting in a 60% reduction in manual effort.",
                "Reduced the complexity of Apex triggers, resulting in a 20% reduction in overall processing time.",
                "Worked with a cross-functional team to deliver scalable Salesforce solutions and enhance user experience."
            ]
        }
    ];

    get activeIndex() {
        const idx = (this.experience || []).findIndex((j) => j.isCurrent);
        return idx === -1 ? 0 : idx;
    }

    get processedExperience() {
        return (this.experience || []).map((job, index) => {
            return {
                ...job,
                itemClass: this.computeItemClass(index),
                assistiveText: this.getAssistiveText(index)
            };
        });
    }

    computeItemClass(index) {
        const base = "slds-progress__item";
        if (index === this.activeIndex) return `${base} slds-is-active`;
        if (index > this.activeIndex) return `${base} slds-is-completed`;
        return base;
    }

    getAssistiveText(index) {
        if (index === this.activeIndex) return "Current position";
        if (index > this.activeIndex) return "Previous position";
        return "Upcoming";
    }
}