// app/admin/emails/types.ts
export interface SupportEmail {
  id: string;
  from_email: string;
  from_name: string;
  subject: string;
  message_text: string;
  received_at: Date;
  wcu_number?: string;
  status: "unread" | "read" | "replied" | "archived";
}

export interface EmailReply {
  id: string;
  message_text: string;
  created_at: string;
  current_status: "pending" | "sent" | "delivered" | "bounced";
}
