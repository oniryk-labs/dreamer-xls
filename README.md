<!-- markdownlint-disable no-inline-html -->
# @oniryk/dreamer-xls
<p align="center">
  <a href="https://www.npmjs.com/package/@oniryk/dreamer-xls">
  <img src="https://img.shields.io/npm/v/@oniryk/dreamer-xls.svg?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@oniryk/dreamer-xls">
    <img src="https://img.shields.io/npm/dt/@oniryk/dreamer-xls.svg?style=for-the-badge" alt="npm total downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@oniryk/dreamer-xls">
    <img src="https://img.shields.io/npm/dm/@oniryk/dreamer-xls.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@oniryk/dreamer-xls">
    <img src="https://img.shields.io/npm/l/@oniryk/dreamer-xls.svg?style=for-the-badge" alt="npm license" />
  </a>
  <a href="https://github.com/oniryk-labs/dreamer-xls/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/oniryk-labs/dreamer-xls/main.yml?style=for-the-badge&branch=main" alt="build status" />
  </a>
</p>

`@oniryk/dreamer-xls` is a wrapper of [`node-xlsx`](https://www.npmjs.com/package/node-xlsx) that provides a more convenient way to deliver [AdonisJS v6](https://adonisjs.com) responses in xlsx format.
This package is part of [`@oniryk/dreamer`](https://dreamer.oniryk.dev). It is not intended to be a general purpose package, but you can use it if you want.

## Installation
```bash
npm install @oniryk/dreamer-xls
```

## Usage
If you are using `@oniryk/dreamer`, you can use it like this:
```typescript
import Post from '#models/post'
import { index } from '@oniryk/dreamer/extensions/crud'
import xls from '@oniryk/dreamer-xls'

export default class PostsController {
  public index = index(Post, {
    formats: [ xls() ],
  })
  // ..
}
```

You also can use it directly:
```typescript
import { HttpContext } from '@adonisjs/core/http'
import xls from '@oniryk/dreamer-xls'

export default class PostsController {
  public async index(context: HttpContext) {
    const data = await Post.all()
    await xls()(context, data)
  }
}
```

## Settings
You can pass an object to the `xls` function to customize the output:
```typescript
xls({
  // Define the filename when downloading
  filename: 'posts.xlsx', // default is 'export.xlsx'
  // Define the sheet name
  sheetName: 'Posts',
  // Define the columns to export
  columns: ['title', 'content', 'author', 'created_at'],
  // Translate the column names
  i18n: {
    title: 'Title',
    content: 'Content',
  },
  // You can also pass the same options as node-xlsx
  // See https://www.npmjs.com/package/node-xlsx#usage
  sheetOptions: {
    '!cols': [
      { wch: 20 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
    ],
  },
})
```
