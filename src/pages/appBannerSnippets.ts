import { AHD_API_HOST } from '../lib/ahd';

/**
 * The single React integration snippet shown in the Integration section.
 * The same code works for every banner type — only the identifier changes.
 */
export const REACT_CODE = `import { useEffect } from 'react';
import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

export default function BannerSlot() {
  useEffect(() => {
    const ahdJs = new AHDjs(undefined, {
      applicationId: 'YOUR_WORKSPACE_ID',
      apiHost: '${AHD_API_HOST}',
      // visitorId: the current logged-in user's ID from your platform.
      visitorId: currentUser.id,
      showProgressbar: false,
    });
    ahdJs.initializeSiteMap();
    // Renders into the <div id="FAB_BANNER_TYPE_SIMPLE" /> below.
    ahdJs.renderAppBanner('FAB_BANNER_TYPE_SIMPLE', true);
  }, []);

  // The container id must match the banner identifier.
  return <div id="FAB_BANNER_TYPE_SIMPLE" />;
}`;

/** Ready-made prompt for "Integrate using AI". */
export const AI_PROMPT = `Do the following steps automatically:

Install the ahdjs npm package.

Import AHDjs and its CSS (ahdjs/build/css/index.css) in the component that renders the banner.

Initialize AHDjs with the following configuration:

applicationId: "YOUR_WORKSPACE_ID"

apiHost: "${AHD_API_HOST}"

visitorId: "visitor-id"

showProgressbar: false

Render an empty container whose id matches the banner identifier, e.g. <div id="FAB_BANNER_TYPE_SIMPLE" />.

Call:

initializeSiteMap()

renderAppBanner("FAB_BANNER_TYPE_SIMPLE", true) // Replace the identifier with your banner's identifier.

Run the render inside a useEffect so it fires after the container is mounted.

Add brief comments explaining what each step does.`;
