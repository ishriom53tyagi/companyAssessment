const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios').default;
const express = require("express")
const router = express.Router();
const FormData = require('form-data');
const { pool } = require("../database/query")

router.post("/getDetails", (req, res, next) => {

    let data = new FormData();
    data.append('search',  `${req.body.key}`);
    data.append('filter', 'company');

    var config = {
        method: 'post',
        url: 'https://www.zaubacorp.com/custom-search',
        headers: { 
          ...data.getHeaders()
        },
        data : data
      };

      axios(config)
      .then(function (response) {

        let arr = [];
        if(response?.data ) {

            const dom = new JSDOM(response.data);
            let nodes = dom.window.document.querySelectorAll(".show");
           
            nodes.forEach( element => {
    
                let id = element.getAttribute("id");
     
                arr.push( {
                    value : id.split("/")[2],
                    label : element.textContent
                });
            })
        }

        return res.status(200).send(arr);

      })
      .catch(function (error) {

        return res.status(400).send([]);

      });
  });


  router.post("/submit" , async (req , res , next ) => {

    try {

        const companyName =  req.body.label
        const companyCNNumber = req.body.value

        const isCompanyExist =  await pool.query(`SELECT * FROM company WHERE cn_number = '${companyCNNumber}'`);

        if( isCompanyExist.rows.length ) {
             return res.status(409).send({
                message : "company added already"
             })
        }

        pool.query('INSERT INTO company ( name , cn_number) VALUES ($1, $2)', [companyName , companyCNNumber],(error, results) => {
            if (error) {
              throw error
            }
          })

          return res.status(200).send({
            meesage : "company Inserted Successfully!"
          })

    }
    catch ( error ) {

        res.status(400).send( { error : error });

    }
  })
    

  router.get("/list" , async (req , res , next ) => {

    try {
        
        pool.query('SELECT * FROM company' , ( error , results) => {

            if( error ) {
                throw error ;
            }

            return res.status(200).send(results.rows);

        })
    }
    catch ( error ) {

        res.status(400).send( { error : error })

    }
  })

module.exports = router;