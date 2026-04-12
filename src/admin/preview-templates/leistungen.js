import htm from "https://unpkg.com/htm@3.1.1/dist/htm.module.js?module";
const html = htm.bind(h);

export default function LeistungenPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const subtitle = entry.getIn(["data", "subtitle"]);
  const intro = entry.getIn(["data", "intro"]);
  const items = entry.getIn(["data", "items"]);
  const arbeitsweise = entry.getIn(["data", "arbeitsweise"]);

  const itemsList = items ? items.toJS() : [];

  return html`
    <div style=${{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#2B2B2B" }}>

      <!-- Page Hero -->
      <div style=${{
        background: "#1E2F4F",
        color: "#FFFFFF",
        padding: "64px 24px",
        textAlign: "center"
      }}>
        <h1 style=${{ fontSize: "32px", marginBottom: "12px", fontWeight: 700 }}>${title}</h1>
        <p style=${{ fontSize: "18px", opacity: 0.85 }}>${subtitle}</p>
      </div>

      <!-- Intro -->
      <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style=${{ fontSize: "17px", lineHeight: 1.7 }}>${intro}</p>
        </div>
      </div>

      <!-- Items Grid -->
      <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style=${{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            ${itemsList.map(
              (item) => html`
                <div style=${{
                  background: "#FFFFFF",
                  padding: "28px 20px",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                }}>
                  <h3 style=${{ fontSize: "18px", color: "#1E2F4F", marginBottom: "10px" }}>${item.title}</h3>
                  <p style=${{ fontSize: "14px", lineHeight: 1.6 }}>${item.text}</p>
                  <p style=${{ fontSize: "13px", color: "#1E2F4F", marginTop: "12px" }}>${item.link}</p>
                </div>
              `
            )}
          </div>
        </div>
      </div>

      <!-- Arbeitsweise -->
      ${arbeitsweise && html`
        <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
          <div style=${{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <h2 style=${{ fontSize: "24px", color: "#1E2F4F", marginBottom: "20px" }}>Arbeitsweise</h2>
            <p style=${{
              fontSize: "20px",
              fontWeight: 600,
              color: "#1E2F4F",
              letterSpacing: "1px"
            }}>${arbeitsweise}</p>
          </div>
        </div>
      `}

      <!-- CTA -->
      <div style=${{
        background: "#1E2F4F",
        color: "#FFFFFF",
        padding: "48px 24px",
        textAlign: "center"
      }}>
        <h2 style=${{ fontSize: "24px", marginBottom: "20px" }}>Lassen Sie uns ins Gespraech kommen.</h2>
        <span style=${{
          display: "inline-block",
          background: "#FFFFFF",
          color: "#1E2F4F",
          padding: "14px 32px",
          borderRadius: "4px",
          fontWeight: 600,
          fontSize: "16px"
        }}>
          Kontakt aufnehmen
        </span>
      </div>

    </div>
  `;
}
