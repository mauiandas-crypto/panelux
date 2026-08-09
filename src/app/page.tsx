export default function Home() {
  return (
    <html>
      <head>
        <title>Panelux Uruguay</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5" }}>
        {/* Header */}
        <header style={{ backgroundColor: "white", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", position: "sticky", top: 0 }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ margin: 0, fontSize: "28px", color: "#2563eb" }}>🍳 Panelux Uruguay</h1>
            <a href="https://wa.me/598XXXXXXXXX" target="_blank" style={{ backgroundColor: "#22c55e", color: "white", padding: "10px 20px", borderRadius: "5px", textDecoration: "none" }}>
              WhatsApp
            </a>
          </div>
        </header>

        {/* Hero */}
        <section style={{ background: "linear-gradient(to right, #2563eb, #60a5fa)", color: "white", padding: "60px 20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "40px", margin: "0 0 20px 0" }}>Panelux Uruguay</h2>
          <p style={{ fontSize: "18px", margin: "0 0 30px 0" }}>Distribuidor oficial de utensilios de cocina premium</p>
          <a href="#productos" style={{ backgroundColor: "white", color: "#2563eb", padding: "12px 30px", borderRadius: "5px", textDecoration: "none", fontWeight: "bold", display: "inline-block" }}>
            Ver Catálogo
          </a>
        </section>

        {/* Productos */}
        <section id="productos" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
          <h2 style={{ fontSize: "32px", color: "#1f2937", marginBottom: "30px", borderBottom: "4px solid #2563eb", paddingBottom: "10px" }}>
            Sartenes y woks
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", marginBottom: "60px" }}>
            {/* Producto 1 */}
            <div style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <img src="/productos/Magnific%20AA/5000041_Magnific_AA_Frigideira%20Francesa%20%C3%8732_Grafite.jpg" alt="Sartén" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "bold" }}>Magnific - Sartén francesa 32cm - Grafito</h3>
                <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#666" }}>Código: 5000041</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb" }}>$710</span>
                  <button style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>➕</button>
                </div>
              </div>
            </div>

            {/* Producto 2 */}
            <div style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <img src="/productos/Magnific%20AA/5000094_Magnific_AA_Ca%C3%A7arola%20%C3%8718_Grafite.jpg" alt="Cacerola" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "bold" }}>Magnific - Cacerola 18cm - Grafito</h3>
                <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#666" }}>Código: 5000094</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb" }}>$600</span>
                  <button style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>➕</button>
                </div>
              </div>
            </div>

            {/* Producto 3 */}
            <div style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <img src="/productos/Magnific%20AA/5000096_Magnific_AA_Ca%C3%A7arola%20%C3%8722_Grafite.jpg" alt="Cacerola" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "bold" }}>Magnific - Cacerola 22cm - Grafito</h3>
                <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#666" }}>Código: 5000096</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb" }}>$840</span>
                  <button style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>➕</button>
                </div>
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>✨ Mostrando 3 de 76 productos disponibles</p>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: "#111827", color: "white", padding: "30px 20px", textAlign: "center" }}>
          <p style={{ margin: 0 }}>© 2026 Panelux Uruguay - Distribuidor Oficial</p>
          <p style={{ margin: "10px 0 0 0", color: "#9ca3af" }}>Yaguarón 1764, Montevideo</p>
        </footer>
      </body>
    </html>
  )
}
