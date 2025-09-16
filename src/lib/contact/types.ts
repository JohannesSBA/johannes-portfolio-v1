export type ContactPayload = {
  name: string;
  email: string;
  brief: string;
  url?: string;
  stage?: string;
  deadline?: string;
  budget?: string;
};

export type ContactResponse = {
  ok: boolean;
  error?: string;
  details?: unknown;
};

