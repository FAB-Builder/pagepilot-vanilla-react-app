import { useEffect, useRef, useState } from "react";
import AHDjs from "ahdjs";

const defaultBannerIdentifier = "";
const defaultApplicationId = "";

function App() {
  const ahdJSRef = useRef(null);
  const bannerContainerRef = useRef(null);
  const [applicationIdInput, setApplicationIdInput] =
    useState(defaultApplicationId);
  const [identifierInput, setIdentifierInput] = useState(
    defaultBannerIdentifier,
  );
  const [activeIdentifier, setActiveIdentifier] = useState(
    defaultBannerIdentifier,
  );


  const createAHDjs = (applicationId) => {
    ahdJSRef.current = AHDjs(undefined, {
      applicationId,
      apiHost: "https://pagepilot.fabbuilder.com",
      visitorId: "visitor-id",
      showProgressbar: false,
    });
    return ahdJSRef.current;
  };

  const renderBanner = async (identifier, applicationId) => {
    const nextIdentifier = identifier.trim();
    const nextApplicationId = applicationId.trim();

    if (!nextIdentifier) {
        return;
    }
    if (!nextApplicationId) {
      return;
    }

    setActiveIdentifier(nextIdentifier);

    const ahdJS = createAHDjs(nextApplicationId);
    await ahdJS.initializeSiteMap(false);

    await ahdJS.renderAppBanner(nextIdentifier, true);
  };

  useEffect(() => {
    void renderBanner(defaultBannerIdentifier, defaultApplicationId);
  }, []);

  const handleFetchBanner = (event) => {
    event.preventDefault();
    void renderBanner(identifierInput, applicationIdInput);
  };

  return (
    <main className="app">
      <div className="page-wrapper">
        <div className="card">
          <form className="banner-form" onSubmit={handleFetchBanner}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="application-id">Application ID</label>
                <input
                  id="application-id"
                  type="text"
                  value={applicationIdInput}
                  onChange={(event) =>
                    setApplicationIdInput(event.target.value)
                  }
                  placeholder="e.g. 68fe3656ea23fd016a4484e5"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <div className="field">
                <label htmlFor="banner-identifier">Banner Identifier</label>
                <input
                  id="banner-identifier"
                  type="text"
                  value={identifierInput}
                  onChange={(event) => setIdentifierInput(event.target.value)}
                  placeholder="e.g. CHANNEL_M"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="fetch-btn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Fetch Banner
              </button>
            </div>
          </form>
        </div>

        <div className="preview-section">
          <div className="preview-label">
            <span>Preview</span>
            {activeIdentifier && (
              <span className="preview-badge">{activeIdentifier}</span>
            )}
          </div>
          <div className="preview-card">
            <div id={activeIdentifier} ref={bannerContainerRef} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
