import htm from "https://unpkg.com/htm@3.1.1/dist/htm.module.js?module";
const html = htm.bind(h);

export default function CoachingPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const subtitle = entry.getIn(["data", "subtitle"]);
  const intro = entry.getIn(["data", "intro"]);
  const targetGroup = entry.getIn(["data", "target_group"]);
  const schwerpunkte = entry.getIn(["data", "schwerpunkte"]);
  const haltung = entry.getIn(["data", "haltung"]);
  const ablauf = entry.getIn(["data", "ablauf"]);

  const targetList = targetGroup ? targetGroup.toJS() : [];
  const schwerpunkteList = schwerpunkte ? schwerpunkte.toJS() : [];
  const ablaufList = ablauf ? ablauf.toJS() : [];

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

      <!-- Target Groups -->
      <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "24px", color: "#1E2F4F", textAlign: "center", marginBottom: "28px" }}>Zielgruppen</h2>
          <ul style=${{ listStyle: "none", padding: 0, margin: 0 }}>
            ${targetList.map(
              (target) => html`
                <li style=${{
                  padding: "12px 16px",
                  fontSize: "16px",
                  background: "#FFFFFF",
                  marginBottom: "8px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <span style=${{ color: "#1E2F4F", fontWeight: 700 }}>-</span>
                  <span>${target}</span>
                </li>
              `
            )}
          </ul>
        </div>
      </div>

      <!-- Schwerpunkte -->
      <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "24px", color: "#1E2F4F", textAlign: "center", marginBottom: "32px" }}>Schwerpunkte</h2>
          <div style=${{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            ${schwerpunkteList.map(
              (sp) => html`
                <div style=${{
                  background: "#F3EFE7",
                  padding: "28px 20px",
                  borderRadius: "6px"
                }}>
                  <h3 style=${{ fontSize: "18px", color: "#1E2F4F", marginBottom: "16px" }}>${sp.title}</h3>
                  <ul style=${{ listStyle: "none", padding: 0, margin: 0 }}>
                    ${(sp.items || []).map(
                      (item) => html`
                        <li style=${{ padding: "4px 0", fontSize: "14px", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <span style=${{ color: "#1E2F4F", fontWeight: 700, flexShrink: 0 }}>-</span>
                          <span>${item}</span>
                        </li>
                      `
                    )}
                  </ul>
                </div>
              `
            )}
          </div>
        </div>
      </div>

      <!-- Haltung -->
      ${haltung && html`
        <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
          <div style=${{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <h2 style=${{ fontSize: "24px", color: "#1E2F4F", marginBottom: "20px" }}>Meine Haltung</h2>
            <p style=${{ fontSize: "17px", lineHeight: 1.7, fontStyle: "italic" }}>${haltung}</p>
          </div>
        </div>
      `}

      <!-- Ablauf -->
      <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "24px", color: "#1E2F4F", textAlign: "center", marginBottom: "32px" }}>Ablauf</h2>
          ${ablaufList.map(
            (step, i) => html`
              <div style=${{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "20px"
              }}>
                <div style=${{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#1E2F4F",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "16px",
                  flexShrink: 0
                }}>
                  ${i + 1}
                </div>
                <p style=${{ fontSize: "16px", lineHeight: 1.6, paddingTop: "6px" }}>${step}</p>
              </div>
            `
          )}
        </div>
      </div>

      <!-- CTA -->
      <div style=${{
        background: "#1E2F4F",
        color: "#FFFFFF",
        padding: "48px 24px",
        textAlign: "center"
      }}>
        <h2 style=${{ fontSize: "24px", marginBottom: "20px" }}>Bereit fuer den ersten Schritt?</h2>
        <span style=${{
          display: "inline-block",
          background: "#FFFFFF",
          color: "#1E2F4F",
          padding: "14px 32px",
          borderRadius: "4px",
          fontWeight: 600,
          fontSize: "16px"
        }}>
          Erstgespraech vereinbaren
        </span>
      </div>

    </div>
  `;
}
