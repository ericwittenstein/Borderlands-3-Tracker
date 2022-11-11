require("dotenv").config();

module.exports={
    HOST: "h1use0ulyws4lqr1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    USER: "fwne4iixuxuao1du",
    PASSWORD: "lsnga4olke0o31bb",
    DB: "ovl7po598gtjp8qu",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    },
    port: 3306
};