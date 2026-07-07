import { Languages, X } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit?: () => void;
  }
}

export const FloatingGoogleTranslator = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elementId = "google_translate_element";
    let isMounted = true;

    const tidyGoogleMarkup = () => {
      const container = document.getElementById(elementId);

      if (!container) {
        return;
      }

      container.querySelectorAll(".goog-te-gadget").forEach((gadget, index) => {
        if (index > 0) {
          gadget.remove();
        }
      });

      container
        .querySelectorAll(".goog-te-gadget-simple")
        .forEach((gadget, index) => {
          if (index > 0) {
            gadget.remove();
          }
        });

      const languageButton = container.querySelector(".goog-te-gadget-simple");
      languageButton?.setAttribute("aria-label", "Select language");
    };

    const initializeGoogleTranslate = () => {
      const container = document.getElementById(elementId);

      if (!isMounted || !container || !window.google?.translate) {
        return;
      }

      container.innerHTML = "";

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,es,fr,de,it,pt,ru,ja,ko,zh-CN,zh-TW,ar,hi,bn,pa,te,mr,gu,kn,ml,or,ta,uk,pl,tr,nl,sv,da,fi,no,cs,sk,hu,ro,bg,hr,sr,sl,et,lt,lv,id,th,vi,my,km,lo,fa,he,ur",
          layout:
            window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        elementId
      );

      window.setTimeout(tidyGoogleMarkup, 300);
    };

    window.googleTranslateElementInit = initializeGoogleTranslate;

    if (window.google?.translate) {
      initializeGoogleTranslate();
      return () => {
        isMounted = false;
      };
    }

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.async = true;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="floating-translator-container">
      <button
        type="button"
        className="floating-translator-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen ? "Close language selector" : "Open language selector"
        }
        aria-expanded={isOpen}
        aria-controls="floating-translator-panel"
      >
        <Languages aria-hidden="true" size={24} strokeWidth={2.25} />
      </button>

      <div
        id="floating-translator-panel"
        className={`floating-translator-panel notranslate${isOpen ? " is-open" : ""}`}
        translate="no"
        aria-hidden={!isOpen}
      >
        <div className="floating-translator-panel-header">
          <div>
            <p className="floating-translator-panel-eyebrow">Translate</p>
            <h3 className="floating-translator-panel-title">Choose language</h3>
          </div>
          <button
            type="button"
            className="floating-translator-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close language selector"
          >
            <X aria-hidden="true" size={16} strokeWidth={2.5} />
          </button>
        </div>
        <div className="floating-translator-panel-content">
          <p className="floating-translator-help">
            Select your preferred language for this documentation.
          </p>
          <div id="google_translate_element" className="notranslate" translate="yes"></div>
        </div>
      </div>
    </div>
  );
};
