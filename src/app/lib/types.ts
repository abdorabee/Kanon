export interface Person {
  name: string;
  role: string;
}

export interface SessionDetails {
  date: string;
  day: string;
  session_open_time: string | null;
  session_close_time: string | null;
  circuit_number: string;
  presiding_judge: Person;
  members_of_the_court: Person[];
  attendees: Person[];
}

export interface HeaderBlock {
  document_title: string;
  header: {
    organization_1: string;
    organization_2: string;
  };
  session_details: SessionDetails;
  footer: {
    form_number: string;
  };
}

export interface Session {
  header_block: HeaderBlock;
  document_id: string;
  file_name: string;
  file_hash: string;
  created_at: string;
  final_judgment: string;
}

export interface Issue {
  // Legacy fields (kept for backward compatibility)
  _id?: string;
  document_id?: string;
  judgment_or_decision_info?: string;
  
  // Core case information
  case_number: string;
  table_name: string;
  plaintiff_name: string;
  defendant_names: string[];
  
  // New API fields
  sessions: Session[];
  created_at: string;
  last_updated: string;
}