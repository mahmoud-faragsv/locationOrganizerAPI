class HandleQueries {
  constructor(query, providedQuery) {
    this.query = query;
    this.providedQuery = providedQuery;
  }

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const onlyQueries = { ...this.providedQuery };
    // let onlyQueriesStr = JSON.stringify(onlyQueries);
    // onlyQueriesStr = onlyQueriesStr.replace(
    //   /\b(gt|gte|lt|lte|)\b/g,
    //   (matched) => `$${matched}`
    // );
    const excludedItems = ['sort', 'limit', 'page', 'fields'];
    excludedItems.forEach((item) => delete onlyQueries[item]);

    this.query = this.query.find(onlyQueries);
    return this;
  }

  sort() {
    // SORT
    if (this.providedQuery.sort) {
      const sortBy = this.providedQuery.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy); // chain sort query
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  select() {
    // SELECT certain fields
    if (this.providedQuery.fields) {
      const selectBy = this.providedQuery.fields.split(',').join(' ');
      this.query = this.query.select(selectBy); // chain select query
    } else {
      this.query = this.query.select('-__v'); // chain select query
    }
    return this;
  }

  async paginate() {
    // Pagination
    if (this.providedQuery.limit || this.providedQuery.page) {
      const defaultPageNum = 1;
      const defaultPageLimit = 10;
      const page = +this.providedQuery.page || defaultPageNum;
      const limit = +this.providedQuery.limit || defaultPageLimit;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);

      // if (this.providedQuery.page) {
      //   const numTours = await this.countDocuments(); // count number of documents in the db
      //   if (skip >= numTours) {
      //     throw new Error('This page not exist');
      //   }
      // }
    }

    return this;
  }
}

export default HandleQueries;
