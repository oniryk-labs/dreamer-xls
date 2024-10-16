import { HttpContext } from "@adonisjs/core/http";
import xlsx, { WorkSheetOptions } from "node-xlsx";

export type XslxOptions = {
  filename?: string;
  columns?: string[];
  sheetName?: string;
  sheetOptions?: WorkSheetOptions;
  i18n?: Record<string, string>;
};

function extractUniqueKeys(arr: any[]): string[] {
  return Array.from(
    arr.reduce((keySet, obj) => {
      Object.keys(obj).forEach((key) => keySet.add(key));
      return keySet;
    }, new Set<string>()),
  );
}

export const serializeColumns = (
  items: unknown[],
  columns: string[] = [],
  i18n: Record<string, string> = {},
) => {
  const cols = columns.length ? columns : extractUniqueKeys(items as any[]);

  const values = items.map((item: any) => {
    return cols.map((column) => item[column] ?? "");
  });

  const translatedCols = cols.map((col) => i18n[col] || col);
  return [translatedCols, ...values];
};

export default function xls(options: XslxOptions = {}) {
  const handler = function ({ response }: HttpContext, rows: unknown[]) {
    const { sheetOptions = {}, columns, sheetName, i18n } = options;
    const items = rows.map((c: any) => (c.serialize ? c.serialize() : c));
    const data = serializeColumns(items, columns, i18n);
    const buffer = xlsx.build(
      [{ name: sheetName || "export", data, options: {} }],
      { sheetOptions },
    );

    const name = options.filename || "export.xlsx";

    response.header(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    response.header("Content-Disposition", `attachment; filename="${name}"`);
    response.send(buffer);
  };

  handler.formatName = "xlsx";
  return handler;
}
