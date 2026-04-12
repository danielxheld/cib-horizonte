import htm from "https://unpkg.com/htm@3.1.1/dist/htm.module.js?module";
const html = htm.bind(h);

export default function KontaktPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const subtitle = entry.getIn(["data", "subtitle"]);
  const intro = entry.getIn(["data", "intro"]);
  const anliegenOptionen = entry.getIn(["data", "anliegen_optionen"]);

  const anliegenList = anliegenOptionen ? anliegenOptionen.toJS() : [];

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#FFFFFF"
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: 600,
    color: "#1E2F4F",
    marginBottom: "6px"
  };

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
      <div style=${{ background: "#FFFFFF", padding: "48px 24px" }}>
        <div style=${{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style=${{ fontSize: "17px", lineHeight: 1.7 }}>${intro}</p>
        </div>
      </div>

      <!-- Mock Form -->
      <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "600px", margin: "0 auto", background: "#FFFFFF", padding: "40px 32px", borderRadius: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

          <div style=${{ marginBottom: "20px" }}>
            <label style=${labelStyle}>Name</label>
            <input type="text" placeholder="Ihr Name" style=${inputStyle} disabled />
          </div>

          <div style=${{ marginBottom: "20px" }}>
            <label style=${labelStyle}>E-Mail</label>
            <input type="email" placeholder="Ihre E-Mail-Adresse" style=${inputStyle} disabled />
          </div>

          <div style=${{ marginBottom: "20px" }}>
            <label style=${labelStyle}>Anliegen</label>
            <select style=${inputStyle} disabled>
              <option value="">Bitte waehlen...</option>
              ${anliegenList.map(
                (option) => html`<option>${option}</option>`
              )}
            </select>
          </div>

          <div style=${{ marginBottom: "24px" }}>
            <label style=${labelStyle}>Nachricht</label>
            <textarea rows="5" placeholder="Ihre Nachricht" style=${{ ...inputStyle, resize: "vertical" }} disabled></textarea>
          </div>

          <span style=${{
            display: "inline-block",
            background: "#1E2F4F",
            color: "#FFFFFF",
            padding: "12px 28px",
            borderRadius: "4px",
            fontWeight: 600,
            fontSize: "15px"
          }}>
            Nachricht senden
          </span>
        </div>
      </div>

      <!-- CTA -->
      <div style=${{
        background: "#1E2F4F",
        color: "#FFFFFF",
        padding: "48px 24px",
        textAlign: "center"
      }}>
        <h2 style=${{ fontSize: "24px", marginBottom: "20px" }}>Ich freue mich auf Ihre Nachricht.</h2>
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
