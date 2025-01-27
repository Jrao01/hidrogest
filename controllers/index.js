const index = (req,res)=>{
    try{
        res.render('index');
    }catch(error){
            console.error(error.message);
            res.status(500).send('error en el servidor');
        }
    }

    module.exports={index}