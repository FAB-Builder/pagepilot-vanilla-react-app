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

/**
 * FabBuilder lead API host. The lead endpoint is scoped to an application id:
 * `${LEAD_API_HOST}/tenant/{APPLICATION_ID}/lead`.
 */
export const LEAD_API_HOST = 'https://cs.fabbuilder.com/api';

/**
 * Placeholder shown in the docs / snippets in place of a real application id.
 */
export const LEAD_APPLICATION_ID = 'YOUR_WORKSPACE_ID';

/**
 * FAB CRM dashboard — where leads land and are managed.
 */
export const FAB_CRM_URL = 'https://cs.fabbuilder.com/';

/**
 * CS app general settings page — where a user finds their application id to
 * plug into the lead API URL.
 */
export const CS_GENERAL_SETTINGS_URL = 'https://cs.fabbuilder.com/settings/general_settings';

/** Builds the lead API base for a given application id. */
export const leadApiBase = (applicationId: string) =>
  `${LEAD_API_HOST}/tenant/${applicationId}`;

/**
 * Page Pilot content API host. The "fetch pages" endpoints are scoped to a
 * workspace id: `${PAGEPILOT_API_HOST}/tenant/{WORKSPACE_ID}/...`.
 */
export const PAGEPILOT_API_HOST = 'https://pagepilot.fabbuilder.com/api';

/**
 * Page Pilot app — where pages are authored and where a user finds their
 * workspace id for the fetch-pages API.
 */
export const PAGEPILOT_APP_URL = 'https://pagepilot.fabbuilder.com/tenant';

/**
 * Page Pilot groups configuration — where a user creates and manages the
 * groups they can filter pages by.
 */
export const PAGEPILOT_GROUPS_URL = 'https://pagepilot.fabbuilder.com/configurations/groups';

/** Builds the Page Pilot content API base for a given workspace id. */
export const pagePilotApiBase = (workspaceId: string) =>
  `${PAGEPILOT_API_HOST}/tenant/${workspaceId}`;

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
