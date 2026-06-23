import { AHD_API_HOST, DEMO_APPLICATION_ID } from '../lib/ahd';

/** The React integration snippet shown in the Integration section (simple banner). */
export const REACT_CODE = buildBannerCode('FAB_BANNER_TYPE_SIMPLE');

/** Per-type React snippet shown under each live demo. */
export function buildBannerCode(identifier: string) {
  return `import { useEffect } from 'react';
import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

export default function BannerSlot() {
  useEffect(() => {
    const ahdJs = new AHDjs(undefined, {
      applicationId: "${DEMO_APPLICATION_ID}",
      apiHost: "${AHD_API_HOST}",
      visitorId: 'visitor-id',
      showProgressbar: false,
    });
    ahdJs.initializeSiteMap();
    // Renders into the <div id="${identifier}" /> below.
    ahdJs.renderAppBanner("${identifier}", true);
  }, []);

  // The container id must match the banner identifier.
  return <div id="${identifier}" />;
}`;
}
