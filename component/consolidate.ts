const consolidate = (
  data: Record<string, Array<{ timestamp: number; id: string }> | undefined>
): Record<string, Array<{ x: string; y: number }>> => {
  if (!data) return {};

  const transactionCount: Record<string, Array<{ x: string; y: number }>> = {};

  const labels = Object.keys(data);

  for (const label of labels) {
    const counts: Record<string, number> = {};

    for (const transaction of data[label] || []) {
      const date = new Date(transaction.timestamp * 1000);
      const dateString = date.toISOString().split("T")[0];

      if (counts[dateString]) {
        counts[dateString] += 1;
      } else {
        counts[dateString] = 1;
      }
    }

    const x = Object.entries(counts).map(([x, y]) => {
      return { x, y };
    });
    transactionCount[label] = x;
  }

  return transactionCount;
};

export default consolidate;
