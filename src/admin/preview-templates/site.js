import htm from "https://unpkg.com/htm@3.1.1/dist/htm.module.js?module";
const html = htm.bind(h);

export default function SitePreview({ entry }) {
  const name = entry.getIn(["data", "name"]);
  const owner = entry.getIn(["data", "owner"]);
  const tagline = entry.getIn(["data", "tagline"]);
  const description = entry.getIn(["data", "description"]);
  const email = entry.getIn(["data", "email"]);
  const phone = entry.getIn(["data", "phone"]);
  const address = entry.getIn(["data", "address"]);

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #F3EFE7",
    fontSize: "15px"
  };

  const labelStyle = {
    fontWeight: 600,
    color: "#1E2F4F",
    minWidth: "160px"
  };

  return html`
    <div style=${{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#2B2B2B" }}>

      <!-- Header -->
      <div style=${{
        background: "#1E2F4F",
        color: "#FFFFFF",
        padding: "48px 24px",
        textAlign: "center"
      }}>
        <h1 style=${{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Globale Einstellungen</h1>
        <p style=${{ fontSize: "16px", opacity: 0.85 }}>Allgemeine Website-Konfiguration</p>
      </div>

      <!-- Site Info -->
      <div style=${{ background: "#FFFFFF", padding: "48px 24px" }}>
        <div style=${{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "20px", color: "#1E2F4F", marginBottom: "24px", paddingBottom: "12px", borderBottom: "2px solid #1E2F4F" }}>
            Website
          </h2>
          <div style=${rowStyle}>
            <span style=${labelStyle}>Seitenname</span>
            <span>${name}</span>
          </div>
          <div style=${rowStyle}>
            <span style=${labelStyle}>Inhaberin</span>
            <span>${owner}</span>
          </div>
          <div style=${rowStyle}>
            <span style=${labelStyle}>Tagline</span>
            <span>${tagline}</span>
          </div>
          <div style=${{ ...rowStyle, borderBottom: "none" }}>
            <span style=${labelStyle}>Beschreibung (SEO)</span>
            <span style=${{ maxWidth: "400px" }}>${description}</span>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div style=${{ background: "#F3EFE7", padding: "48px 24px" }}>
        <div style=${{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style=${{ fontSize: "20px", color: "#1E2F4F", marginBottom: "24px", paddingBottom: "12px", borderBottom: "2px solid #1E2F4F" }}>
            Kontaktdaten
          </h2>
          <div style=${rowStyle}>
            <span style=${labelStyle}>E-Mail</span>
            <span>${email}</span>
          </div>
          <div style=${rowStyle}>
            <span style=${labelStyle}>Telefon</span>
            <span>${phone}</span>
          </div>
          <div style=${{ ...rowStyle, borderBottom: "none" }}>
            <span style=${labelStyle}>Adresse</span>
            <span>${address}</span>
          </div>
        </div>
      </div>

    </div>
  `;
}
