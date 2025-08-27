/* Keep the storageName unique
 * If add it please make it same with the key name.
 * If use it please add `.toString`, cause zustand storage name only support string.
 */
export enum StorageName {
  bearStorage,
  authStorage,
  segmentedHomeStorage,
  windowPopupStorage,
  breadcrumbStorage,
}
