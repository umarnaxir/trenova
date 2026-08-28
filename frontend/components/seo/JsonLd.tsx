type JsonLdProps = {
  data: unknown | unknown[];
};

function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data.filter(Boolean) : [data];

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(item) }}
        />
      ))}
    </>
  );
}
