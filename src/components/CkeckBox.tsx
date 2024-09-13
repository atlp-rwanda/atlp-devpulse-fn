import React, { forwardRef, useEffect, useRef } from "react";

const CkeckBox = forwardRef(
  ({ onclick, indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;
    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="w-[20px] h-[20px]"
          onClick={onclick}
        />
      </div>
    );
  }
);

export default CkeckBox;
