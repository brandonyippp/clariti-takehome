export interface CsvRow {
  Id: string;
  Name: string;
  Description__c: string;
  Department__c: string;
  Category__c: string;
  Sub_Category__c: string;
  Type__c: string;
  Quantity__c: number;
  Unit_Price__c: number;
  reason?: string;
}
