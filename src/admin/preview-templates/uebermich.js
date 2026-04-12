import htm from "https://unpkg.com/htm@3.1.1/dist/htm.module.js?module";
const html = htm.bind(h);

export default function UeberMichPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const name = entry.getIn(["data", "name"]);
  const role = entry.getIn(["data", "role"]);
  const titles = entry.getIn(["data", "titles"]);
  const haltung = entry.getIn(["data", "haltung"]);
  const erfahrung = entry.getIn(["data", "erfahrung"]);
  const qualifikation = entry.getIn(["data", "qualifikation"]);
  const anspruch = entry.getIn(["data", "anspruch"]);

  const erfahrungList = erfahrung ? erfahrung.toJS() : [];
  const qualifikationList = qualifikation ? qualifikation.toJS() : [];

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
      </div>

      <!-- Name, Role, Titles -->
      <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style=${{ fontSize: "28px", color: "#1E2F4F", marginBottom: "8px" }}>${name}</h2>
          <p style=${{ fontSize: "18px", color: "#1E2F4F", marginBottom: "8px", fontWeight: 500 }}>${role}</p>
          <p style=${{ fontSize: "15px", color: "#666", fontStyle: "italic" }}>${titles}</p>
        </div>
      </div>

      <!-- Haltung -->
      ${haltung && html`
        <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
          <div style=${{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <h2 style=${{ fontSize: "24px", color: "#1E2F4F", marginBottom: "20px" }}>Haltung</h2>
            <p style=${{ fontSize: "17px", lineHeight: 1.7 }}>${haltung}</p>
          </div>
        </div>
      `}

      <!-- Erfahrung Timeline -->
      <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "24px", color: "#1E2F4F", textAlign: "center", marginBottom: "32px" }}>Berufserfahrung</h2>
          ${erfahrungList.map(
            (item) => html`
              <div style=${{
                display: "flex",
                gap: "20px",
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid #F3EFE7"
              }}>
                <div style=${{
                  minWidth: "120px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1E2F4F"
                }}>
                  ${item.period}
                </div>
                <div>
                  <p style=${{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>${item.title}</p>
                  ${item.desc && html`
                    <p style=${{ fontSize: "14px", color: "#666" }}>${item.desc}</p>
                  `}
                </div>
              </div>
            `
          )}
        </div>
      </div>

      <!-- Qualifikationen -->
      <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "24px", color: "#1E2F4F", textAlign: "center", marginBottom: "28px" }}>Qualifikationen</h2>
          <ul style=${{ listStyle: "none", padding: 0, margin: 0 }}>
            ${qualifikationList.map(
              (qual) => html`
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
                  <span>${qual}</span>
                </li>
              `
            )}
          </ul>
        </div>
      </div>

      <!-- Anspruch -->
      ${anspruch && html`
        <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
          <div style=${{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <blockquote style=${{
              fontSize: "19px",
              lineHeight: 1.7,
              fontStyle: "italic",
              color: "#1E2F4F",
              borderLeft: "4px solid #1E2F4F",
              paddingLeft: "24px",
              textAlign: "left",
              margin: 0
            }}>
              ${anspruch}
            </blockquote>
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
        <h2 style=${{ fontSize: "24px", marginBottom: "20px" }}>Lassen Sie uns sprechen.</h2>
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
