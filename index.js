import express from 'express';
const app = express();

const port = 3030;

app.get('/test',(req,res)=>{
    let user = {
        firstname : 'test',
        lastname : 'นามสกุล',
        age : 14
    }
    res.json(user)
}) 


app.listen(port, () => {
    console.log('HTTP server running at port ' + port);
});
