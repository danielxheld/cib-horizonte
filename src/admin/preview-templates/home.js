import htm from "https://unpkg.com/htm@3.1.1/dist/htm.module.js?module";
const html = htm.bind(h);

export default function HomePreview({ entry }) {
  const hero = entry.getIn(["data", "hero"]);
  const welcome = entry.getIn(["data", "welcome"]);
  const services = entry.getIn(["data", "services"]);
  const usps = entry.getIn(["data", "usps"]);
  const aboutTeaser = entry.getIn(["data", "about_teaser"]);
  const cta = entry.getIn(["data", "cta"]);

  const servicesList = services ? services.toJS() : [];
  const uspsList = usps ? usps.toJS() : [];

  return html`
    <div style=${{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#2B2B2B" }}>

      <!-- Hero -->
      <div style=${{
        background: "#0F1C33",
        color: "#FFFFFF",
        padding: "80px 24px",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style=${{ maxWidth: "800px", textAlign: "center" }}>
          <p style=${{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px", opacity: 0.8 }}>
            ${hero && hero.get("subtitle")}
          </p>
          <h1 style=${{ fontSize: "36px", lineHeight: 1.3, marginBottom: "20px", fontWeight: 700 }}>
            ${hero && hero.get("title")}
          </h1>
          <p style=${{ fontSize: "18px", lineHeight: 1.6, marginBottom: "32px", opacity: 0.9 }}>
            ${hero && hero.get("text")}
          </p>
          <span style=${{
            display: "inline-block",
            background: "#FFFFFF",
            color: "#1E2F4F",
            padding: "14px 32px",
            borderRadius: "4px",
            fontWeight: 600,
            fontSize: "16px"
          }}>
            ${hero && hero.get("cta")}
          </span>
        </div>
      </div>

      <!-- Welcome -->
      <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style=${{ fontSize: "28px", color: "#1E2F4F", marginBottom: "20px" }}>
            ${welcome && welcome.get("title")}
          </h2>
          <p style=${{ fontSize: "16px", lineHeight: 1.7 }}>
            ${welcome && welcome.get("text")}
          </p>
        </div>
      </div>

      <!-- Services -->
      <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "28px", color: "#1E2F4F", textAlign: "center", marginBottom: "40px" }}>Leistungen</h2>
          <div style=${{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            ${servicesList.map(
              (service) => html`
                <div style=${{
                  background: "#FFFFFF",
                  padding: "28px 20px",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                }}>
                  <h3 style=${{ fontSize: "18px", color: "#1E2F4F", marginBottom: "12px" }}>${service.title}</h3>
                  <p style=${{ fontSize: "14px", lineHeight: 1.6 }}>${service.text}</p>
                  <p style=${{ fontSize: "13px", color: "#1E2F4F", marginTop: "12px" }}>${service.link}</p>
                </div>
              `
            )}
          </div>
        </div>
      </div>

      <!-- USPs -->
      <div style=${{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "28px", color: "#1E2F4F", textAlign: "center", marginBottom: "32px" }}>Was CIB Horizonte auszeichnet</h2>
          <ul style=${{ listStyle: "none", padding: 0, margin: 0 }}>
            ${uspsList.map(
              (usp) => html`
                <li style=${{ padding: "10px 0", fontSize: "16px", borderBottom: "1px solid #F3EFE7", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style=${{ color: "#1E2F4F", fontWeight: 700, fontSize: "18px" }}>✓</span>
                  <span>${usp}</span>
                </li>
              `
            )}
          </ul>
        </div>
      </div>

      <!-- About Teaser -->
      <div style=${{ background: "#F3EFE7", padding: "64px 24px" }}>
        <div style=${{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style=${{ fontSize: "28px", color: "#1E2F4F", marginBottom: "20px" }}>
            ${aboutTeaser && aboutTeaser.get("title")}
          </h2>
          <p style=${{ fontSize: "16px", lineHeight: 1.7, marginBottom: "28px" }}>
            ${aboutTeaser && aboutTeaser.get("text")}
          </p>
          <span style=${{
            display: "inline-block",
            border: "2px solid #1E2F4F",
            color: "#1E2F4F",
            padding: "12px 28px",
            borderRadius: "4px",
            fontWeight: 600,
            fontSize: "15px"
          }}>
            ${aboutTeaser && aboutTeaser.get("cta")}
          </span>
        </div>
      </div>

      <!-- CTA -->
      <div style=${{
        background: "#1E2F4F",
        color: "#FFFFFF",
        padding: "64px 24px",
        textAlign: "center"
      }}>
        <h2 style=${{ fontSize: "28px", marginBottom: "24px" }}>
          ${cta && cta.get("title")}
        </h2>
        <span style=${{
          display: "inline-block",
          background: "#FFFFFF",
          color: "#1E2F4F",
          padding: "14px 32px",
          borderRadius: "4px",
          fontWeight: 600,
          fontSize: "16px"
        }}>
          ${cta && cta.get("button")}
        </span>
      </div>

    </div>
  `;
}
