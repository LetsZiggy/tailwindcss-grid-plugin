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
 *   Largest "grid-row-start" will be generated using the largest `${ gridRows.value * multiplierRows }`
 *   Largest "grid-row-end" will be generated using the largest `${ gridRows.value * multplierRows + 1 }`
 *
 * @param {?(boolean|number|number[])} [options.gridColumns=false] -
 *   `false` will disable `gridColumns`
 *   `integers` will be converted to array of same length
 *   `true` or `!Array.isArray(gridColumns)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
 *   Used to generate "grid-template-columns", and "grid-auto-columns"
 *   Used to generate "grid-column-start", and "grid-column-end"
 *   "grid-auto-columns" formula: `calc(100% / ${ gridColumns.value })`
 *   Largest "grid-column-start" will be generated using the largest `${ gridColumns.value * multiplierColumns }`
 *   Largest "grid-column-end" will be generated using the largest `${ gridColumns.value * multplierColumns + 1 }`
 *
 * @param {?(boolean|number)} [options.multplierRows=false] -
 *   If `gridRows` is set, `multplierRows` defaults to 1 if non-integer entry provided
 *   Multiplier to determine largest "grid-row-start", and "grid-row-end"
 *
 * @param {?(boolean|number)} [options.multplierColumns=false] -
 *   If `gridColumns` is set, `multplierColumns` defaults to 1 if non-integer entry provided
 *   Multiplier to determine largest "grid-column-start", and "grid-column-end"
 *
 * @param {?(boolean|number|number[])} [options.gapRows=false] -
 *   `false` will disable `gapRows`
 *   Integers will be converted to array of same length
 *   `true` or `!Array.isArray(gaps)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8 ]
 *   Used to generate "row-gap"
 *   Values provided will be used to generate gaps in "px" unit
 *   Values with "rem" units will also be generated based on theme("spacing")
 *
 * @param {?(boolean|number|number[])} [options.gapColumns=false] -
 *   `false` will disable `gapColumns`
 *   Integers will be converted to array of same length
 *   `true` or `!Array.isArray(gaps)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8 ]
 *   Used to generate "column-gap"
 *   Values provided will be used to generate gaps in "px" unit
 *   Values with "rem" units will also be generated based on theme("spacing")
 *
 *
 *
 * @return {Object} Returns Tailwindcss plugin
 */
module.exports = function ({ gridRows = false, gridColumns = false, multplierRows = false, multplierColumns = false, gapRows = false, gapColumns = false } = {}) {
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

  // Handle gridColumns
  if (gridColumns !== false) {
    // Sets gridColumns as array from integer
    if (Number.isInteger(gridColumns)) {
      gridColumns = Array.from({
        length: gridColumns,
      }, (_, i) => i + 1)
    }
    // Ensure gridColumns is an array
    else if (!Array.isArray(gridColumns) || gridColumns.length === 0) {
      gridColumns = Array.from({
        length: 12,
      }, (_, i) => i + 1)
    }
    // Ensure array elements are integers
    else if (Array.isArray(gridColumns) && gridColumns.length > 0) {
      gridColumns = gridColumns.reduce((acc, value) => {
        if (Number.isInteger(value)) {
          acc.push(value)
        }

        return acc
      }, [])

      gridColumns.sort((a, b) => a - b)
    }
  }

  // Handle multplierRows
  if (Array.isArray(gridRows)) {
    // Ensure multplierRows is an integer
    if (multplierRows === false || !Number.isInteger(multplierRows)) {
      multplierRows = 1
    }
  }

  // Handle multplierColumns
  if (Array.isArray(gridColumns)) {
    // Ensure multplierColumns is an integer
    if (multplierColumns === false || !Number.isInteger(multplierColumns)) {
      multplierColumns = 1
    }
  }

  // Handle gapRows
  if (gapRows !== false) {
    // Sets gapRows as array from integer
    if (Number.isInteger(gapRows)) {
      gapRows = Array.from({
        length: gapRows,
      }, (_, i) => i + 1)
    }
    // Ensure gapRows is an array
    else if (!Array.isArray(gapRows) || gapRows.length === 0) {
      gapRows = Array.from({
        length: 8,
      }, (_, i) => i + 1)
    }
    // Ensure array elements are integers
    else if (Array.isArray(gapRows) && gapRows.length > 0) {
      gapRows = gapRows.reduce((acc, value) => {
        if (Number.isInteger(value)) {
          acc.push(value)
        }

        return acc
      }, [])

      gapRows.sort((a, b) => a - b)
    }
  }

  // Handle gapColumns
  if (gapColumns !== false) {
    // Sets gapColumns as array from integer
    if (Number.isInteger(gapColumns)) {
      gapColumns = Array.from({
        length: gapColumns,
      }, (_, i) => i + 1)
    }
    // Ensure gapColumns is an array
    else if (!Array.isArray(gapColumns) || gapColumns.length === 0) {
      gapColumns = Array.from({
        length: 8,
      }, (_, i) => i + 1)
    }
    // Ensure array elements are integers
    else if (gapColumns.length > 1) {
      gapColumns = gapColumns.reduce((acc, value) => {
        if (Number.isInteger(value)) {
          acc.push(value)
        }

        return acc
      }, [])

      gapColumns.sort((a, b) => a - b)
    }
  }

  return function ({ addUtilities, e, theme }) {
    // display
    const grid = {
      ".grid": {
        display: "grid",
      },
      ".inline-grid": {
        display: "inline-grid",
      },
    }

    // auto-flow-*
    const autoFlow = {
      ".auto-flow-row": {
        "grid-auto-flow": "row",
      },
      ".auto-flow-row-dense": {
        "grid-auto-flow": "row dense",
      },
      ".auto-flow-column": {
        "grid-auto-flow": "column",
      },
      ".auto-flow-column-dense": {
        "grid-auto-flow": "column dense",
      },
      ".auto-flow-dense": {
        "grid-auto-flow": "dense",
      },
    }

    // grid-template-*
    const templateRowsColumns = (() => {
      const templateRows = {}
      const templateColumns = {}

      // grid-template-rows
      if (gridRows !== false) {
        for (const value of gridRows) {
          if (value === 1) {
            templateRows[`.template-rows-full`] = {
              "grid-template-rows": "100%",
            }
          }
          else {
            templateRows[`.${ e(`template-rows-1/${ value }`) }`] = {
              "grid-template-rows": `[start] repeat(${ value }, 1fr) [end]`,
            }
          }
        }
      }

      // grid-template-columns
      if (gridColumns !== false) {
        for (const value of gridColumns) {
          if (value === 1) {
            templateColumns[`.template-columns-full`] = {
              "grid-template-columns": "100%",
            }
          }
          else {
            templateColumns[`.${ e(`template-columns-1/${ value }`) }`] = {
              "grid-template-columns": `[start] repeat(${ value }, 1fr) [end]`,
            }
          }
        }
      }

      return { ...templateRows, ...templateColumns }
    })()

    // grid-auto-*
    const autoRowsColumns = (() => {
      const autoRows = {}
      const autoColumns = {}

      // grid-auto-rows
      if (gridRows !== false) {
        for (const value of gridRows) {
          if (value === 1) {
            autoRows[`.auto-rows-full`] = {
              "grid-auto-rows": "100%",
            }
          }
          else {
            autoRows[`.${ e(`auto-rows-1/${ value }`) }`] = {
              "grid-auto-rows": `calc(100% / ${ value })`,
            }
          }
        }
      }

      // grid-auto-columns
      if (gridColumns !== false) {
        for (const value of gridColumns) {
          if (value === 1) {
            autoColumns[`.auto-columns-full`] = {
              "grid-auto-columns": "100%",
            }
          }
          else {
            autoColumns[`.${ e(`auto-columns-1/${ value }`) }`] = {
              "grid-auto-columns": `calc(100% / ${ value })`,
            }
          }
        }
      }

      return { ...autoRows, ...autoColumns }
    })()

    // grid-row-* | grid-column-*
    const gridStartEnd = (() => {
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

      // grid-column-start
      const columnStart = (gridColumns !== false)
        ? {
          ".column-start-auto": {
            "grid-column-start": "auto",
          },
        }
        : {}

      // grid-column-end
      const columnEnd = (gridColumns !== false)
        ? {
          ".column-end-auto": {
            "grid-column-end": "auto",
          },
        }
        : {}

      // Initialise grid-rows-* values
      const rowLines = (gridRows !== false)
        ? Array.from({
          length: (gridRows[(gridRows.length - 1)] * multplierRows + 1),
        }, (_, i) => i + 1)
        : []

      if (gridRows !== false) {
        for (const value of rowLines) {
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

      // Initialise grid-columns-* values
      const columnLines = (gridColumns !== false)
        ? Array.from({
          length: (gridColumns[(gridColumns.length - 1)] * multplierColumns + 1),
        }, (_, i) => i + 1)
        : []

      if (gridColumns !== false) {
        for (const value of columnLines) {
          // grid-column-start
          columnStart[`.column-start-${ value }`] = {
            "grid-column-start": `${ value }`,
          }

          // grid-column-end
          columnEnd[`.column-end-${ (value + 1) }`] = {
            "grid-column-end": `${ (value + 1) }`,
          }
        }
      }

      return { ...rowStart, ...rowEnd, ...columnStart, ...columnEnd }
    })()

    // *-gap
    const gapRowColumn = (() => {
      const rowGap = {}
      const columnGap = {}

      // row-gap (px)
      if (gapRows !== false) {
        for (const value of gapRows) {
          rowGap[`.row-gap-${ value }px`] = {
            "row-gap": `${ value }px`,
          }
        }
      }

      // column-gap (px)
      if (gapColumns !== false) {
        for (const value of gapColumns) {
          columnGap[`.column-gap-${ value }px`] = {
            "column-gap": `${ value }px`,
          }
        }
      }

      // *-gap (theme("spacing"))
      for (const [ key, value ] of Object.entries(theme("spacing"))) {
        if (key !== "px") {
          // row-gap
          if (gapRows !== false) {
            rowGap[`.row-gap-${ key }`] = {
              "row-gap": value,
            }
          }

          // column-gap
          if (gapColumns !== false) {
            columnGap[`.column-gap-${ key }`] = {
              "column-gap": value,
            }
          }
        }
      }

      return { ...rowGap, ...columnGap }
    })()

    addUtilities({
      ...grid,
      ...autoFlow,
      ...templateRowsColumns,
      ...autoRowsColumns,
      ...gridStartEnd,
      ...gapRowColumn,
    }, [ "responsive" ])
  }
}
