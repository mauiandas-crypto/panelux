export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Panelux Uruguay",
          description: "Distribuidor oficial de Panelux en Uruguay",
          url: "https://panelux.com.uy",
          logo: "https://panelux.com.uy/logo.png",
          sameAs: [
            "https://www.facebook.com/paneluxuy",
            "https://www.instagram.com/paneluxuy",
            "https://wa.me/59892715555",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Yaguarón 1764",
            addressLocality: "Montevideo",
            postalCode: "11200",
            addressCountry: "UY",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            telephone: "+598-9271-5555",
            email: "info@panelux.uy",
            availableLanguage: ["es"],
          },
        }),
      }}
    />
  )
}

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Panelux Uruguay",
          image: "https://panelux.com.uy/logo.png",
          description: "Distribuidor oficial de utensilios de cocina premium Panelux",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Yaguarón 1764",
            addressLocality: "Montevideo",
            postalCode: "11200",
            addressCountry: "UY",
          },
          telephone: "+598-9271-5555",
          email: "info@panelux.uy",
          url: "https://panelux.com.uy",
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:30",
            closes: "17:15",
          },
          areaServed: {
            "@type": "Country",
            name: "UY",
          },
          priceRange: "$$",
        }),
      }}
    />
  )
}

export function ProductListSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Catálogo de Productos - Panelux Uruguay",
          description: "Catálogo completo de utensilios de cocina Panelux",
          url: "https://panelux.com.uy",
        }),
      }}
    />
  )
}

interface ProductSchemaProps {
  codigo: string
  nombre: string
  descripcion: string
  imagen: string
  pvp: number
  categoria: string
}

export function ProductSchema({ codigo, nombre, descripcion, imagen, pvp, categoria }: ProductSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          sku: codigo,
          name: nombre,
          description: descripcion,
          image: imagen,
          url: `https://panelux.com.uy/productos/${codigo}`,
          category: categoria,
          brand: {
            "@type": "Brand",
            name: "Panelux",
          },
          offers: {
            "@type": "Offer",
            url: `https://panelux.com.uy/productos/${codigo}`,
            priceCurrency: "UYU",
            price: pvp.toString(),
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "12",
          },
        }),
      }}
    />
  )
}

interface BreadcrumbProps {
  items: Array<{ name: string; url: string }>
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  )
}
