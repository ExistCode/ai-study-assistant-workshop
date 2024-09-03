This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Changes Implemented
1. Introduced a file type filter in `Search.tsx` using useState.
2. Updated the accordion to support expandability.
3. Added images and video with source URLs retrieved from the `searchAPI`.

## Approach taken
1. Made a row of buttons according to the file type
2. Added a filter based on the fileType
   ```fileTypeFilter
    ? results?.filter((file) => file.type === fileTypeFilter)
    : results
   ```
3. Refactor the accordion so that it can be expandable per item
4. Added url in the search endpoint (`search.endpoint.ts`)
5. Retrieve the url in the `SearchResults` and passed it to the `FileCard`
6. Made a `contentPreview` variable to show the images and video. 
