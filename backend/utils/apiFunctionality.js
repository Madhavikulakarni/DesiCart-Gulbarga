// To search,filter etc
class APIFunctionality {
  constructor(query, queryStr) {
    this.query = query; //mongodb query
    this.queryStr = queryStr; // complete query string in url
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log(keyword)
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    console.log(queryCopy);

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    this.query = this.query.find(queryCopy);
    return this;
    // console.log(queryCopy)  // out-{ page: '2', keyword: 'top', limit: '4', category: 'machine' }
  }

  pagination(resultPerPage){
    const currentPage=Number(this.queryStr.page) ||1
    const skip=resultPerPage*(currentPage-1)
    this.query=this.query.limit(resultPerPage).skip(skip)
    return this
  }
}
export default APIFunctionality;
