export interface SchoolInfoDTO {
  id: number;
  contents: string;
  pub_date: string;
  updated_at: string;
  created_by: string;
}

export interface SchoolInfoCreateDTO {
  contents: string;
  pub_date?: string;
  updated_at?: string;
}

export interface SchoolInfoUpdateDTO {
  contents?: string;
  pub_date?: string;
  updated_at?: string;
}

export interface SchoolInfoSearchDTO {
  contents_like?: string;
  created_by?: string;
}