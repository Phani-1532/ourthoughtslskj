/*
# Create chat_messages table for AI assistant

1. New Tables
- `chat_messages`
  - `id` (uuid, primary key)
  - `session_id` (uuid, identifies a conversation session, defaults to gen_random_uuid)
  - `role` (text, either 'user' or 'assistant')
  - `content` (text, the message content)
  - `created_at` (timestamptz, defaults to now)
- `chat_leads`
  - `id` (uuid, primary key)
  - `session_id` (uuid, links to a chat session)
  - `name` (text, visitor name)
  - `email` (text, visitor email)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD since this is a no-auth public chat widget.
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat_messages" ON chat_messages;
CREATE POLICY "anon_select_chat_messages" ON chat_messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages" ON chat_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_chat_leads" ON chat_leads;
CREATE POLICY "anon_select_chat_leads" ON chat_leads FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_leads" ON chat_leads;
CREATE POLICY "anon_insert_chat_leads" ON chat_leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_leads_session_id ON chat_leads(session_id);
