export interface Issue {
  _id: string;
  document_id: string;
  case_number: string;
  table_name: string;
  plaintiff_name: string;
  defendant_names: string[];
  judgment_or_decision_info: string;
  created_at: string;
}