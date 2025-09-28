import { useCopyToClipboard } from "react-use";
import { useCallback } from "react";

const useResettableCopyToClipboard = () => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const reset = useCallback(() => {
    copyToClipboard("");
  }, [copyToClipboard]);

  const copy = useCallback(
    (value: string) => {
      copyToClipboard(value);
    },
    [copyToClipboard]
  );

  return [state, copy, reset] as const;
};

export default useResettableCopyToClipboard;
