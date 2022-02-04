var mysql=require('mysql2');

/*  var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"stock"
});  */

/*   var con=mysql.createConnection({
  host:"bholive1kktyxh7xabi4-mysql.services.clever-cloud.com",
  user:"ueumxxpsnbtothmq",
  port:"3306",
  password:"j05MhBxzQGmsIlcawqpZ",
  database:"bholive1kktyxh7xabi4",

});   */

 var con=mysql.createConnection({
  host:process.env.hostdb,
  user:process.env.userdb,
  password:process.env.passowrddb,
  database:process.env.databasedb
}); 

con.connect(function(err) {
    if (err) {console.log(err+"---------");
       throw err};
    console.log("Connected!");
  });

module.exports=con;