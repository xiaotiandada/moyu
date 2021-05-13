import { useSelector } from "react-redux";
import { selectMode } from '../store/userSlice';

export default function useIsDarkMode(): boolean {
  const storeThemeMode: any = useSelector(selectMode)
  return storeThemeMode !== 'defaultMode'
}