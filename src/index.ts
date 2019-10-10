import { useState } from "react";
import { OnChangeFn, OnChangeParam } from "slate-react";
import useTimeout from "@flaque/use-timeout";
import { Value } from "slate";
import { isEqual } from "lodash";

export default function useSlateLifecycle({
  onUserStartsTyping,
  onUserStopsTyping,
  timeout
}: {
  onUserStartsTyping: (change?: OnChangeParam) => any;
  onUserStopsTyping: (change?: OnChangeParam) => any;
  timeout?: number;
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [setTimeoutHook, clearTimeoutHook] = useTimeout();
  const [recentValue, setRecentValue] = useState<Value>();

  const onChange: OnChangeFn = change => {
    if (!isTyping) {
      // on the very first call of onChange don't do anything, just set the value and continue
      if (!recentValue) {
        setRecentValue(change.value);
        return;
      }

      // If we're just focusing the editor, we don't need to do anything, that's not typing.
      const ops = change.operations.toArray().map(e => e.get("type"));
      if (isEqual(ops, ["set_selection"])) {
        setRecentValue(change.value);
        return;
      }

      onUserStartsTyping(change);
      setIsTyping(true);
      setRecentValue(change.value);
      return;
    }

    clearTimeoutHook();

    setTimeoutHook(() => {
      onUserStopsTyping(change);
      setIsTyping(false);
    }, timeout || 500);
  };

  return [onChange];
}
