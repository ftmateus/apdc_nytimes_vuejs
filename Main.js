const http = require('http');

//const jquery = require("jquery")

const axios = require('axios');

const fs = require('fs')

require("dotenv").config();


const apiKey = process.env.API_KEY

const apiSecret = process.env.API_SECRET

const nytimes_url = "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=" + apiKey



async function getData(response)
{
    var data = await axios.get(nytimes_url)
    .then((response) =>
    {
        //https://stackoverflow.com/a/13869651
        var data = [];
        resp = response.data.results

        for(var i = 0; i < resp.length; i++)
        {
            data.push
            ({
                url: resp[i].url,
                published_date: resp[i].published_date,
                title: resp[i].title,
                abstract: resp[i].abstract,
                photo: resp[i].media[0] !=  undefined ? resp[i].media[0]["media-metadata"][2] : null
            })
        }
        return data;
    })
    .catch((error) =>
    {
        console.log(error)
    });
    response.write(JSON.stringify(data))
    response.end();
    
}




// axios.get("https://static01.nyt.com/images/2021/03/31/multimedia/31virus-briefing-factory-1/31virus-briefing-factory-1-mediumThreeByTwo440-v2.jpg",
// {
//     responseType: 'arraybuffer',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'image/*'
//     }
// })
//     .then((response) =>
//     {
//         data = response.data
//         console.log(response)
//         fs.writeFile("image.jpg", data, 'binary' , function (err) {});
//     })
//     .catch((error) =>
//     {
//         console.log(error)
//     });

async function getFile(res, path)
{
    res.writeHead(200, {'Content-Type': 'text/html'});
    try
    {
        var data = fs.readFileSync(path.slice(1, path.length));
        res.write(data);
        res.end();
    }
    catch(e)
    {
        res.writeHead(404);
        res.end();
    }
}

http.createServer(function (req, res) {
    switch(req.url)
    {
        case "/data": 
            res.writeHead(200, {'Content-Type': 'application/json'});
            getData(res)
            break;
        case "/": 
            getFile(res, "/index.html");
            break;
        default:
            getFile(res, req.url);            
            
    }
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // axios.get(nytimes_url)
    // .then((response) =>
    // {
    //     data = response.data
    //     //console.log(data.results[0])
    //     res.write(JSON.stringify(data));
    //     res.end();

    // })
    // .catch((error) =>
    // {
    //     console.log(error)
    // });
  
    
    
}).listen(8080);
