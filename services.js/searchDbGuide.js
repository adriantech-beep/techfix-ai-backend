import Guide from "../model/Guide.js";

export const searchDbGuide = async (query) => {
  if (!query || !query.trim()) return null;

  const cleaned = query.replace(/[^\w\s]/g, " ").trim();

  const pipeline = [
    {
      $search: {
        index: "guides_search",
        compound: {
          should: [
            {
              text: {
                query: cleaned,
                path: "title",
                fuzzy: { maxEdits: 2, prefixLength: 1 },
                score: { boost: { value: 5 } },
              },
            },
            {
              text: {
                query: cleaned,
                path: [
                  "summary",
                  "bodyMarkdown",
                  "steps.title",
                  "steps.bodyMarkdown",
                ],
                fuzzy: { maxEdits: 2 },
              },
            },
          ],
          minimumShouldMatch: 1,
        },
      },
    },
    {
      $project: {
        title: 1,
        summary: 1,
        steps: 1,
        bodyMarkdown: 1,
        score: { $meta: "searchScore" },
      },
    },
    { $sort: { score: -1 } },
    { $limit: 1 },
  ];

  const results = await Guide.aggregate(pipeline).exec();
  return results && results.length ? results[0] : null;
};
