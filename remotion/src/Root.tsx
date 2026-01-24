import { Composition } from "remotion";
import { LandingPageVideo } from "./LandingPageVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LandingPageVideo"
        component={LandingPageVideo}
        durationInFrames={1140}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LandingPageVideo-Square"
        component={LandingPageVideo}
        durationInFrames={1140}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
