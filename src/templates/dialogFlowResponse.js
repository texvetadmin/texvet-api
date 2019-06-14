const responseTemplate = ({ fulfillmentText, outputContext }) => ({
  fulfillmentText: fulfillmentText || null,
  outputContext: outputContext || null,
});

export default responseTemplate;
