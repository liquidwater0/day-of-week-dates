import { useEffect, useRef } from "react";

export function useFirstRenderEffect(callback: () => void, dependencies: any[]) {
    const firstRender = useRef<boolean>(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        callback();
    }, dependencies);
}