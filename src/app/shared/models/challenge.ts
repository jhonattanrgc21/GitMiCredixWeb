export interface Challenge {
  id: number;
  in_progress_name: string;
  in_progress_description: string;
  complete_description: string;
  start_date: string;
  end_date: string;
  image: string;
  goal_type: number;
  goal_qty: number;
  progress: number;
  completed: number;
}
