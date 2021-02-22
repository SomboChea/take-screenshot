
import { useState, useCallback } from "react";
import { toPng, Options, toJpeg } from "html-to-image";
import { UseTakeScreenshotProps, ImgType } from "./types";

export const useTakeScreenshot = (options?: UseTakeScreenshotProps) => {
    const { ref } = options || {};
    const [image, setImage] = useState<string>();
    const [isLoading, setLoading] = useState(false);

    const takeScreenshot = useCallback(
        async (type?: ImgType, options?: Options) => {
            setLoading(true);
            let tempImage: string | undefined;

            try {
                const body = document.getElementById("main-app")!;

                if (type === "jpg") {
                    tempImage = await toJpeg(ref?.current || body, options);
                } else {
                    tempImage = await toPng(ref?.current || body, options);
                }

                setImage(tempImage);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);

                return tempImage;
            }
        },
        []
    );

    const clear = useCallback(() => setImage(undefined), []);

    return { image, takeScreenshot, isLoading, clear };
};

export default useTakeScreenshot;
