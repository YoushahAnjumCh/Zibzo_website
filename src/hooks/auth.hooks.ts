import { useSelector } from "react-redux";
import { AppState } from "../features/redux/store";

// Custom Hook
export function useAuth() {
  useSelector((store: AppState) => store.auth);

  return useSelector((store: AppState) => store.auth);
}

export function useAuthenticated() {
  return useSelector((store: AppState) => store.auth.isUserAuthenticated);
}
