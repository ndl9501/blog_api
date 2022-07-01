const db = require("../utils/database");
const httpStatus = require("http-status");



const Blog_tag = function(blog_tag){
    this.tag_id = blog_tag.tag_id,
    this.blog_id = blog_tag.blog_id
}

Blog_tag.create = (newBlog_tag)=>{
    return new Promise((resolve, reject)=>{
        const query = `INSERT INTO blog_tag SET ?`;
        db.query(query, newBlog_tag, (err, rs)=>{
            if(err){
                reject(err);
            }else{
                resolve({ id: rs.insertId })
            }
        })
    })
}

Blog_tag.findByBlogId = async (blog_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM blog_api.blog_tag inner join tag on blog_tag.tag_id = tag.tag_id WHERE blog_id = ?";
        db.query(query, blog_id, (err, rs) => {
            if (err) {
                console.error(err);
                reject(new ApiError(httpStatus.BAD_REQUEST, err.message));
            } else {
                resolve(rs)
            }
        })
    })
}

module.exports = Blog_tag;