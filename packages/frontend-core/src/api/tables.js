export const buildTableEndpoints = API => ({
  /**
   * Fetches a table definition.
   * Since definitions cannot change at runtime, the result is cached.
   */
  fetchTableDefinition: async tableId => {
    return await API.get({
      url: `/api/tables/${tableId}`,
      cache: true,
    })
  },

  /**
   * Fetches all rows from a table.
   */
  fetchTableData: async tableId => {
    return await API.get({ url: `/api/${tableId}/rows` })
  },

  /**
   * Searches a table using Lucene.
   */
  searchTable: async ({
    tableId,
    query,
    bookmark,
    limit,
    sort,
    sortOrder,
    sortType,
    paginate,
  }) => {
    if (!tableId || !query) {
      return {
        rows: [],
      }
    }
    return await API.post({
      url: `/api/${tableId}/search`,
      body: {
        query,
        bookmark,
        limit,
        sort,
        sortOrder,
        sortType,
        paginate,
      },
    })
  },

  /**
   * Imports data into an existing table
   * @param tableId the table ID to import to
   * @param data the data import object
   */
  importTableData: async ({ tableId, data }) => {
    return await API.post({
      url: `/api/tables/${tableId}/import`,
      body: {
        dataImport: data,
      },
    })
  },

  /**
   * Validates a candidate CSV to be imported for a certain table.
   * @param tableId the table ID to import to
   * @param csvString the CSV contents as a string
   * @param schema the proposed schema
   */
  validateTableCSV: async ({ tableId, csvString, schema }) => {
    return await API.post({
      url: "/api/tables/csv/validate",
      body: {
        csvString,
        schema,
        tableId,
      },
    })
  },
})