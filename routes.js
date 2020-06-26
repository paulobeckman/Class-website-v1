const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')
const videos = require("./data")


routes.get("/", function (req, res) {
    return res.redirect( "/about" )
})

routes.get("/about", function(req, res){
    const about = {
        avatar_url: "https://assets.gitlab-static.net/uploads/-/system/user/avatar/4972476/avatar.png?width=90",
        name: "Paulo Beckman",
        role: "Graduando de Ciência da Computação - Programador",
        description: 'Programador no laboratório mídias eletronicas na Universidade Federal do Oeste do Pará - <a href="http://www.ufopa.edu.br/ufopa/" target="_blank">UFOPA</a>',
        links: [
            { name: "Github", url: "https://github.com/paulobeckman" },
            { name: "Twitter", url: "https://twitter.com/paulobeckman" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/paulo-beckman-08b87b146" }
        ]
    }

    return res.render("about", {about})
})

routes.get("/portfolio", function (req, res) {

    return res.render("portfolio", {items: videos})
})

routes.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send ("Video not found!")
    }

    return res.render("video", {item: video})
})

routes.get("/teachers", teachers.index)
routes.get("/teachers/create", teachers.create)
routes.get("/teachers/:id", teachers.show)
routes.get("/teachers/:id/edit", teachers.edit)
routes.put("/teachers", teachers.update)
routes.delete("/teachers", teachers.delete)
routes.post("/teachers", teachers.post)


routes.get("/students", students.index)
routes.get("/students/create", students.create)
routes.get("/students/:id", students.show)
routes.get("/students/:id/edit", students.edit)
routes.put("/students", students.update)
routes.delete("/students", students.delete)
routes.post("/students", students.post)

module.exports = routes