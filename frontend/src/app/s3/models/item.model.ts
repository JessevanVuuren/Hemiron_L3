export interface Item {
  etag: string,
  objectName: string,
  lastModified: string,
  size: number,
  storageClass: string,
  latest: boolean,
  versionId: string,
  dir: boolean
}
