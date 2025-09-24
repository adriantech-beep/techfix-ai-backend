export const formatGuideResponse = (guide) => {
  return {
    title: guide.title,
    summary: guide.summary || "",
    steps:
      guide.steps?.map((step, i) => ({
        index: i + 1,
        title: step.title,
        body: step.bodyMarkdown,
        images:
          step.images?.map((img) => ({
            url: img.url,
            caption: img.caption,
            alt: img.alt,
            hotspotAnnotations: img.hotspotAnnotations || [],
          })) || [],
      })) || [],
  };
};
