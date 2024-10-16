import assert from "node:assert";
import { test } from "node:test";
import xls from "../index";
import { responseProxy } from "./utils/response-proxy";
import xlsx from "node-xlsx";

test("generate xlx form a array of objects", () => {
  const data = [
    {
      "col-1": "col-1-value",
      "col-2": "col-2-value",
      "col-3": "col-3-value;",
      "col-4": "col-4-value;",
    },
  ];

  const response = responseProxy();

  xls()({ response } as any, data);

  const parsed = xlsx.parse(response.state.body as any as Buffer);
  const [headers, values] = parsed[0].data;

  assert.deepStrictEqual(headers, Object.keys(data[0]));
  assert.deepStrictEqual(values, Object.values(data[0]));
});

test("generate xlx omitting columns", () => {
  const data = [
    {
      "col-1": "col-1-value",
      "col-2": "col-2-value",
      "col-3": "col-3-value;",
      "col-4": "col-4-value;",
    },
  ];

  const response = responseProxy();

  xls({ columns: ["col-1", "col-4"] })({ response } as any, data);

  const parsed = xlsx.parse(response.state.body as any as Buffer);
  const [headers, values] = parsed[0].data;

  assert.deepStrictEqual(headers, ["col-1", "col-4"]);
  assert.deepStrictEqual(values, ["col-1-value", "col-4-value;"]);
});

test("generate xlx translating columns", () => {
  const data = [
    {
      "col-1": "col-1-value",
      "col-2": "col-2-value",
    },
  ];

  const response = responseProxy();

  xls({ i18n: { "col-1": "column-one" } })({ response } as any, data);

  const parsed = xlsx.parse(response.state.body as any as Buffer);
  const [headers, values] = parsed[0].data;

  assert.deepStrictEqual(headers, ["column-one", "col-2"]);
  assert.deepStrictEqual(values, ["col-1-value", "col-2-value"]);
});
