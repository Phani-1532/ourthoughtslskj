
-- Add image_url to hero_slides
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS image_url text;

-- Create a security definer function to assign admin role (bypasses RLS)
CREATE OR REPLACE FUNCTION public.assign_admin_role(_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow if no admins exist yet (first user becomes admin)
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'admin');
  END IF;
END;
$$;
