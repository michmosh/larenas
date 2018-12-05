const Config = {
    appName:"LARENA`S",
    apiUrl:"http://ec2-54-201-109-240.us-west-2.compute.amazonaws.com:4400/api",
    devApiUrl :' http://localhost:4400/api' ,
    imagePath: "http://ec2-54-201-109-240.us-west-2.compute.amazonaws.com:4400/images" ,
    whatsappContact : "+527531746229" ,
    whatsappTextMessage:"Hello i want some inforamtion about rooms, availability and prices please " , 
    contactsEmailAddress : 'michmosh1@gmail.com' , 
    defaultImage:"images/no-image.png",
    "topImages":[
        "https://s3-us-west-2.amazonaws.com/moshe-websites/larena/images/nexpa.jpg",
        "https://s3-us-west-2.amazonaws.com/moshe-websites/larena/images/nexpa1.jpg",
        "https://s3-us-west-2.amazonaws.com/moshe-websites/larena/images/nexpa2.jpg",
        "https://s3-us-west-2.amazonaws.com/moshe-websites/larena/images/nexpa3.jpg"
    ] ,
    "en":{
        "navLinks" : [
            {"name":"Home" , "path" : "/home"},
            {"name":"Rooms" , "path" : "/rooms"},
            {"name":"Galery" , "path" : "/galery"},
            {"name":"Contact us" , "path" : "/contact-us"},
            {"name":"Bar & Restaurant" , "path" : "/bar-restaurant"}
        ] 
    },
    "es":{
        "navLinks" : [
            {"name":"Casa" , "path" : "/home"},
            {"name":"Habitaciones" , "path" : "/rooms"},
            {"name":"Galeria" , "path" : "/galery"},
            {"name":"Contactos" , "path" : "/contact-us"},
            {"name":"Bara & Restaurante" , "path" : "/bar-restaurant"}
        ]
    }
}

export default Config;