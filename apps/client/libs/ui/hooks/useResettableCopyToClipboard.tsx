import { useCopyToClipboard } from "react-use";
import { useCallback } from "react";

const useResettableCopyToClipboard = () => {
  const [copyState, copyToClipboard] = useCopyToClipboard();

  const resetCopyState = useCallback(() => {
    copyToClipboard("");
  }, [copyToClipboard]);

  return [copyState, copyToClipboard, resetCopyState] as const;
};

export default useResettableCopyToClipboard;
