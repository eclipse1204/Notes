const homepage=async (req,res)=>{
    const locals={
        title:'Notes'
    };
    res.render('index.ejs',{
        locals,
        layout: '../views/layouts/front-page',
    });
}

const about=async (req,res)=>{
    const locals={
        title:'About'
    };
    res.render('about.ejs',locals);
}

module.exports={homepage,about};