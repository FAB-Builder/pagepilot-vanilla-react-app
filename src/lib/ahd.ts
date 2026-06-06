import AHDjs from 'ahdjs';
import 'ahdjs/build/css/index.css';

/**
 * The PagePilot API host. Matches the host used by the AHD admin app
 * (see the "Integrate PagePilot" dialog in ahd-fe).
 */
export const AHD_API_HOST = 'https://pagepilot.fabbuilder.com';

/**
 * Demo Application ID. Tours/banners/etc. in this playground are published
 * against this app, so the demos work out of the box with no input.
 */
export const DEMO_APPLICATION_ID = '64d2b934c6cfdc96aa3734c5';

export interface AhdInstance {
  initializeSiteMap: (refetch: boolean) => Promise<void>;
  showHighlights: (slug: string, refetch: boolean) => Promise<void>;
  showPageTour: (slug: string) => Promise<void>;
  renderAppBanner: (identifier: string, refetch: boolean) => Promise<unknown>;
  stop: (...args: unknown[]) => void;
}

export interface CreateAhdOptions {
  applicationId: string;
  visitorId?: string;
  showProgressbar?: boolean;
}

/**
 * Create an AHDjs client. Mirrors the snippet shown in the ahd-fe
 * "Configure AHDjs" integration dialog:
 *
 *   const ahdJs = new AHDjs(undefined, {
 *     applicationId: "YOUR_APPLICATION_ID",
 *     apiHost: "https://pagepilot.fabbuilder.com",
 *     visitorId: "visitor-id",
 *     showProgressbar: false,
 *   });
 *   ahdJs.initializeSiteMap();
 *   ahdJs.showHighlights("tours", true);
 */
export function createAhd({
  applicationId,
  visitorId = 'visitor-id',
  showProgressbar = false,
}: CreateAhdOptions): AhdInstance {
  return AHDjs(undefined, {
    applicationId,
    apiHost: AHD_API_HOST,
    visitorId,
    showProgressbar,
  }) as AhdInstance;
}
