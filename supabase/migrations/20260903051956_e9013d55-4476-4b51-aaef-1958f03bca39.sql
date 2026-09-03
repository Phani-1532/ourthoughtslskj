REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.assign_admin_role(uuid) FROM PUBLIC, anon, authenticated;

CREATE POLICY "Users can read their own role" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());