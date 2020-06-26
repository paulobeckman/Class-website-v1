const fs = require('fs')
const data = require("../data.json")
const { age, date, graduation } = require('../utils')
const Intl = require('intl')

//index
exports.index = function(req, res) {

    let teachers = data.teachers.map(teacher => {

        const matter = teacher.matter.split(",")

        const newteacher ={
            ...teacher,
            matter: matter
        }

        return newteacher
    })

    return res.render("teachers/index", {teachers})
}

//create
exports.create = function(req, res) {
    return res.render("teachers/create")
}

//post
exports.post = function (req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send ('Please, fill all fields!')
        }
    }

    let {avatar_url, name, birth, schooling, gender, matter} = req.body

    birth = Date.parse(birth)
    const create_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        matter,
        schooling,
        create_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })
}

//show
exports.show = function (req, res) {
    
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        matter: foundTeacher.matter.split(","),
        create_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.create_at),
        schooling: graduation(foundTeacher.schooling),
    }

    return res.render("teachers/show", {teacher})
}

//edit
exports.edit = function(req, res) {

    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso,
    }

    return res.render("teachers/edit", {teacher})
}

//put
exports.update = function(req, res) {
    const { id } = req.body
    let index = 0
    
    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id){
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!")

        return res.redirect(`/teachers/${id}`)
    })
}

//delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")

        return res.redirect("/teachers")
    })
}