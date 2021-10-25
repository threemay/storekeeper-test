export default class DocumentNotFoundError extends Error {
  constructor(modelName: string, documentId: string) {
    super(`${documentId} not found in ${modelName}`);
  }
}
