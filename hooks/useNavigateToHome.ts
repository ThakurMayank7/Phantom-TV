import { useRouter } from 'next/navigation';
import { useVideoStore } from '@/store/VideoStore';

export function useNavigateToHome() {
  const router = useRouter();
  const clearVideo = useVideoStore((state) => state.clearVideo);

  const go = () => {
    clearVideo();
    router.push("/");
  };

  return go;
}