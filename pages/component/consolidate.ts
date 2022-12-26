const consolidate = (
  data: Record<string, Array<{ timestamp: number; id: string }> | undefined>
): Record<string, Record<string, number>> => {
  if (!data) return {};

  const transactionCount: Record<string, Record<string, number>> = {};

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
    transactionCount[label] = counts;
  }

  return transactionCount;
};

export default consolidate;
