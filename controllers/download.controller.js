const downloadService = require("../services/download.service");

exports.totaldownload=(req,res,next)=>{
    const data={
        downloadimg:req.body.downloadimgsrc
    }
    console.log(req)
    console.log(data)
    downloadService.totaldownload(data,(error,result)=>{
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: "Bad request" });
        }

        return res.send(result)
    })
}