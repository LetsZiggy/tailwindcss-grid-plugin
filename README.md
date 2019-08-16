# tailwindcss Grid Plugin

This repository is inspired by [@chrisrowe/tailwindcss-grid](https://github.com/chrisrowe/tailwindcss-grid).

<br>

### Installation

##### Prerequisites

- `tailwindcss` is installed ([Link](https://tailwindcss.com/docs/installation/))

##### Installing Plugin

- `npm install --save-dev github:LetsZiggy/tailwindcss-grid-plugin`

---

### Usage

```javascript
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    // Using default options
    require("tailwindcss-grid-plugin")(),

    // Customising options
    require("tailwindcss-grid-plugin")({/* options */}),
  ],
  // ...
}
```

---

### Options

All utilities can be used with the `responsive` variant.

```javascript
/**
 * @param {Object} [options]
 */
require("tailwindcss-grid-plugin")({
  /**
   * @param {?(boolean|number|number[])} [options.gridRows=false] -
   *   `false` will disable `gridRows`
   *   `integers` will be converted to array of same length
   *   `true` or `!Array.isArray(gridRows)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
   *   Used to generate "grid-template-rows", and "grid-auto-rows"
   *   Used to generate "grid-row-start", and "grid-row-end"
   *   "grid-auto-rows" formula: `calc(100% / ${ gridRows.value })`
   *   Largest "grid-row-start" will be generated using the largest `${ gridRows.value * rowMultiples }`
   *   Largest "grid-row-end" will be generated using the largest `${ gridRows.value * rowMultiples } + 1`
   */
  gridRows: false,

  /**
   * @param {?(boolean|number|number[])} [options.gridCols=false] -
   *   `false` will disable `gridCols`
   *   `integers` will be converted to array of same length
   *   `true` or `!Array.isArray(gridCols)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
   *   Used to generate "grid-template-columns", and "grid-auto-columns"
   *   Used to generate "grid-column-start", and "grid-column-end"
   *   "grid-auto-columns" formula: `calc(100% / ${ gridCols.value })`
   *   Largest "grid-column-start" will be generated using the largest `${ gridCols.value * colMultiples }`
   *   Largest "grid-column-end" will be generated using the largest `${ gridCols.value * colMultiples } + 1`
   */
  gridCols: false,

  /**
   * @param {?(boolean|number)} [options.rowMultiples=false] -
   *   If `gridRows` is set, `rowMultiples` defaults to 1 if non-integer entry provided
   *   Multiplier to determine largest "grid-row-start", and "grid-row-end"
   */
  rowMultiples: false,

  /**
   * @param {?(boolean|number)} [options.colMultiples=false] -
   *   If `gridCols` is set, `colMultiples` defaults to 1 if non-integer entry provided
   *   Multiplier to determine largest "grid-column-start", and "grid-column-end"
   */
  colMultiples: false,

  /**
   * @param {?(boolean|number|number[])} [options.gaps=false] -
   *   `false` will disable `gaps`
   *   Integers will be converted to array of same length
   *   `true` or `!Array.isArray(gaps)` will default to [ 2, 3, 4, 5, 6, 7, 8 ]
   *   Used to generate "gap"
   *   Used to generate "row-gap", and "column-gap"
   *   Values provided will be used to generate gaps in "px" unit
   *   Values with "rem" units will also be generated based on theme("spacing")
   */
  gaps: false,
})
```

---

### Classes

[grid-auto-flow](#grid-auto-flow) | [grid-template-rows](#grid-template-rows) | [grid-template-columns](#grid-template-columns) | [grid-auto-rows](#grid-auto-rows) | [grid-auto-columns](#grid-auto-columns) | [grid-row](#grid-row) | [grid-row-start](#grid-row-start) | [grid-row-end](#grid-row-end) | [grid-column](#grid-column) | [grid-column-start](#grid-column-start) | [grid-column-end](#grid-column-end) | [gap](#gap) | [row-gap](#row-gap) | [column-gap](#column-gap)

---

#### grid-auto-flow

| class                | property        | value         |
| ---------------------| --------------- | ------------- |
| .grid-flow-row       | grid-auto-flow: | row;          |
| .grid-flow-row-dense | grid-auto-flow: | row dense;    |
| .grid-flow-col       | grid-auto-flow: | column;       |
| .grid-flow-col-dense | grid-auto-flow: | column dense; |

---

#### grid-template-rows

###### (Using default values)

| class           | property            | value                                     |
| --------------- | ------------------- | ----------------------------------------- |
| .grid-rows-none | grid-template-rows: | none;                                     |
| .grid-rows-1    | grid-template-rows: | [start] repeat(1, minmax(0, 1fr)) [end];  |
| ...             | ...                 | ...                                       |
| .grid-rows-12   | grid-template-rows: | [start] repeat(12, minmax(0, 1fr)) [end]; |

###### Formula:

`.grid-rows-${ gridRows.value }` => `grid-template-rows: [start] repeat(${ gridRows.value }, minmax(0, 1fr)) [end];`

---

#### grid-template-columns

###### (Using default values)

| class           | property               | value                                     |
| --------------- | ---------------------- | ----------------------------------------- |
| .grid-cols-none | grid-template-columns: | none;                                     |
| .grid-cols-1    | grid-template-columns: | [start] repeat(1, minmax(0, 1fr)) [end];  |
| ...             | ...                    | ...                                       |
| .grid-cols-12   | grid-template-columns: | [start] repeat(12, minmax(0, 1fr)) [end]; |

###### Formula:

`.grid-cols-${ gridCols.value }` => `grid-template-columns: [start] repeat(${ gridCols.value }, minmax(0, 1fr)) [end];`

---

#### grid-auto-rows

###### (Using default values)

| class           | property        | value            |
| --------------- | --------------- | ---------------- |
| .auto-rows-auto | grid-auto-rows: | auto;            |
| .auto-rows-min  | grid-auto-rows: | min-content;     |
| .auto-rows-max  | grid-auto-rows: | max-content;     |
| .auto-rows-fr   | grid-auto-rows: | minmax(0, 1fr);  |
| .auto-rows-1    | grid-auto-rows: | calc(100% / 1);  |
| ...             | ...             | ...              |
| .auto-rows-12   | grid-auto-rows: | calc(100% / 12); |

###### Formula:

`.auto-rows-${ gridRows.value }` => `grid-auto-rows: calc(100% / ${ gridRows.value });`

---

#### grid-auto-columns

###### (Using default values)

| class           | property           | value            |
| --------------- | ------------------ | ---------------- |
| .auto-cols-auto | grid-auto-columns: | auto;            |
| .auto-cols-min  | grid-auto-columns: | min-content;     |
| .auto-cols-max  | grid-auto-columns: | max-content;     |
| .auto-cols-fr   | grid-auto-columns: | minmax(0, 1fr);  |
| .auto-cols-1    | grid-auto-columns: | calc(100% / 1);  |
| ...             | ...                | ...              |
| .auto-cols-12   | grid-auto-columns: | calc(100% / 12); |

###### Formula:

`.auto-cols-${ gridCols.value }` => `grid-auto-columns: calc(100% / ${ gridCols.value });`

---

### grid-row

| class          | property  | value              |
| -------------- | --------- | ------------------ |
| .row-auto      | grid-row: | auto;              |
| .row-span-full | grid-row: | 1 / -1;            |
| .row-span-1    | grid-row: | span 1 / span 1;   |
| ...            | ...       | ...                |
| .row-span-12   | grid-row: | span 12 / span 12; |

###### Formula:

`.row-span-${ gridCols.value }` => `grid-row: span ${ gridCols.value } / span ${ gridCols.value };`

---

#### grid-row-start

###### (Using default values)

| class           | property        | value |
| --------------- | --------------- | ----- |
| .row-start-auto | grid-row-start: | auto; |
| .row-start-1    | grid-row-start: | 1;    |
| ...             | ...             | ...   |
| .row-start-12   | grid-row-start: | 12;   |

###### Formula:

`.row-start-${ gridRows.value * rowMultiples }` => `grid-row-start: ${ gridRows.value * rowMultiples };`

---

#### grid-row-end

###### (Using default values)

| class         | property      | value |
| ------------- | ------------- | ----- |
| .row-end-auto | grid-row-end: | auto; |
| .row-end-2    | grid-row-end: | 2;    |
| ...           | ...           | ...   |
| .row-end-13   | grid-row-end: | 13;   |

###### Formula:

`.row-end-${ gridRows.value * rowMultiples + 1 }` => `grid-row-end: ${ gridRows.value * rowMultiples + 1 };`

---

### grid-column

| class          | property     | value              |
| -------------- | ------------ | ------------------ |
| .col-auto      | grid-column: | auto;              |
| .col-span-full | grid-column: | 1 / -1;            |
| .col-span-1    | grid-column: | span 1 / span 1;   |
| ...            | ...          | ...                |
| .col-span-12   | grid-column: | span 12 / span 12; |

###### Formula:

`.col-span-${ gridCols.value }` => `grid-column: span ${ gridCols.value } / span ${ gridCols.value };`

---

#### grid-column-start

###### (Using default values)

| class           | property           | value |
| ----------------| ------------------ | ----- |
| .col-start-auto | grid-column-start: | auto; |
| .col-start-1    | grid-column-start: | 1;    |
| ...             | ...                | ...   |
| .col-start-12   | grid-column-start: | 12;   |

###### Formula:

`.col-start-${ gridCols.value * colMultiples }` => `grid-column-start: ${ gridCols.value * colMultiples };`

---

#### grid-column-end

###### (Using default values)

| class         | property         | value |
| ------------- | ---------------- | ----- |
| .col-end-auto | grid-column-end: | auto; |
| .col-end-2    | grid-column-end: | 2;    |
| ...           | ...              | ...   |
| .col-end-13   | grid-column-end: | 13;   |

###### Formula:

`.col-end-${ gridCols.value * colMultiples + 1 }` => `grid-column-end: ${ gridCols.value * colMultiples + 1 };`

---

#### gap

###### (Using default values)

| class    | property | value    |
| -------- | -------- | -------- |
| .gap-px  | gap:     | 1px;     |
| .gap-2px | gap:     | 2px;     |
| ...      | ...      | ...      |
| .gap-8px | gap:     | 8px;     |
| .gap-0   | gap:     | 0;       |
| ...      | ...      | ...      |
| .gap-96  | gap:     | 24rem;   |

###### Formula:

`.gap-${ gap.value }px` => `gap: ${ gap.value }px ${ gap.value }px;`

---

#### row-gap

###### (Using default values)

| class      | property | value    |
| ---------- | -------- | -------- |
| .gap-y-px  | row-gap: | 1px;     |
| .gap-y-2px | row-gap: | 2px;     |
| ...        | ...      | ...      |
| .gap-y-8px | row-gap: | 8px;     |
| .gap-y-0   | row-gap: | 0;       |
| ...        | ...      | ...      |
| .gap-y-96  | row-gap: | 24rem;   |

###### Formula:

`.gap-y-${ gaps.value }px` => `row-gap: ${ gaps.value }px;`

---

#### column-gap

###### (Using default values)

| class      | property    | value    |
| ---------- | ----------- | -------- |
| .gap-x-px  | column-gap: | 1px;     |
| .gap-x-2px | column-gap: | 2px;     |
| ...        | ...         | ...      |
| .gap-x-8px | column-gap: | 8px;     |
| .gap-x-0   | column-gap: | 0;       |
| ...        | ...         | ...      |
| .gap-x-96  | column-gap: | 24rem;   |

###### Formula:

`.gap-x-${ gaps.value }px` => `column-gap: ${ gaps.value }px;`

---

### Credits

Thanks to [@adamwathan](https://twitter.com/adamwathan) for creating [tailwindcss](https://github.com/tailwindcss/tailwindcss).
