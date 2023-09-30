import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rvmpobnbneovqunkgfmo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bXBvYm5ibmVvdnF1bmtnZm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwNjY2NTUsImV4cCI6MjAxMTY0MjY1NX0.gbNR64A8a7gva6FI4Mmviy-W5PRM9AwZuf1d2hxL_Xc"
);
