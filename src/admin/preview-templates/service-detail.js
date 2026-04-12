import htm from "https://unpkg.com/htm@3.1.1/dist/htm.module.js?module";
const html = htm.bind(h);

export default function ServiceDetailPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const subtitle = entry.getIn(["data", "subtitle"]);
  const intro = entry.getIn(["data", "intro"]);
  const description = entry.getIn(["data", "description"]);
  const services = entry.getIn(["data", "services"]);
  const benefit = entry.getIn(["data", "benefit"]);

  const servicesList = services ? services.toJS() : [];

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

      <!-- Intro & Description -->
      <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "800px", margin: "0 auto" }}>
          <p style=${{ fontSize: "17px", lineHeight: 1.7, marginBottom: "24px" }}>${intro}</p>
          <p style=${{ fontSize: "16px", lineHeight: 1.7, color: "#444" }}>${description}</p>
        </div>
      </div>

      <!-- Services List -->
      <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "26px", color: "#1E2F4F", marginBottom: "32px", textAlign: "center" }}>Leistungen</h2>
          ${servicesList.map(
            (service, i) => html`
              <div style=${{
                background: "#FFFFFF",
                padding: "24px",
                borderRadius: "6px",
                marginBottom: "16px",
                borderLeft: "4px solid #1E2F4F"
              }}>
                <h3 style=${{ fontSize: "18px", color: "#1E2F4F", marginBottom: "8px" }}>${service.title}</h3>
                <p style=${{ fontSize: "15px", lineHeight: 1.6 }}>${service.text}</p>
              </div>
            `
          )}
        </div>
      </div>

      <!-- Benefit -->
      ${benefit && html`
        <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
          <div style=${{
            maxWidth: "700px",
            margin: "0 auto",
            background: "#F3EFE7",
            padding: "32px",
            borderRadius: "8px",
            textAlign: "center",
            borderLeft: "4px solid #1E2F4F"
          }}>
            <h3 style=${{ fontSize: "18px", color: "#1E2F4F", marginBottom: "12px" }}>Ihr Nutzen</h3>
            <p style=${{ fontSize: "17px", lineHeight: 1.6, fontStyle: "italic" }}>${benefit}</p>
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
        <h2 style=${{ fontSize: "24px", marginBottom: "20px" }}>Interesse geweckt?</h2>
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
