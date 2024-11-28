import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface PublishHandlerProps {
  onSubmit: () => void;
}

const PublishHandler: React.FC<PublishHandlerProps> = ({ onSubmit }) => {
  const searchParams = useSearchParams();
  const hasExecuted = useRef(false)

  useEffect(() => {
    if (hasExecuted.current) return; // 実行済みの場合は終了

    const publish = searchParams.get("publish");
    if (publish === "true") {
      onSubmit();
      hasExecuted.current = true; // 実行済みを記録
    }
  }, [searchParams, onSubmit]);

  return null
};

export default PublishHandler;
