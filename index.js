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
 * @param {Number[]} [options.gridRows=[1,2,3,4,5,6,7,8,9,10,11,12]] - Only (gridRows.value > 0) will be used
 *   Used to generate "grid-template-rows", and "grid-auto-rows"
 *   Used to generate "grid-row-start", and "grid-row-end"
 *   "grid-auto-rows" formula: `calc(100% / ${ gridRows.value })`
 *   Largest "grid-row-start" will be generated using the largest `${ gridRows.value * multiplierRows }`
 *   Largest "grid-row-end" will be generated using the largest `${ gridRows.value * multplierRows + 1 }`
 *
 * @param {Number[]} [options.gridColumns=[1,2,3,4,5,6,7,8,9,10,11,12]] - Only (gridColumns.value > 0) will be used
 *   Used to generate "grid-template-columns", and "grid-auto-columns"
 *   Used to generate "grid-column-start", and "grid-column-end"
 *   "grid-auto-columns" formula: `calc(100% / ${ gridColumns.value })`
 *   Largest "grid-column-start" will be generated using the largest `${ gridColumns.value * multiplierColumns }`
 *   Largest "grid-column-end" will be generated using the largest `${ gridColumns.value * multplierColumns + 1 }`
 *
 * @param {Number} [options.multplierRows=5] - Multiplier to determine largest "grid-row-start", and "grid-row-end"
 *
 * @param {Number} [options.multplierColumns=1] - Multiplier to determine largest "grid-column-start", and "grid-column-end"
 *
 * @param {Number[]} [options.gapRows=[1,2,3,4,5,6,7,8]] - Only (values > 0) will be used
 *   Used to generate "row-gap"
 *   Values provided will be used to generate gaps in "px" unit
 *   Values with "rem" units will also be generated based on theme("spacing")
 *
 * @param {Number[]} [options.gapColumns=[1,2,3,4,5,6,7,8]] - Only (values > 0) will be used
 *   Used to generate "column-gap"
 *   Values provided will be used to generate gaps in "px" unit
 *   Values with "rem" units will also be generated based on theme("spacing")
 *
 *
 *
 * @return {Object} Returns Tailwindcss plugin
 */
module.exports = function ({ gridRows = [], gridColumns = [], multplierRows = 5, multplierColumns = 1, gapRows = [], gapColumns = []} = {}) {
  if (!Array.isArray(gridRows) || !gridRows.length) {
    gridRows = Array.from({
      length: 12,
    }, (_, i) => i + 1)
  }
  else if (gridRows.length > 1) {
    gridRows = gridRows.reduce((acc, value) => {
      if (Number.isInteger(value)) {
        acc.push(value)
      }

      return acc
    }, [])

    gridRows.sort((a, b) => a - b)
  }

  if (!Array.isArray(gridColumns) || !gridColumns.length) {
    gridColumns = Array.from({
      length: 12,
    }, (_, i) => i + 1)
  }
  else if (gridColumns.length > 1) {
    gridColumns = gridColumns.reduce((acc, value) => {
      if (Number.isInteger(value)) {
        acc.push(value)
      }

      return acc
    }, [])

    gridColumns.sort((a, b) => a - b)
  }

  if (!Number.isInteger(multplierRows)) {
    multplierRows = 5
  }

  if (!Number.isInteger(multplierColumns)) {
    multplierColumns = 1
  }

  if (!Array.isArray(gapRows) || !gapRows.length) {
    gapRows = Array.from({
      length: 8,
    }, (_, i) => i + 1)
  }
  else if (gapRows.length > 1) {
    gapRows = gapRows.reduce((acc, value) => {
      if (Number.isInteger(value)) {
        acc.push(value)
      }

      return acc
    }, [])

    gapRows.sort((a, b) => a - b)
  }

  if (!Array.isArray(gapColumns) || !gapColumns.length) {
    gapColumns = Array.from({
      length: 8,
    }, (_, i) => i + 1)
  }
  else if (gapColumns.length > 1) {
    gapColumns = gapColumns.reduce((acc, value) => {
      if (Number.isInteger(value)) {
        acc.push(value)
      }

      return acc
    }, [])

    gapColumns.sort((a, b) => a - b)
  }

  return function ({ addUtilities, e, theme }) {
    const grid = {
      ".grid": {
        display: "grid",
      },
      ".inline-grid": {
        display: "inline-grid",
      },
    }

    const templateRowsColumns = (() => {
      const templateRows = {}
      const templateColumns = {}

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

      return { ...templateRows, ...templateColumns }
    })()

    const gapRowColumn = (() => {
      const rowGap = {}
      const columnGap = {}

      for (const value of gapRows) {
        rowGap[`.row-gap-${ value }px`] = {
          "row-gap": `${ value }px`,
        }
      }

      for (const value of gapColumns) {
        columnGap[`.column-gap-${ value }px`] = {
          "column-gap": `${ value }px`,
        }
      }

      for (const [ key, value ] of Object.entries(theme("spacing"))) {
        if (key !== "px") {
          rowGap[`.row-gap-${ key }`] = {
            "row-gap": value,
          }

          columnGap[`.column-gap-${ key }`] = {
            "column-gap": value,
          }
        }
      }

      return { ...rowGap, ...columnGap }
    })()

    const itemsJustifyAlign = (() => {
      const values = [ "start", "end", "center", "stretch" ]
      const justifyItems = {}
      const alignItems = {}

      for (const value of values) {
        justifyItems[`.grid-justify-items-${ value }`] = {
          "justify-items": value,
        }

        alignItems[`.grid-align-items-${ value }`] = {
          "align-items": value,
        }
      }

      return { ...justifyItems, ...alignItems }
    })()

    const contentJustifyAlign = (() => {
      const values = [ "start", "end", "center", "stretch", "space-around", "space-between", "space-evenly" ]
      const justifyContent = {}
      const alignContent = {}

      for (const value of values) {
        const name = value.includes("-")
          ? value.split("-")[1]
          : value

        justifyContent[`.grid-justify-${ name }`] = {
          "justify-content": value,
        }

        alignContent[`.grid-align-${ name }`] = {
          "align-content": value,
        }
      }

      return { ...justifyContent, ...alignContent }
    })()

    const autoRowsColumns = (() => {
      const autoRows = {}
      const autoColumns = {}

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

      return { ...autoRows, ...autoColumns }
    })()

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
    }

    const gridStartEnd = (() => {
      const rowStart = {
        ".row-start-auto": {
          "grid-row-start": "auto",
        },
      }

      const rowEnd = {
        ".row-end-auto": {
          "grid-row-end": "auto",
        },
      }

      const columnStart = {
        ".column-start-auto": {
          "grid-column-start": "auto",
        },
      }

      const columnEnd = {
        ".column-end-auto": {
          "grid-column-end": "auto",
        },
      }

      const rowLines = Array.from({
        length: (gridRows[(gridRows.length - 1)] * multplierRows + 1),
      }, (_, i) => i + 1)

      const columnLines = Array.from({
        length: (gridColumns[(gridColumns.length - 1)] * multplierColumns + 1),
      }, (_, i) => i + 1)

      for (const value of rowLines) {
        rowStart[`.row-start-${ value }`] = {
          "grid-row-start": `${ value }`,
        }

        rowEnd[`.row-end-${ (value + 1) }`] = {
          "grid-row-end": `${ (value + 1) }`,
        }
      }

      for (const value of columnLines) {
        columnStart[`.column-start-${ value }`] = {
          "grid-column-start": `${ value }`,
        }

        columnEnd[`.column-end-${ (value + 1) }`] = {
          "grid-column-end": `${ (value + 1) }`,
        }
      }

      return { ...rowStart, ...rowEnd, ...columnStart, ...columnEnd }
    })()

    const selfJustifyAlign = (() => {
      const values = [ "start", "end", "center", "stretch" ]
      const justifyItems = {}
      const alignItems = {}

      for (const value of values) {
        justifyItems[`.grid-justify-self-${ value }`] = {
          "justify-self": value,
        }

        alignItems[`.grid-align-self-${ value }`] = {
          "align-self": value,
        }
      }

      return { ...justifyItems, ...alignItems }
    })()

    addUtilities({
      ...grid,
      ...templateRowsColumns,
      ...gapRowColumn,
      ...itemsJustifyAlign,
      ...contentJustifyAlign,
      ...autoRowsColumns,
      ...autoFlow,
      ...gridStartEnd,
      ...selfJustifyAlign,
    }, [ "responsive" ])
  }
}
