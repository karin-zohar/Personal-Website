import { useEffect, useState } from "react";

type RefsMap = Record<string, React.RefObject<HTMLElement | null>>;

const useScrollSpy = (refs: RefsMap) => {
  const [activeKey, setActiveKey] = useState<string>("");

  useEffect(() => {
    if (!refs || Object.keys(refs).length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the first intersecting element
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          // find the visible element's key
          const key = Object.entries(refs).find(
            ([_key, ref]) => ref.current === visible.target
          )?.[0];

          if (key) {
            setActiveKey(key);
          }
        }
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    Object.values(refs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [refs]);

  return activeKey;
};

export default useScrollSpy;
