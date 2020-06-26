const { query } = require("express")

module.exports = {
    age: function(timestamp){

        const today = new Date()
        const birthDate = new Date (timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate() ){
            age = age - 1
        }

        return age
    },
    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
    
        return{
            day, 
            month,
            year,
            iso: (`${year}-${month}-${day}`),
            birthDay: `${day}/${month}`
        }  
    },
    graduation: function(value){
        switch(value){
            case("EMC"): return "Médio"
            case("ESC"): return "Superior"
            case("M"): return "Mestre"
            case("D"): return "Doutor"
        }
    },
    educationalLevel: function(value){
        switch(value){
            case("5EF"): return "5º Ano do Ensino Fundamental"
            case("6EF"): return "6º Ano do Ensino Fundamental"
            case("7EF"): return "7º Ano do Ensino Fundamental"
            case("8EF"): return "8º Ano do Ensino Fundamental"
            case("9EF"): return "9º Ano do Ensino Fundamental"
            case("1EM"): return "1º Ano do Ensino Médio"
            case("2EM"): return "2º Ano do Ensino Médio"
            case("3EM"): return "3º Ano do Ensino Médio"           
        }
    }
}