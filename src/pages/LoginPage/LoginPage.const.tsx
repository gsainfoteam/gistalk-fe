export const SCOPES = [
  { field: "redirect_uri", value: import.meta.env.VITE_REDIRECT_URL },
  { field: "client_id", value: "gistalk" },
  { field: "scope", value: "openid profile email student_id offline_access" },
  { field: "response_type", value: "code" },
  { field: "prompt", value: "consent" },
];
