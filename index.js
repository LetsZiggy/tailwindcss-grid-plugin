/* ******************************************************************************************** */
/*                                                                                              */
/* This project is inspired by tailwindcss-grid (https://github.com/chrisrowe/tailwindcss-grid) */
/*                                                                                              */
/* ******************************************************************************************** */

/**
 * @module tailwindcss-grid
 * @description Generate css grid classes
 *
 *
 *
 * @param {Object} [options]
 *
 * @param {?(boolean|number|number[])} [options.gridRows=false] -
 *   `false` will disable `gridRows`
 *   `integers` will be converted to array of same length
 *   `true` or `!Array.isArray(gridRows)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
 *   Used to generate "grid-template-rows", and "grid-auto-rows"
 *   Used to generate "grid-row-start", and "grid-row-end"
 *   "grid-auto-rows" formula: `calc(100% / ${ gridRows.value })`
 *   Largest "grid-row-start" will be generated using the largest `${ gridRows.value * rowMultiples }`
 *   Largest "grid-row-end" will be generated using the largest `${ gridRows.value * rowMultiples } + 1`
 *
 * @param {?(boolean|number|number[])} [options.gridCols=false] -
 *   `false` will disable `gridCols`
 *   `integers` will be converted to array of same length
 *   `true` or `!Array.isArray(gridCols)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
 *   Used to generate "grid-template-columns", and "grid-auto-columns"
 *   Used to generate "grid-column-start", and "grid-column-end"
 *   "grid-auto-columns" formula: `calc(100% / ${ gridCols.value })`
 *   Largest "grid-column-start" will be generated using the largest `${ gridCols.value * colMultiples }`
 *   Largest "grid-column-end" will be generated using the largest `${ gridCols.value * colMultiples } + 1`
 *
 * @param {?(boolean|number)} [options.rowMultiples=false] -
 *   If `gridRows` is set, `rowMultiples` defaults to 1 if non-integer entry provided
 *   Multiplier to determine largest "grid-row-start", and "grid-row-end"
 *
 * @param {?(boolean|number)} [options.colMultiples=false] -
 *   If `gridCols` is set, `colMultiples` defaults to 1 if non-integer entry provided
 *   Multiplier to determine largest "grid-column-start", and "grid-column-end"
 *
 * @param {?(boolean|number|number[])} [options.gaps=false] -
 *   `false` will disable `gaps`
 *   Integers will be converted to array of same length
 *   `true` or `!Array.isArray(gaps)` will default to [ 2, 3, 4, 5, 6, 7, 8 ]
 *   Used to generate "gap"
 *   Used to generate "row-gap", and "column-gap"
 *   Values provided will be used to generate gaps in "px" unit
 *   Values with "rem" units will also be generated based on theme("spacing")
 *
 *
 *
 * @return {Object} Returns Tailwindcss plugin
 */
module.exports = function ({ gridRows = false, gridCols = false, rowMultiples = false, colMultiples = false, gaps = false } = {}) {
  // Handle gridRows
  if (gridRows !== false) {
    // Sets gridRows as array from integer
    if (Number.isInteger(gridRows)) {
      gridRows = Array.from({
        length: gridRows,
      }, (_, i) => i + 1)
    }
    // Ensure gridRows is an array
    else if (!Array.isArray(gridRows) || gridRows.length === 0) {
      gridRows = Array.from({
        length: 12,
      }, (_, i) => i + 1)
    }
    // Ensure array elements are integers
    else if (Array.isArray(gridRows) && gridRows.length > 0) {
      gridRows = gridRows.reduce((acc, value) => {
        if (Number.isInteger(value)) {
          acc.push(value)
        }

        return acc
      }, [])

      gridRows.sort((a, b) => a - b)
    }
  }

  // Handle gridCols
  if (gridCols !== false) {
    // Sets gridCols as array from integer
    if (Number.isInteger(gridCols)) {
      gridCols = Array.from({
        length: gridCols,
      }, (_, i) => i + 1)
    }
    // Ensure gridCols is an array
    else if (!Array.isArray(gridCols) || gridCols.length === 0) {
      gridCols = Array.from({
        length: 12,
      }, (_, i) => i + 1)
    }
    // Ensure array elements are integers
    else if (Array.isArray(gridCols) && gridCols.length > 0) {
      gridCols = gridCols.reduce((acc, value) => {
        if (Number.isInteger(value)) {
          acc.push(value)
        }

        return acc
      }, [])

      gridCols.sort((a, b) => a - b)
    }
  }

  // Handle rowMultiples
  if (Array.isArray(gridRows)) {
    if (rowMultiples === false || !Number.isInteger(rowMultiples)) {
      rowMultiples = 1
    }
  }

  // Handle colMultiples
  if (Array.isArray(gridCols)) {
    // Ensure colMultiples is an integer
    if (colMultiples === false || !Number.isInteger(colMultiples)) {
      colMultiples = 1
    }
  }

  // Handle gaps
  if (gaps !== false) {
    // Sets gaps as array from integer
    if (Number.isInteger(gaps)) {
      gaps = Array.from({
        length: gaps,
      }, (_, i) => i + 1)
    }
    // Ensure gaps is an array
    else if (!Array.isArray(gaps) || gaps.length === 0) {
      gaps = Array.from({
        length: 7,
      }, (_, i) => i + 2)
    }
    // Ensure array elements are integers
    else if (Array.isArray(gaps) && gaps.length > 0) {
      gaps = gaps.reduce((acc, value) => {
        if (Number.isInteger(value)) {
          acc.push(value)
        }

        return acc
      }, [])

      gaps.sort((a, b) => a - b)
    }
  }

  return function ({ addUtilities, e, theme }) {
    // auto-flow-*
    const autoFlow = {
      ".grid-flow-row": {
        "grid-auto-flow": "row",
      },
      ".grid-flow-row-dense": {
        "grid-auto-flow": "row dense",
      },
      ".grid-flow-col": {
        "grid-auto-flow": "column",
      },
      ".grid-flow-col-dense": {
        "grid-auto-flow": "column dense",
      },
      ".grid-flow-dense": {
        "grid-auto-flow": "dense",
      },
    }

    // grid-template-*
    const templateRowsCols = (() => {
      const templateRows = (gridRows !== false)
        ? {
          ".grid-rows-none": {
            "grid-template-rows": "none",
          },
        }
        : {}

      // grid-template-rows
      if (gridRows !== false) {
        for (const value of gridRows) {
          templateRows[`.${ e(`grid-rows-${ value }`) }`] = {
            "grid-template-rows": `[start] repeat(${ value }, minmax(0, 1fr)) [end]`,
          }
        }
      }

      const templateCols = (gridCols !== false)
        ? {
          ".grid-cols-none": {
            "grid-template-columns": "none",
          },
        }
        : {}

      // grid-template-columns
      if (gridCols !== false) {
        for (const value of gridCols) {
          templateCols[`.${ e(`grid-cols-${ value }`) }`] = {
            "grid-template-columns": `[start] repeat(${ value }, minmax(0, 1fr)) [end]`,
          }
        }
      }

      return { ...templateRows, ...templateCols }
    })()

    // grid-auto-*
    const autoRowsCols = (() => {
      // grid-auto-rows
      const autoRows = (gridRows !== false)
        ? {
          ".auto-rows-auto": {
            "grid-auto-rows": "auto",
          },
          ".auto-rows-min": {
            "grid-auto-rows": "min-content",
          },
          ".auto-rows-max": {
            "grid-auto-rows": "max-content",
          },
          ".auto-rows-fr": {
            "grid-auto-rows": "minmax(0, 1fr)",
          },
        }
        : {}

      if (gridRows !== false) {
        for (const value of gridRows) {
          autoRows[`.${ e(`auto-rows-${ value }`) }`] = {
            "grid-auto-rows": `calc(100% / ${ value })`,
          }
        }
      }

      // grid-auto-columns
      const autoCols = (gridCols !== false)
        ? {
          ".auto-cols-auto": {
            "grid-auto-columns": "auto",
          },
          ".auto-cols-min": {
            "grid-auto-columns": "min-content",
          },
          ".auto-cols-max": {
            "grid-auto-columns": "max-content",
          },
          ".auto-cols-fr": {
            "grid-auto-columns": "minmax(0, 1fr)",
          },
        }
        : {}

      if (gridCols !== false) {
        for (const value of gridCols) {
          autoCols[`.${ e(`auto-cols-${ value }`) }`] = {
            "grid-auto-columns": `calc(100% / ${ value })`,
          }
        }
      }

      return { ...autoRows, ...autoCols }
    })()

    // grid-row-* | grid-column-*
    const gridStartEnd = (() => {
      // grid-row
      const row = (gridRows !== false)
        ? {
          ".row-auto": {
            "grid-row": "auto",
          },
          ".row-span-full": {
            "grid-row": "1 / -1",
          },
        }
        : {}

      // grid-row-start
      const rowStart = (gridRows !== false)
        ? {
          ".row-start-auto": {
            "grid-row-start": "auto",
          },
        }
        : {}

      // grid-row-end
      const rowEnd = (gridRows !== false)
        ? {
          ".row-end-auto": {
            "grid-row-end": "auto",
          },
        }
        : {}

      // Initialise grid-row (span) | grid-rows-* values
      const rowLines = (gridRows !== false)
        ? Array.from({
          length: (gridRows[(gridRows.length - 1)] * rowMultiples + 1),
        }, (_, i) => i + 1)
        : []

      if (gridRows !== false) {
        for (const value of rowLines) {
          // grid-row (span)
          row[`row-span-${ value }`] = {
            "grid-row": `span ${ value } / span ${ value }`,
          }

          // grid-row-start
          rowStart[`.row-start-${ value }`] = {
            "grid-row-start": `${ value }`,
          }

          // grid-row-end
          rowEnd[`.row-end-${ (value + 1) }`] = {
            "grid-row-end": `${ (value + 1) }`,
          }
        }
      }

      // grid-column
      const col = (gridCols !== false)
        ? {
          ".col-auto": {
            "grid-column": "auto",
          },
          ".col-span-full": {
            "grid-column": "1 / -1",
          },
        }
        : {}

      // grid-column-start
      const colStart = (gridCols !== false)
        ? {
          ".col-start-auto": {
            "grid-column-start": "auto",
          },
        }
        : {}

      // grid-column-end
      const colEnd = (gridCols !== false)
        ? {
          ".col-end-auto": {
            "grid-column-end": "auto",
          },
        }
        : {}

      // Initialise grid-col (span) | grid-columns-* values
      const colLines = (gridCols !== false)
        ? Array.from({
          length: (gridCols[(gridCols.length - 1)] * colMultiples + 1),
        }, (_, i) => i + 1)
        : []

      if (gridCols !== false) {
        for (const value of colLines) {
          // grid-col (span)
          col[`col-span-${ value }`] = {
            "grid-column": `span ${ value } / span ${ value }`,
          }

          // grid-column-start
          colStart[`.col-start-${ value }`] = {
            "grid-column-start": `${ value }`,
          }

          // grid-column-end
          colEnd[`.col-end-${ (value + 1) }`] = {
            "grid-column-end": `${ (value + 1) }`,
          }
        }
      }

      return { ...row, ...rowStart, ...rowEnd, ...col, ...colStart, ...colEnd }
    })()

    // gap | *-gap
    const gapRowCol = (() => {
      const gap = {}
      const rowGap = {}
      const colGap = {}

      if (gaps !== false) {
        // gap | *-gap (px)
        for (const value of gaps) {
          // gap
          gap[`.gap-${ value }px`] = {
            gap: `${ value }px`,
          }

          // row-gap
          rowGap[`.gap-y-${ value }px`] = {
            "row-gap": `${ value }px`,
          }

          // column-gap
          colGap[`.gap-x-${ value }px`] = {
            "column-gap": `${ value }px`,
          }
        }

        // gap | *-gap (theme("spacing"))
        for (const [ key, value ] of Object.entries(theme("spacing"))) {
          // gap
          gap[`.gap-${ key }`] = {
            gap: `${ value } ${ value }`,
          }

          // row-gap
          rowGap[`.gap-y-${ key }`] = {
            "row-gap": value,
          }

          // column-gap
          colGap[`.gap-x-${ key }`] = {
            "column-gap": value,
          }
        }
      }

      return { ...gap, ...rowGap, ...colGap }
    })()

    addUtilities({
      ...autoFlow,
      ...templateRowsCols,
      ...autoRowsCols,
      ...gridStartEnd,
      ...gapRowCol,
    }, [ "responsive" ])
  }
}
