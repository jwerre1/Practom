import { createClient } from "@supabase/supabase-js";

//const supabase_url = "https://ujfhzuvfzuezmcezojlp.supabase.co";

console.log(process.env);

export const supabase = createClient(
  process.env.VUE_APP_SUPABASE_URL,
  process.env.VUE_APP_SUPABASE_KEY
);
