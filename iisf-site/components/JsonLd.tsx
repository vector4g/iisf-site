/**
 * Render a <script type="application/ld+json"> tag for structured data.
 * Works in both Server and Client components.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

