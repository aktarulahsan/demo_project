import { InvoiceDetails } from "./InvoiceDetails.Model";

export class InvoiceMaster {
id?: number;
invoiceNumber?: string;
invoiceDate?: Date;
customerName?: string;
totalAmount?: Number;
detailsList?: InvoiceDetails[];

}