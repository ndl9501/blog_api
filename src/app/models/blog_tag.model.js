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



module.exports = Blog_tag;