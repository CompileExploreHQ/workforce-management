export function filesListToMap(
  files: Express.Multer.File[]
): Map<string, Express.Multer.File> {
  return new Map<string, Express.Multer.File>(
    files.map((file) => [file.fieldname, file])
  );
}
