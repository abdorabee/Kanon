// Types for individuals (judges, members, attendees)
export interface Person {
  name: string;
  role: string;
}

// Session details (date, judges, attendees, etc.)
export interface SessionDetails {
  date: string; // Format: "YYYY/MM/DD"
  day: string; // Arabic day name (e.g., "الاربعاء")
  session_open_time: string | null;
  session_close_time: string | null;
  circuit_number: string;
  presiding_judge: Person;
  members_of_the_court: Person[];
  attendees: Person[];
}

// Header block (title, organizations, session details, footer)
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

// A single session (header block, file info, judgment)
export interface Session {
  header_block: HeaderBlock;
  document_id: string;
  file_name: string;
  file_hash: string; // SHA-256 hash
  created_at: string; // ISO timestamp (e.g., "2025-07-04T00:32:19.307000")
  final_judgment: string;
}

// Main case structure (renamed from Issue to Case for clarity)
export interface Case {
  case_number: string; // Format: "YYYY/XXX" (e.g., "2023/518")
  defendant_names: string[];
  plaintiff_name: string;
  table_name: string;
  sessions: Session[];
}

// API response structure (if paginated or wrapped in metadata)
export interface ApiResponse {
  case: Case; // Or `Case[]` if multiple cases are returned
  skip?: number;
  limit?: number;
}

// Keep Issue interface for backward compatibility
export interface Issue {
  // Legacy fields
  _id?: string;
  document_id?: string;
  judgment_or_decision_info?: string;
  created_at: string;
  last_updated?: string;
  
  // Core case information (same as Case)
  case_number: string;
  table_name: string;
  plaintiff_name: string;
  defendant_names: string[];
  
  // New API fields
  sessions: Session[];
}