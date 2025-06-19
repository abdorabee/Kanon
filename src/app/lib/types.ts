export interface Issue {
  id: string;
  document_id: string;
  case_number: string;
  table_name: string;
  plaintiff_name: string;
  defendant_names: string[];
  judgment_or_decision_info: string;
  created_at: string;
}

export interface Document {
  id: string;
  file_name: string;
  file_hash: string;
  original_path: string;
  processed_path: string;
  chat_username: string;
  chat_id: string | number;
  processing_timestamp: string;
  header_block: {
    document_title: string;
    header: {
      organization_1: string;
      organization_2: string;
    };
    session_details: {
      date: string;
      day: string;
      session_open_time: string;
      session_close_time: string;
      circuit_number: string;
      presiding_judge: {
        name: string;
        role: string;
      };
      members_of_the_court: Array<{
        name: string;
        role: string;
      }>;
      attendees: Array<{
        name: string;
        role: string;
      }>;
    };
    footer: {
      form_number: string;
    };
  };
  created_at: string;
  download_url: string;
}

export interface DocumentWithIssues extends Document {
  issues: Issue[];
  total_issues: number;
}