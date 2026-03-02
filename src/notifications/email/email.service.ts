import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendTicketConfirmation(email: string, ticketId: number) {
    console.log(
      `[EMAIL MOCK] To: ${email} | Subject: Ticket Confirmed | TicketID: ${ticketId}`,
    );
    return true;
  }

  async sendTicketCancellation(email: string, ticketId: number) {
    console.log(
      `[EMAIL MOCK] To: ${email} | Subject: Ticket Cancelled | TicketID: ${ticketId}`,
    );
    return true;
  }
}
